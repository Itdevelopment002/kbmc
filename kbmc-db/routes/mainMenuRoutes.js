const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// API Route to handle form submission for adding a main menu and its submenus

router.get('/main-menus', (req, res) => {
    const mainMenuQuery = 'SELECT * FROM main_menu';
    const subMenuQuery = 'SELECT * FROM sub_menu WHERE mainMenuId = ?';

    db.query(mainMenuQuery, (err, mainMenus) => {
        if (err) return res.status(500).send(err);

        const menuPromises = mainMenus.map(menu => {
            return new Promise((resolve, reject) => {
                db.query(subMenuQuery, [menu.id], (err, subMenus) => {
                    if (err) reject(err);
                    else {
                        menu.subMenus = subMenus;
                        resolve();
                    }
                });
            });
        });

        Promise.all(menuPromises)
            .then(() => res.status(200).json(mainMenus))
            .catch(error => res.status(500).send(error));
    });
});

// DELETE a main menu and its submenus by main menu ID
router.delete('/delete-main-menu/:id', (req, res) => {
    const mainMenuId = req.params.id;

    const deleteSubMenuQuery = 'DELETE FROM sub_menu WHERE mainMenuId = ?';
    const deleteMainMenuQuery = 'DELETE FROM main_menu WHERE id = ?';

    db.beginTransaction(err => {
        if (err) return res.status(500).send(err);

        // Delete associated submenus
        db.query(deleteSubMenuQuery, [mainMenuId], error => {
            if (error) {
                return db.rollback(() => res.status(500).send(error));
            }

            // Delete the main menu
            db.query(deleteMainMenuQuery, [mainMenuId], error => {
                if (error) {
                    return db.rollback(() => res.status(500).send(error));
                }

                db.commit(err => {
                    if (err) return db.rollback(() => res.status(500).send(err));
                    res.status(200).send({ message: 'Main menu and associated submenus deleted successfully' });
                });
            });
        });
    });
});

router.post('/add-main-menu', (req, res) => {
    const { menuItems } = req.body;

    if (!menuItems || menuItems.length === 0) {
        return res.status(400).send({ message: 'Menu items are required.' });
    }

    const mainMenuQuery = 'INSERT INTO main_menu (mainMenu) VALUES (?)';
    const submenuQuery = 'INSERT INTO sub_menu (mainMenuId, subMenu, subLink) VALUES (?, ?, ?)';

    db.beginTransaction((err) => {
        if (err) return res.status(500).send(err);

        // Insert the main menu
        db.query(mainMenuQuery, [menuItems[0].mainMenu], (error, mainMenuResult) => {
            if (error) {
                return db.rollback(() => res.status(500).send(error));
            }

            const mainMenuId = mainMenuResult.insertId;

            // Insert submenus
            const subMenuPromises = menuItems[0].subMenus.map((subMenu) => {
                return new Promise((resolve, reject) => {
                    db.query(submenuQuery, [mainMenuId, subMenu.subMenu, subMenu.subLink], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            });

            Promise.all(subMenuPromises)
                .then(() => {
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => res.status(500).send(err));
                        }
                        res.status(200).send({ message: 'Menu items added successfully' });
                    });
                })
                .catch((error) => {
                    db.rollback(() => res.status(500).send(error));
                });
        });
    });
});

// API Route to update a main menu item
router.put('/update-main-menu/:id', (req, res) => {
    const mainMenuId = req.params.id;
    const { mainMenu, subMenus } = req.body;

    const updateMainMenuQuery = 'UPDATE main_menu SET mainMenu = ? WHERE id = ?';
    const deleteOldSubMenusQuery = 'DELETE FROM sub_menu WHERE mainMenuId = ?';
    const insertSubMenuQuery = 'INSERT INTO sub_menu (mainMenuId, subMenu, subLink) VALUES (?, ?, ?)';

    db.beginTransaction((err) => {
        if (err) return res.status(500).send(err);

        // Update the main menu
        db.query(updateMainMenuQuery, [mainMenu, mainMenuId], (error) => {
            if (error) {
                return db.rollback(() => res.status(500).send(error));
            }

            // Delete old submenus
            db.query(deleteOldSubMenusQuery, [mainMenuId], (error) => {
                if (error) {
                    return db.rollback(() => res.status(500).send(error));
                }

                if (subMenus && subMenus.length > 0) {
                    // Insert new submenus
                    const subMenuPromises = subMenus.map((subMenu) => {
                        return new Promise((resolve, reject) => {
                            db.query(insertSubMenuQuery, [mainMenuId, subMenu.subMenu, subMenu.subLink], (err) => {
                                if (err) reject(err);
                                else resolve();
                            });
                        });
                    });

                    Promise.all(subMenuPromises)
                        .then(() => {
                            db.commit((err) => {
                                if (err) return db.rollback(() => res.status(500).send(err));
                                res.status(200).send({ message: 'Main menu and submenus updated successfully' });
                            });
                        })
                        .catch((error) => {
                            db.rollback(() => res.status(500).send(error));
                        });
                } else {
                    db.commit((err) => {
                        if (err) return db.rollback(() => res.status(500).send(err));
                        res.status(200).send({ message: 'Main menu updated successfully, no submenus to add' });
                    });
                }
            });
        });
    });
});

module.exports = router;

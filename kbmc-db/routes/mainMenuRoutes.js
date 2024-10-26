const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// API Route to handle form submission for adding a main menu and its submenus
router.post('/add-main-menu', (req, res) => {
    const { menuItems } = req.body;

    if (!menuItems || menuItems.length === 0) {
        return res.status(400).send({ message: 'Menu items are required.' });
    }

    const mainMenuQuery = 'INSERT INTO main_menu (mainMenu) VALUES (?)';
    const submenuQuery = 'INSERT INTO sub_menu (mainMenuId, subMenu) VALUES (?, ?)';

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
                    db.query(submenuQuery, [mainMenuId, subMenu], (err) => {
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

// API Route to get all main menus with their submenus
router.get('/main-menus', (req, res) => {
    const query = `
        SELECT mm.id AS mainMenuId, mm.mainMenu, sm.id AS subMenuId, sm.subMenu 
        FROM main_menu mm 
        LEFT JOIN sub_menu sm ON mm.id = sm.mainMenuId
    `;

    db.query(query, (error, results) => {
        if (error) return res.status(500).send(error);
        
        const menus = {};
        
        results.forEach(row => {
            if (!menus[row.mainMenuId]) {
                menus[row.mainMenuId] = {
                    id: row.mainMenuId,
                    mainMenu: row.mainMenu,
                    subMenus: []
                };
            }
            if (row.subMenuId) {
                menus[row.mainMenuId].subMenus.push({
                    subMenuId: row.subMenuId,
                    subMenu: row.subMenu
                });
            }
        });

        res.status(200).send(Object.values(menus));
    });
});

// API Route to update a main menu item
router.put('/update-main-menu/:id', (req, res) => {
    const mainMenuId = req.params.id;
    const { mainMenu, subMenus } = req.body;

    const updateMainMenuQuery = 'UPDATE main_menu SET mainMenu = ? WHERE id = ?';
    const deleteOldSubMenusQuery = 'DELETE FROM sub_menu WHERE mainMenuId = ?';
    const insertSubMenuQuery = 'INSERT INTO sub_menu (mainMenuId, subMenu) VALUES (?, ?)';

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
                            db.query(insertSubMenuQuery, [mainMenuId, subMenu], (err) => {
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

// API Route to delete a submenu
router.delete('/delete-main-menu/:id', (req, res) => {
    const mainMenuId = req.params.id;

    const deleteSubMenusQuery = 'DELETE FROM sub_menu WHERE mainMenuId = ?';
    const deleteMainMenuQuery = 'DELETE FROM main_menu WHERE id = ?';

    db.beginTransaction((err) => {
        if (err) return res.status(500).send(err);

        // Delete all submenus associated with the main menu
        db.query(deleteSubMenusQuery, [mainMenuId], (error) => {
            if (error) {
                return db.rollback(() => res.status(500).send(error));
            }

            // Now delete the main menu
            db.query(deleteMainMenuQuery, [mainMenuId], (error) => {
                if (error) {
                    return db.rollback(() => res.status(500).send(error));
                }

                db.commit((err) => {
                    if (err) return db.rollback(() => res.status(500).send(err));
                    res.status(200).send({ message: 'Main menu and all associated submenus deleted successfully' });
                });
            });
        });
    });
});



module.exports = router;

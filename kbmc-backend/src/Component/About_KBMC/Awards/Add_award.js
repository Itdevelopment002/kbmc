import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Add_award = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [awardImage, setAwardImage] = useState(null);
    const navigate = useNavigate(); // Using useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a FormData object to send the form data
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('awardimage', awardImage);

        try {
            // Make a POST request to the API
            const response = await fetch('http://localhost:5000/api/awards', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add award');
            }

            // Reset form fields after successful submission
            setHeading('');
            setDescription('');
            setAwardImage(null);

            // Navigate to awards page
            navigate('/Award'); // Change this path if needed
        } catch (error) {
            console.error('Error:', error);
            // You may want to handle errors more gracefully (e.g., show a message to the user)
        }
    };

    const handleImageChange = (e) => {
        setAwardImage(e.target.files[0]);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="index.php">About KBMC</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="award.php">Awards</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Awards
                    </li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Add Awards</h4>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label className="col-form-label col-md-2">
                                            Heading <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={heading}
                                                onChange={(e) => setHeading(e.target.value)}
                                                placeholder="Enter award heading"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-3">
                                        <label className="col-form-label col-md-2">Description <span className="text-danger">*</span></label>
                                        <div className="col-md-5">
                                            <textarea
                                                className="form-control"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Enter a brief description"
                                                rows="3"
                                                style={{ resize: 'none' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-3">
                                        <label className="col-form-label col-md-2">Upload Award Image <span className="text-danger">*</span></label>
                                        <div className="col-md-5">
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-3">
                                        <div className="col-md-6 col-md-2">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add_award;

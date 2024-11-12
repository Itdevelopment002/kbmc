import React, { useState, useEffect } from 'react';

const SanitationInspectorForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    zone_no: '',
    names: '',
    mob_no: '',
    ward_no: ''
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form has been submitted

  useEffect(() => {
    // Reset form if initialData is not provided
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form fields when opening the form for a new inspector
      setFormData({
        zone_no: '',
        names: '',
        mob_no: '',
        ward_no: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is mob_no, restrict to digits only
    if (name === 'mob_no') {
      // Allow only digits
      if (!/^\d*$/.test(value)) return; // If value is not digits, return early
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error for the field being edited
  };

  const validate = () => {
    const newErrors = {};
    const { zone_no, names, mob_no, ward_no } = formData;

    // Validate zone_no
    if (!zone_no) newErrors.zone_no = 'Zone No. is required';
    if (isNaN(zone_no)) newErrors.zone_no = 'Zone No. must be a number';

    // Validate names
    if (!names) newErrors.names = 'Inspector Name is required';

    // Validate mob_no
    if (!mob_no) {
      newErrors.mob_no = 'Mobile No. is required';
    } else if (!/^\d+$/.test(mob_no)) {
      newErrors.mob_no = 'Mobile No. must be numeric'; // Validate that mob_no is numeric
    }

    // Validate ward_no
    // if (!ward_no) newErrors.ward_no = 'Ward No. is required';
    // if (isNaN(ward_no)) newErrors.ward_no = 'Ward No. must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set form as submitted
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="zone_no" className="form-label">Zone No.</label>
        <input
          type="text"
          className={`form-control ${isSubmitted && errors.zone_no ? 'is-invalid' : ''}`}
          name="zone_no"
          value={formData.zone_no}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.zone_no && (
          <div className="invalid-feedback">{errors.zone_no}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="names" className="form-label">Inspector Name</label>
        <input
          type="text"
          className={`form-control ${isSubmitted && errors.names ? 'is-invalid' : ''}`}
          name="names"
          value={formData.names}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.names && (
          <div className="invalid-feedback">{errors.names}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="mob_no" className="form-label">Mobile No.</label>
        <input
          type="text"
          className={`form-control ${isSubmitted && errors.mob_no ? 'is-invalid' : ''}`}
          name="mob_no"
          value={formData.mob_no}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.mob_no && (
          <div className="invalid-feedback">{errors.mob_no}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="ward_no" className="form-label">Ward No.</label>
        <input
          type="text"
          className={`form-control ${isSubmitted && errors.ward_no ? 'is-invalid' : ''}`}
          name="ward_no"
          value={formData.ward_no}
          onChange={handleChange}
          required
        />

      </div>
      <div className="modal-footer">
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default SanitationInspectorForm;

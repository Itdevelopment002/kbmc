import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

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
    if (!ward_no) newErrors.ward_no = 'Ward No. is required';
    if (isNaN(ward_no)) newErrors.ward_no = 'Ward No. must be a number';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="zone_no">
        <Form.Label>Zone No.</Form.Label>
        <Form.Control
          type="text"
          name="zone_no"
          value={formData.zone_no}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.zone_no && (
          <Alert variant="danger">{errors.zone_no}</Alert>
        )}
      </Form.Group>
      <Form.Group controlId="names">
        <Form.Label>Inspector Name</Form.Label>
        <Form.Control
          type="text"
          name="names"
          value={formData.names}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.names && (
          <Alert variant="danger">{errors.names}</Alert>
        )}
      </Form.Group>
      <Form.Group controlId="mob_no">
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control
          type="text"
          name="mob_no"
          value={formData.mob_no}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.mob_no && (
          <Alert variant="danger">{errors.mob_no}</Alert>
        )}
      </Form.Group>
      <Form.Group controlId="ward_no">
        <Form.Label>Ward No.</Form.Label>
        <Form.Control
          type="text"
          name="ward_no"
          value={formData.ward_no}
          onChange={handleChange}
          required
        />
        {isSubmitted && errors.ward_no && (
          <Alert variant="danger">{errors.ward_no}</Alert>
        )}
      </Form.Group>
      <Button variant="primary" className='mt-3' type="submit">Submit</Button>
    </Form>
  );
};

export default SanitationInspectorForm;

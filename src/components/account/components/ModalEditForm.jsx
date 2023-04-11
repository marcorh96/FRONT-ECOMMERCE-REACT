import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { updateUserService } from '../../../services/User/userServices';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';

export default function ModalEditForm(props) {

  const { userdata } = props;
  const [userFormData, setUserFormData] = useState({
    person: {
      firstname: '',
      lastName: '',
      birthDate: '',
      phone: ''
    },
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: ''
    },
    photo: '',
  });
  const [isNewInfo, setIsNewInfo] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUserFormData(userdata);
  }, [userdata]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usersAreEqual = JSON.stringify(userdata) === JSON.stringify(userFormData);
      if (usersAreEqual) {
        setIsNewInfo(false);
        return;
      }
      setIsNewInfo(true);
      const response = await updateUserService(userFormData);
      setErrors({});
      console.log(response);
      Swal.fire('Account updated successfully!', response.data.message, 'success').then(() => props.onHide())
    } catch (error) {
      const errorsObj = {};
      error.forEach(error => {
        const fieldName = error.match(/'([^']+)'/)[1];
        errorsObj[fieldName] = error;
      });
      setErrors(errorsObj);
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setUserFormData((prevData) => ({
        ...prevData,
        email: value,
      }));
    } else {
      const section = name.split(".")[0];
      const key = name.split(".")[1];

      setUserFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [key]: value,
        },
      }));
    }
  };





  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md='6'>
                <Form.Label htmlFor="firstname">Firstname</Form.Label>
                <Form.Control
                  type="text"
                  id="firstname"
                  name="person.firstname"
                  value={userFormData.person.firstname}
                  onChange={handleChange}
                  required
                />
                {errors.firstname && <Alert variant='danger' className='my-2'>{errors.firstname}</Alert>}
                <Form.Label htmlFor="lastname" >Lastname</Form.Label>
                <Form.Control
                  type="text"
                  id="lastname"
                  name="person.lastName"
                  value={userFormData.person.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && <Alert variant='danger' className='my-2'>{errors.lastName}</Alert>}
                <Form.Label htmlFor="birthDate" >Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  id="birthDate"
                  name="person.birthDate"
                  value={userFormData.person.birthDate}
                  onChange={handleChange}
                  required
                />
                {errors.birthDate && <Alert variant='danger' className='my-2'>{errors.birthDate}</Alert>}
                <Form.Label htmlFor="email" >Email</Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <Alert variant='danger' className='my-2'>{errors.email}</Alert>}

              </Col>
              <Col md='6'>
                <Form.Label htmlFor="street" >Street</Form.Label>
                <Form.Control
                  type="text"
                  id="street"
                  name="address.street"
                  value={userFormData.address.street}
                  onChange={handleChange}
                  required
                />
                {errors.street && <Alert variant='danger' className='my-2'>{errors.street}</Alert>}
                <Form.Label htmlFor="city" >City</Form.Label>
                <Form.Control
                  type="text"
                  id="city"
                  name="address.city"
                  value={userFormData.address.city}
                  onChange={handleChange}
                  required
                />
                {errors.city && <Alert variant='danger' className='my-2'>{errors.city}</Alert>}
                <Form.Label htmlFor="state" >State</Form.Label>
                <Form.Control
                  type="text"
                  id="state"
                  name="address.state"
                  value={userFormData.address.state}
                  onChange={handleChange}
                  required
                />
                {errors.state && <Alert variant='danger' className='my-2'>{errors.state}</Alert>}
                <Form.Label htmlFor="country" >Country</Form.Label>
                <Form.Control
                  type="text"
                  id="country"
                  name="address.country"
                  value={userFormData.address.country}
                  onChange={handleChange}
                  required
                />
                {errors.country && <Alert variant='danger' className='my-2'>{errors.country}</Alert>}
                <Form.Label htmlFor="zipcode" >Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  id="zipcode"
                  name="address.zipcode"
                  value={userFormData.address.zipcode}
                  onChange={handleChange}
                  required
                />
                {errors.zipcode && <Alert variant='danger' className='my-2'>{errors.zipcode}</Alert>}
              </Col>
            </Row>
            {!isNewInfo && <Alert variant='danger' className='my-2'>Please make the necessary changes to proceed with the update.</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' type='submit'>Save Changes</Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  )
}

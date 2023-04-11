import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { signUpService } from '../../services/services.js'
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2'

export default function SignUp() {
    const [formData, setFormData] = useState({
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
        }
    });

    const [errors, setErrors] = useState({});
    /*  useEffect(() => {
         console.log(errors);
     }, [errors]);
  */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUpService(formData);
            setErrors({});
            console.log(response);
            Swal.fire({
                title: `Congratulations!`,
                text: 'You have successfully registered!',
                icon: 'success'
            }).then(() => {
                window.location = '/login';
            });
        } catch (error) {
            const errorsObj = {};
            error.forEach(error => {
                const fieldName = error.match(/'([^']+)'/)[1];
                errorsObj[fieldName] = error;
            });
            setErrors(errorsObj);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setFormData((prevData) => ({
                ...prevData,
                email: value,
            }));
        } else if (name === "password") {
            setFormData((prevData) => ({
                ...prevData,
                password: value,
            }));
        } else {
            const section = name.split(".")[0];
            const key = name.split(".")[1];

            setFormData((prevData) => ({
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
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col md='6' className='mt-3' >
                            <Card style={{ minHeight: '600px' }}>
                                <Card.Header className='text-center'>Account</Card.Header>
                                <Card.Body className='d-flex row'>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Firstname</Form.Label>
                                        <Form.Control type="text" placeholder="Firstname" name="person.firstname" value={formData.person.firstname} onChange={handleChange} required />
                                        {errors.firstname && <Alert variant='danger' className='my-2'>{errors.firstname}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Lastname</Form.Label>
                                        <Form.Control type="text" placeholder="Lastname" name="person.lastName" value={formData.person.lastName} onChange={handleChange} required />
                                        {errors.lastName && <Alert variant='danger' className='my-2'>{errors.lastName}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Birthdate</Form.Label>
                                        <Form.Control type="date" placeholder="Birthdate" name="person.birthDate" value={formData.person.birthDate} onChange={handleChange} required />
                                        {errors.birthDate && <Alert variant='danger' className='my-2'>{errors.birthDate}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Phone Number" name="person.phone" value={formData.person.phone} onChange={handleChange} required />
                                        {errors.phone && <Alert variant='danger' className='my-2'>{errors.phone}</Alert>}
                                    </Form.Group>


                                    <Form.Group className="mb-3" >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                                        {errors.email && <Alert variant='danger' className='my-2'>{errors.email}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                                        {errors.password && <Alert variant='danger' className='my-2'>{errors.password}</Alert>}
                                    </Form.Group>
                                </Card.Body>


                            </Card>
                        </Col>

                        <Col md='6' className='mt-3' >
                            <Card style={{ minHeight: '600px' }}>
                                <Card.Header className='text-center'>Address</Card.Header>
                                <Card.Body className='d-flex row'>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control type="text" placeholder="Street" name="address.street" value={formData.address.street} onChange={handleChange} required />
                                        {errors.street && <Alert variant='danger' className='my-2'>{errors.street}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="City" name="address.city" value={formData.address.city} onChange={handleChange} required />
                                        {errors.city && <Alert variant='danger' className='my-2'>{errors.city}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="text" placeholder="State" name="address.state" value={formData.address.state} onChange={handleChange} required />
                                        {errors.state && <Alert variant='danger' className='my-2'>{errors.state}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" placeholder="Country" name="address.country" value={formData.address.country} onChange={handleChange} required />
                                        {errors.country && <Alert variant='danger' className='my-2'>{errors.country}</Alert>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Zipcode</Form.Label>
                                        <Form.Control type="text" placeholder="Zipcode" name="address.zipcode" value={formData.address.zipcode} onChange={handleChange} required />
                                        {errors.zipcode && <Alert variant='danger' className='my-2'>{errors.zipcode}</Alert>}
                                    </Form.Group>


                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md='4' className='my-3'>
                            <Button variant="primary" type="submit" className='w-100'>
                                Submit
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Container>
        </>
    )
}

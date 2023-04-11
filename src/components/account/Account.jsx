import React from 'react'
import { useState, useEffect } from 'react';
import { getUserDataService, saveUserImageService } from '../../services/User/userServices';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Dropzone from 'react-dropzone';
import Swal from 'sweetalert2';
import ModalEditForm from './components/ModalEditForm';
import ModalPasswordForm from './components/ModalPasswordForm';


export default function Account() {

    const fetchData = async () => {
        try {

            const response = await getUserDataService();
            setUserData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [showBreakPoint, setBreakPoint] = useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [passwordModalShow, setPasswordModalShow] = React.useState(false);
    const [userData, setUserData] = useState({
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

    const handleDrop = async (acceptedFiles) => {
        try {
            const response = await saveUserImageService(acceptedFiles[0]);
            setUserData(response.data.user);
            Swal.fire('Upload Complete', response.data.message, 'success')

        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        function handleResize() {
            (window.innerWidth < 992) ?
                setBreakPoint(false) :
                setBreakPoint(true);
        }
        // Comprobar la resolución inicial
        if (window.innerWidth < 992) {
            setBreakPoint(false);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Container className="d-flex  justify-content-center" style={{ minHeight: '80vh' }}>
                <Row className="justify-content-md-center my-auto w-100">
                    <Col className="d-flex align-items-center justify-content-center">
                        <div style={{ position: 'relative' }}>
                            <Image src={'http://localhost:8080/api/users/upload/img/' + ((userData.photo) ? userData.photo : 'no-photo')}
                                className='rounded-circle border' style={{ objectFit: 'cover', width: '300px', height: '300px' }} />
                            <div style={{ position: 'absolute', top: ((showBreakPoint) ? '280px' : '250px'), right: '0', zIndex: '10' }}>
                                <Dropzone onDrop={handleDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()} style={{ height: '100%' }}>
                                            <input {...getInputProps()} />
                                            <i className="bi bi-camera-fill fs-4"></i>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </Col>
                    <Col md='7' className='mt-2' >
                        <Card>
                            <Card.Header className='text-center'>Account</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col >
                                        <Form.Label htmlFor="firstname">Firstname</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="firstname"
                                            value={userData.person.firstname}
                                            disabled
                                        />
                                        <Form.Label htmlFor="lastname" >Lastname</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="lastname"
                                            value={userData.person.lastName}
                                            disabled
                                        />
                                        <Form.Label htmlFor="birthDate" >Birthdate</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="birthDate"
                                            value={userData.person.birthDate}
                                            disabled
                                        />
                                        <Form.Label htmlFor="email" >Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="email"
                                            value={userData.email}
                                            disabled
                                        />

                                    </Col>
                                    <Col>
                                        <Form.Label htmlFor="street" >Street</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="street"
                                            value={userData.address.street}
                                            disabled
                                        />
                                        <Form.Label htmlFor="city" >City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="city"
                                            value={userData.address.city}
                                            disabled
                                        />
                                        <Form.Label htmlFor="state" >State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="state"
                                            value={userData.address.state}
                                            disabled
                                        />
                                        <Form.Label htmlFor="country" >Country</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="country"
                                            value={userData.address.country}
                                            disabled
                                        />
                                        <Form.Label htmlFor="zipcode" >Zipcode</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="zipcode"
                                            value={userData.address.zipcode}
                                            disabled
                                        />

                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Row className='mt-3 d-flex justify-content-center'>
                            <Col md={((showBreakPoint) ? '5' : '11')} >
                                <Button variant="primary" className='w-100' onClick={() => setModalShow(true)}>Edit</Button>
                            </Col>
                            <Col md={((showBreakPoint) ? '5' : '11')} >
                                <Button variant="primary"
                                    className='w-100'
                                    style={{ marginTop: (showBreakPoint) ? '0' : '1rem', marginBottom: (showBreakPoint) ? '0' : '1rem' }}
                                    onClick={() => setPasswordModalShow(true)}
                                >Change Password</Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>

            </Container>
            <ModalPasswordForm
                show={passwordModalShow}
                onHide={() => setPasswordModalShow(false)}
                userdata={userData}
            />


            <ModalEditForm
                show={modalShow}
                onHide={() => setModalShow(false)}
                userdata={userData}
                onExit={() => {
                    fetchData();
                }
                }
            />


        </>

    )
}

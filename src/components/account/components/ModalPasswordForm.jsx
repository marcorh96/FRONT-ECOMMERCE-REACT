import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { updateUserPassword } from '../../../services/User/userServices';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';
export default function ModalPasswordForm(props) {
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

    const [errors, setErrors] = useState({});
    useEffect(() => {
        setUserFormData(userdata);
        setUserFormData(prevState => ({
            ...prevState,
            password: '********'
        }));
    }, [userdata]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            setUserFormData((prevData) => ({
                ...prevData,
                password: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserPassword(userFormData);
            setErrors({});
            Swal.fire('Update has been completed!', response.data.message, 'success')
            .then(()=>{
                props.onHide();
            })
        } catch (error) {
            const errorsObj = {};
            error.forEach(error => {
                const fieldName = error.match(/'([^']+)'/)[1];
                errorsObj[fieldName] = error;
            });
            setErrors(errorsObj);
        }
    }

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
                            Password Form
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md='7'>
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={userFormData.password}
                                    onChange={handleChange}
                                    placeholder='Password'
                                    required
                                />
                            </Col>
                            <Col md='12'>
                            {errors.password && <Alert variant='danger' className='my-2'>{errors.password}</Alert>}
                            </Col>
                            
                        </Row>

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

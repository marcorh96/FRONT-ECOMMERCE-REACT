import React, { useState, useEffect } from 'react';
import { loginService } from '../../services/services'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Swal from 'sweetalert2'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showBreakPoint1, setBreakPoint1] = useState(true);
    const [showBreakPoint2, setBreakPoint2] = useState(true);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await loginService(email, password);
            const user = JSON.parse(localStorage.getItem("user"));
            const fullname = user.person.firstname + " " + user.person.lastName;

            Swal.fire({
                title: `Welcome ${fullname}`,
                text: 'You have successfully logged in!',
                icon: 'success'
            }).then(() => {
                window.location = '/';
            });
        } catch (error) {
            setPassword('');
            Swal.fire({
                title: `Error Login`,
                text: error,
                icon: 'error'
            })
        }
    };

    useEffect(() => {
        function handleResize() {
            (window.innerWidth < 768) ?
                setBreakPoint1(false) :
                setBreakPoint1(true);
        }
        // Comprobar la resolución inicial
        if (window.innerWidth < 768) {
            setBreakPoint1(false);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        function handleResize() {
            (window.innerWidth < 992) ?
                setBreakPoint2(false) :
                setBreakPoint2(true);
        }
        // Comprobar la resolución inicial
        if (window.innerWidth < 992) {
            setBreakPoint2(false);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>


            {/* <div className='container mt-4 d-flex justify-content-center  flex-column' style={{ minHeight: '75vh' }}>
                <div className='row align-items-stretch ' >
                    <form onSubmit={handleSubmit} className={`mx-auto card d-flex flex-column justify-content-center h-100card col-12 border-primary ${showClass ? 'col-md-6' : ''}`} style={{maxWidth: '95%'}}>
                        <div className='text-primary text-center'>
                            <h1>Login</h1>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">Email </label>
                            <input className='form-control' type="email" name='email' id='email' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email' required />
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="password">Password </label>
                            <input className='form-control' type="password" id='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password' required />
                        </div>
                        {error && <div className='alert alert-danger'>{error}</div>}
                        <div className='text-center my-2'>
                            <button className='btn btn-primary btn-lg w-100 btn-block' type='submit'>Login</button>
                        </div>
                       <div className='text-center my-2'>Are you registered? Please <a href="/signin">Sign In</a></div> 
                    </form>
                    <div className='col-md-6 d-none d-lg-block h-100' style={{ padding: '0' }}>
                        <img src="/src/assets/img/logo-login.png" alt="Logo login" style={{ maxWidth: '100%', objectFit: 'cover' }} className='h-100' />
                    </div>
                </div>
            </div> */}

            {/* <Container>
                <Row className=" justify-content-center align-items-center " style={{ position: 'static', height: '80vh' }}>
                    <Col sm={(showBreakPoint1) ? '5' : ''} style={{ height: (showBreakPoint1) ? '60vh' : '80%' }}>
                        <Form onSubmit={handleSubmit} className='d-flex row align-items-center mx-auto' style={{ height: '100%', marginLeft: '0', marginRight: '0', maxWidth: (showBreakPoint2) ? '75%' : '90%' }}>
                            <div className='text-center'>
                                <h1>Login</h1>
                            </div>
                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                            </Form.Group>

                            <Button variant="primary" type="submit" size="lg" className='w-100 btn-block'>
                                Login
                            </Button>
                            <div className='text-center'>
                                <p>Are you already registered? Please <a href="/signin">Sign In</a></p>
                            </div>
                        </Form>

                    </Col>
                    <Col sm={(showBreakPoint2) ? '5' : '4'} className='d-none d-md-block' style={{ height: '70%' }}>
                        <Image src="/src/assets/img/logo-login.png" alt="Logo login" fluid style={{ height: '100%', objectFit: 'cover' }}></Image>
                    </Col>
                </Row>
            </Container> */}
             <Container>
                <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <Col className='d-none d-lg-block'>
                        <Image src="/src/assets/img/sign-in-logo.svg" alt="Logo login" fluid style={{ height: '100%', objectFit: 'cover' }}></Image>
                    </Col>
                    <Col style={{ maxWidth: (showBreakPoint2) ? '75%' : '90%' }}>
                        <Form onSubmit={handleSubmit} className='d-flex row align-items-center mx-auto'>
                            <Form.Group className='my-2'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className='my-2'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                            </Form.Group>


                            <Button variant="primary" type="submit" size="lg" className='w-100 btn-block mt-1'>
                                Login
                            </Button>
                            <div className='text-center my-2'>
                                <p>Not a member? <a href="/signup">Register</a></p>
                            </div>
                        </Form>

                    </Col>

                </Row>
            </Container>
        </>

    )
}

export default Login;
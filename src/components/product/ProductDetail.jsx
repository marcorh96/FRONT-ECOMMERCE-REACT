import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getProductDetail } from '../../services/Products/productsServices';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ProductDetail() {
    const [showBreakPoint, setBreakPoint] = useState(true);
    const [quantity, setQuantity] = useState("1 unit");
    const [productData, setProductData] = useState({
        id: "",
        name: "",
        description: "",
        category: {
            id: "",
            name: "",
            condition: ""
        },
        features: [
            ""
        ],
        price: 0,
        stock: 0,
        color: "",
        manufacturer: {
            id: "",
            brand: "",
            model: "",
            manufacturer: "",
            distributor: ""
        },
        photo: "",
        createdAt: "",
        updatedAt: null
    });

    const { id } = useParams();
    const fetchProductData = async () => {
        try {
            const response = await getProductDetail(id);
            setProductData(response.data);
            console.log(response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        function handleResize() {
            (window.innerWidth < 991) ?
                setBreakPoint(false) :
                setBreakPoint(true);
        }
        // Comprobar la resolución inicial
        if (window.innerWidth < 991) {
            setBreakPoint(false);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const change = eventKey => {
        setQuantity(eventKey);
    };




    return (
        <>
            <Container>
                <Row className='d-flex justify-content-center my-5'>
                    <Card style={{ width: '90%' }}>
                        <Row>
                            <Col md={(showBreakPoint) ? '4' : '12'}>
                                <Image src={'http://localhost:8080/api/products/upload/img/' + ((productData.photo) ? productData.photo : 'no-photo')} style={{ width: '100%', height: '400px', objectFit: 'contain' }} />
                            </Col>
                            <Col md={(showBreakPoint) ? '4' : '12'} >
                                <Row>
                                    <Row className='pb-3'>
                                        <p className='pt-4' style={{ fontSize: '.8em', color: '#00008C' }}>{productData.category.condition}</p>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{productData.name}</p>
                                    </Row>
                                    <Row>
                                        <p style={{ fontSize: '2rem' }} className='pb-3'>${productData.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}.00</p>
                                        <p style={{ fontSize: '.8em' }}>Color: {productData.color}</p>
                                        <p style={{ fontSize: '.8em' }}>Model: {productData.manufacturer.model}</p>
                                        <p style={{ fontSize: '.8em' }}>Brand: {productData.manufacturer.brand}</p>
                                        <p style={{ fontSize: '.8em' }}>Manufacturer: {productData.manufacturer.manufacturer}</p>
                                        <p style={{ fontSize: '.8em' }}>Distributor: {productData.manufacturer.distributor}</p>
                                    </Row>
                                </Row>

                            </Col>
                            <Col md={(showBreakPoint) ? '4' : '12'} className='my-3'>
                                <Card>
                                    <Row className='my-3'>
                                        <Col>
                                            <Row className='d-flex justify-content-center'>
                                                <Row>
                                                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#00A650' }}>Free Shipping</p>
                                                </Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col>
                                            <Row className='d-flex justify-content-center'>
                                                <Row>
                                                    <p style={{ fontSize: '.8rem' }}>Sold by Electronics</p>
                                                </Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col>
                                            <Row className='d-flex justify-content-center'>
                                                <Row>
                                                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Stock available</p>
                                                </Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col>
                                            <Row className='d-flex justify-content-center'>
                                                <Row className='d-flex'>
                                                    <label style={{ fontSize: '1.2rem', width: '102px' }}>Quantity: </label>
                                                    <Dropdown style={{ width: '50px', padding: '0' }} onSelect={change}>
                                                        <Dropdown.Toggle id="dropdown-basic" style={{ background: 'white', color: 'black', border: '0', padding: '.25rem 0' }}>
                                                            {quantity}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu >
                                                            <Dropdown.Item eventKey={"1 unit"}>1 unit</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"2 units"}>2 units</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"3 units"}>3 units</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"4 units"}>4 units</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"5 units"}>5 units</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='mb-4'>
                                        <Col md='12'>
                                            <Row className='justify-content-center'>
                                                <Button variant="primary" className='mb-3' style={{ maxWidth: '85%', padding: '.5rem 1.5rem' }}>Add to Cart</Button>
                                            </Row>
                                        </Col>
                                        <Col md='12'>
                                            <Row className='justify-content-center'>
                                                <Button variant="secondary" style={{ maxWidth: '85%', padding: '.5rem 1.5rem' }}>Buy Now</Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>


                            </Col>

                        </Row>
                        <Row className=" my-3">
                            <Col md='12'>
                                <Row className='d-flex justify-content-center'>
                                    <Row>
                                        <p style={{ fontSize: '1.5rem' }} className='mb-2'>Description: </p>
                                        <p style={{ textAlign: 'justify' }}>{productData.description}</p>
                                    </Row>

                                </Row>

                            </Col>
                        </Row>
                        <Row className=" my-3">
                            <Col md='12'>
                                <Row className='d-flex justify-content-center'>
                                    <Row>
                                        <p style={{ fontSize: '1.5rem' }}>Features: </p>
                                        {productData.features.map(feature => (
                                            <p key={Math.random()}>{feature}</p>
                                        ))}
                                    </Row>

                                </Row>

                            </Col>
                        </Row>


                    </Card>
                </Row>

            </Container>
        </>
    )
}

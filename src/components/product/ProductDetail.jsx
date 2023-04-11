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

export default function ProductDetail() {
    const [showBreakPoint, setBreakPoint] = useState(true);
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
            (window.innerWidth < 768) ?
                setBreakPoint(false) :
                setBreakPoint(true);
        }
        // Comprobar la resolución inicial
        if (window.innerWidth < 768) {
            setBreakPoint(false);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);




    return (
        <>
            <Container>
                <Row className='my-5'>
                    <Card >
                        <Row className='text-center'>
                            <h1 >{productData.name}</h1>
                        </Row>
                        <Row>
                            <Col md='4'>
                                <Image src={'http://localhost:8080/api/products/upload/img/' + ((productData.photo) ? productData.photo : 'no-photo')} style={{ width: '100%', height: '450px', objectFit: 'contain' }} />
                            </Col>
                            <Col md='4' >
                                <Row className='d-flex align-items-center justify-content-center' style={{ height: '100%' }}>
                                    <Row >
                                        <h5>Condition: {productData.category.condition}</h5>
                                        <h5>Color: {productData.color}</h5>
                                        <h5>Model: {productData.manufacturer.model}</h5>
                                        <h5>Brand: {productData.manufacturer.brand}</h5>
                                        <h5>Manufacturer: {productData.manufacturer.manufacturer}</h5>
                                        <h5>Distributor: {productData.manufacturer.distributor}</h5>
                                    </Row>
                                </Row>

                            </Col>
                            <Col md='3'>
                                <Row className='d-flex align-items-center justify-content-center' style={{ height: '100%' }}>
                                    <Row>
                                        <h2>Features: </h2>
                                        {productData.features.map(feature => (
                                            <p key={Math.random()}>{feature}</p>
                                        ))}
                                        <h5>Price: ${productData.price}</h5>
                                        <h5>Stock: {productData.stock}</h5>
                                    </Row>
                                </Row>

                            </Col>

                        </Row>
                        <Row className="justify-content-md-center my-3">
                            <Col md='3'>
                                <Button variant="primary" style={{ width: '100%' }}>Comprar</Button>
                            </Col>

                        </Row>


                    </Card>
                </Row>

            </Container>
        </>
    )
}

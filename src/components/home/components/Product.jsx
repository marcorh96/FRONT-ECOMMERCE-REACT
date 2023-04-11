import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

export default function Product(props) {
    const { data } = props;
    return (
        <>
            <Card className='my-2' >

                <Card.Img src={'http://localhost:8080/api/products/upload/img/' + ((data.photo) ? data.photo : 'no-photo')} style={{ height: '200px', objectFit: 'contain' }} className='my-2'/>


                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        ${data.price.toLocaleString('es-ES').replace('.', ',')}.00
                    </Card.Text>
                    <Card.Text >
                        Envío gratis!
                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}

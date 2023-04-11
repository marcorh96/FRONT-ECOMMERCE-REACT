import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getProductPageDataService } from '../../services/Products/productsServices';
import Product from './components/Product';
import './css/home.css';
import Pagination from 'react-bootstrap/Pagination';

export default function Home() {
    const [productsData, setProductsData] = useState([]);
    const [showBreakPoint, setBreakPoint] = useState(true);
    const [page, setPage] = useState(0);
    const [data, setData] = useState({});

    const fetchProductsData = async () => {
        try {
            const response = await getProductPageDataService(page);
            setProductsData(response.data.content)
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProductsData();
    }, [page]);

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




    return (
        <>

            <Container>
                <Row className='text-center'>
                    <h1>Products</h1>
                </Row>
                <Row>
                    {productsData.map((product) => {
                        return (
                            <Col key={Math.random()} className='hover' md={((showBreakPoint) ? '3' : '12')}>
                                <div onClick={() => { window.location.href = '/products/' + product.id }} style={{ cursor: 'pointer' }}>
                                    <Product key={product.id} data={product} />
                                </div>
                            </Col>
                        );
                    })}
                </Row>
                <Row className='d-flex justify-content-center my-2'>
                    <Pagination className='mx-auto w-auto'>
                        <Pagination.First onClick={() => setPage(0)} disabled={data.first} />
                        <Pagination.Prev onClick={() => (page != 0) ? setPage(page - 1) : setPage(0)} disabled={data.first} />
                        {
                            Array.from(
                                { length: data.totalPages },
                                (_, i) => i - page
                            )
                                .filter((diff) => diff >= -3 && diff <= 3)
                                .map((diff) => (
                                    <Pagination.Item
                                        key={page + diff}
                                        active={page + diff === page}
                                        onClick={() => setPage(page + diff)}
                                    >
                                        {page + diff + 1}
                                    </Pagination.Item>
                                ))
                        }
                        <Pagination.Next onClick={() => (((data.totalPages - 1) != page)) ? setPage(page + 1) : ''} disabled={data.last} />
                        <Pagination.Last onClick={() => setPage(data.totalPages - 1)} disabled={data.last} />
                    </Pagination>
                </Row>
            </Container>




        </>
    )
}

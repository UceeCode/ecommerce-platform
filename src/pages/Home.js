import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import ProductCard from '../components/ProductCard';
import './Home.css'

const Home = () => {
    const [theme] = useThemeHook();
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);

    async function getResponse(){
        const res = await fetch('https://fakestoreapi.com/products')
                          .then(res=> res.json());
                          setProductData(await res);
    }

    useEffect(()=>{
        getResponse();
    },[]);

    return (
        <Container className="home-container">
            <Row className="justify-content-center">
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                    <h1 className={`search-heading ${theme ? 'dark' : 'light'}`}>
                        Search products
                    </h1>
                    <div className="search-bar">
                        <BiSearch size="2rem" className="search-icon" />
                        <FormControl 
                            placeholder="Search for products..."
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                            className={`search-input ${theme ? 'dark' : ''}`}
                        />
                    </div>
                </Col>
                <SearchFilter 
                    value={searchInput}
                    data={productData}
                    renderResults={results =>(
                        <Row className="product-grid">
                            {results.map((item, i)=>(
                                <ProductCard data={item} key={i} />
                            ))}
                        </Row>
                    )}
                />
            </Row>
        </Container>
    );
    
};

export default Home;
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { useCart } from 'react-use-cart';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from "@reach/router";
import '../components/ProductCard.css';

const ProductCard = (props) => {
    let { image, price, title, id } = props.data;
    const [theme] = useThemeHook();
    const { addItem } = useCart();

    const addToCart = () => {
        addItem(props.data);
    }

    return (
        <Card 
            style={{ width: '18rem', height: 'auto' }}
            className={`${theme ? 'bg-dark text-light' : 'bg-light text-dark'} text-center p-0 overflow-hidden shadow-lg rounded-lg mx-auto mb-4 transition-all transform duration-300 hover:scale-105`}
        >
            <Link to={`/product-details/${id}`}>
                <div className="product-image-container">
                    <Card.Img variant="top" src={image} className="product-img" />
                </div>
            </Link>
            <Card.Body className="p-3">
                <Card.Title className="product-title">{title}</Card.Title>
                <Card.Text className="product-price">
                    ₦ <span className="h3">{price}</span>
                </Card.Text>
                <Button
                    onClick={addToCart}
                    className={`${theme ? 'bg-dark-primary text-white' : 'bg-light-primary text-black'} d-flex align-items-center justify-content-center border-0 rounded-pill py-2 w-100 mt-3 transition-all hover:scale-105`}
                >
                    <BsCartPlus size="1.8rem" />
                    <span className="ml-2">Add to Cart</span>
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;

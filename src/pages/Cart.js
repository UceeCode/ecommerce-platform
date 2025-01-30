import React, { useState } from 'react';
import { Button, Container, Col, Row, Table, Form, Modal } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa'; // Import success icon

const Cart = () => {
    const [theme] = useThemeHook();
    const {
        isEmpty,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    // State for shipping details and form validation
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isCheckout, setIsCheckout] = useState(false);

    // Modal state for visibility
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Confirmation modal state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Proceed with the checkout logic (e.g., submitting the form data)
            setShowModal(false); // Close the form modal
            setShowSuccessModal(true); // Show success modal
            setTimeout(() => {
                setShowSuccessModal(false); // Hide success modal after 3 seconds
                emptyCart(); // Empty cart after successful checkout
            }, 3000);
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.name) errors.name = 'Name is required';
        if (!data.address) errors.address = 'Address is required';
        if (!data.phone) errors.phone = 'Phone number is required';
        if (!data.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
        return errors;
    };

    const handleCheckoutConfirmation = () => {
        setShowConfirmationModal(true); // Show the confirmation modal
    };

    const confirmCheckout = () => {
        setShowConfirmationModal(false); // Close confirmation modal
        setShowModal(true); // Open the shipping details modal
    };

    const cancelCheckout = () => {
        setShowConfirmationModal(false); // Close confirmation modal
    };

    return (
        <Container className="py-4 mt-5">
            <h1 className={`${theme ? 'text-light' : 'text-light-primary'} my-5 text-center`}>
                {isEmpty ? 'Your Cart is Empty' : 'The Cart'}
            </h1>
            <Row className="justify-content-center">
                <Table responsive="sm" striped bordered hover variant={theme ? 'dark' : 'light'} className="mb-5">
                    <tbody>
                        {items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div style={{ background: 'white', height: '8rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ padding: '.5rem' }}>
                                                <img src={item.image} style={{ width: '4rem' }} alt={item.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {item.title}
                                        </h6>
                                    </td>
                                    <td>₦ {item.price}</td>
                                    <td>Quantity ({item.quantity})</td>
                                    <td>
                                        <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="ms-2">-</Button>
                                        <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="ms-2">+</Button>
                                        <Button variant="danger" onClick={() => removeItem(item.id)} className="ms-2">Remove Item</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {!isEmpty && (
                    <Row
                        style={{ position: 'fixed', bottom: 0 }}
                        className={`${theme ? 'bg-light-black text-light' : 'bg-light text-black'} justify-content-center w-100`}
                    >
                        <Col className="py-2">
                            <h4>Total Price: ₦ {cartTotal}</h4>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button variant="danger" className="m-2" onClick={() => emptyCart()}>
                                <BsCartX size="1.7rem" />
                                Clear Cart
                            </Button>
                            <Button
                                variant="success"
                                className="m-2"
                                onClick={handleCheckoutConfirmation} // Show the confirmation modal
                            >
                                <BsCartCheck size="1.7rem" />
                                Checkout
                            </Button>
                        </Col>
                    </Row>
                )}
            </Row>

            {/* Checkout Confirmation Modal */}
            <Modal show={showConfirmationModal} onHide={cancelCheckout} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='confirm'>Are you sure you want to proceed with the checkout?</p>
                    <Button variant="danger" onClick={cancelCheckout}>
                        Cancel
                    </Button>
                    <Button variant="success" className="ms-2" onClick={confirmCheckout}>
                        Confirm Checkout
                    </Button>
                </Modal.Body>
            </Modal>

            {/* Checkout Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='modal-ti'>Enter Shipping Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                isInvalid={!!formErrors.name}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                isInvalid={!!formErrors.address}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                isInvalid={!!formErrors.phone}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                isInvalid={!!formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="success" type="submit" block>
                            Submit Shipping Info
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header>
                    <Modal.Title className="text-success">Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <FaCheckCircle size={50} className="text-success" />
                    <h5>Your order has been successfully placed!</h5>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Cart;

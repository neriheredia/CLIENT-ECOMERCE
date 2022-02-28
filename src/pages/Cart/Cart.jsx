import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publicRequest } from "../../config/requestMethods";
import { useNavigate } from "react-router-dom";
import { onCleanCart } from "../../redux/apiCalls";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import Footer from "../../components/Footer/Footer";
import Logo from '../../asset/logo.png'
import Swal from 'sweetalert2'
import {
    Container,
    Wrapper,
    Top,
    TopButton,
    Bottom,
    Info,
    Product,
    ProductDetail,
    Image,
    Details,
    ProductName,
    ProductId,
    ProductSize,
    PriceDetail,
    ProductPrice,
    Hr,
    Summary,
    SummaryTitle,
    SummaryItem,
    SummaryItemText,
    SummaryItemPrice,
    Button,
} from "./Cart.style";


const KEY = "pk_test_51KTHNqKxK712fkWkpddjvo4wS93yK5sVKG0cUZ5bLcIsxXc5J8UUfToFNZYXf09altAHfam57Sgxi8dfKQIil2r600FLkfDU2C";

const Cart = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const token = useSelector((state) => state.user.currentUser.accessToken);

    const [stripeToken, setStripeToken] = useState(null);
    const [shipping] = useState(50)
    const [discount] = useState(20)
    const [total, setTotal] = useState(0)



    const onToken = (token) => {
        setStripeToken(token);
        navigate("/success");
    };

    const onClean = () => {
        if (cart.products.length > 0) {
            navigate("/")
            onCleanCart(dispatch)
        } else {
            Toast.fire({
                icon: 'warning',
                title: 'You must have products in the cart',
            });
        }
    }

    const onNavigate = () => {
        navigate("/")
    }

    useEffect(() => {
        setTotal((cart.total + shipping) - ((cart.total * discount) / 100))
    }, [cart.total])

    useEffect(() => {
        const makeRequest = async () => {
            try {
                await publicRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: total * 100,
                }, {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
                navigate("/success");
            } catch { }
        };
        stripeToken && makeRequest();
    }, [stripeToken, total, navigate]);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                {/* <Title>YOUR BAG</Title> */}
                <Top>
                    <TopButton onClick={onNavigate} >CONTINUE SHOPPING</TopButton>
                    {/* <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts> */}
                    <TopButton type="filled" onClick={onClean} >CLEAN CART NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>Color:</b> {product.color}
                                        </ProductId>
                                        {/* <ProductColor color={product.color} /> */}
                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                        <ProductSize>
                                            <b>Quantity:</b> {product.quantity}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    {/* <ProductAmountContainer> */}
                                    {/* <Add /> */}
                                    {/* <ProductAmount>{`Quantity: ${product.quantity}`}</ProductAmount> */}
                                    {/* <Remove /> */}
                                    {/* </ProductAmountContainer> */}
                                    <ProductPrice>
                                        $ {product.price * product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>{`$ ${shipping}`}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>20%</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>
                                $ {" "}{cart.total > 0 ? parseFloat(total).toFixed(2) : 0}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="E-COMERCE"
                            image={Logo}
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Cart;




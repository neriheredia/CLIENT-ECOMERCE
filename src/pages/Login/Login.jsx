import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import {
    Container,
    Wrapper,
    Title,
    Form,
    Input,
    Button,
    DivBtn,
} from "./Login.style";


const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const user = useSelector(state => state.user)

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

    useEffect(() => {
        const handleAlert = () => {
            if (error) return Toast.fire({
                icon: 'info',
                title: 'invalid credentials',
            });
            else return null
        }
        handleAlert()
    }, [error, Toast])

    const handleClick = (e) => {
        e.preventDefault();
        if (data.username === "" || data.password === "") {
            e.preventDefault();
            Toast.fire({
                icon: 'info',
                title: 'invalid credentials',
            });
            setData({
                username: '',
                password: ''
            })
        } else {
            e.preventDefault()
            login(dispatch, data)
                .then(res => {
                    !user.error ?
                        Toast.fire({
                            icon: 'info',
                            title: 'invalid credentials',
                        })
                        :
                        navigate('/');
                })
                .catch(err => console.log(err))
        }
    };

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
        setError(false)
    }

    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Input
                        placeholder="username"
                        onChange={onChange}
                        name="username"
                        value={data.username}
                    />
                    {error && <p style={{ color: 'red' }} >You must be write a user...</p>}
                    <Input
                        placeholder="password"
                        type="password"
                        name="password"
                        onChange={onChange}
                        value={data.password}
                    />
                    {error && <p style={{ color: 'red' }} >You must be write a password...</p>}
                    <DivBtn>
                        <Button className="linkGeneric">
                            <NavLink style={{ borderRadius: '5px' }} className="linkRegister" to="/">
                                RETURN
                            </NavLink>
                        </Button>
                        <Button className="linkGeneric" onClick={handleClick}>
                            LOGIN
                        </Button>
                    </DivBtn>
                    {/* <NavLink className="linkGeneric" to="/register">
                        DO NOT YOU REMEMBER THE PASSWORD?
                    </NavLink> */}
                    <NavLink className="linkGeneric" to="/register">
                        <strong style={{ color: '#fd3c3c' }} >CREATE A NEW ACCOUNT</strong>
                    </NavLink>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;

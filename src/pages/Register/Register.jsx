import { useState } from "react";
import { publicRequest } from "../../config/requestMethods";
import Swal from 'sweetalert2'
import {
    Container,
    Wrapper,
    Title,
    Form,
    Input,
    Agreement,
    Button,
} from "./Register.style";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await publicRequest.post("auth/register", data);
            res.data && navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        if (data.username === '' || data.email === '' || data.password === '') {
            Toast.fire({
                icon: 'warning',
                title: 'Incomplete form'
            });
            setError(true)
        } else {
            Toast.fire({
                icon: 'success',
                title: 'User created'
            });
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleSubmit}>
                    {/* <Input placeholder="name" />
          <Input placeholder="last name" /> */}
                    <Input
                        type="text"
                        placeholder="username"
                        name="username"
                        required
                        onChange={onChange}
                    />
                    <Input
                        type="email"
                        placeholder="email"
                        name="email"
                        required
                        onChange={onChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        onChange={onChange}
                    />
                    {/* <Input type="password" placeholder="confirm password" /> */}
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button disabled={true}>
                        <NavLink style={{ borderRadius: '5px' }} className="linkRegister" to='/'>
                            RETURN
                        </NavLink>
                    </Button>
                    <Button
                        onClick={handleClick}
                    >
                        CREATE
                    </Button>
                </Form>
                {error && (
                    <span style={{ color: "red", marginTop: "10px" }}>
                        Something went wrong!
                    </span>
                )}
            </Wrapper>
        </Container>
    );
};

export default Register;

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState, useEffect } from 'react';
import eye from '../assets/eye.png';
import hidden from '../assets/hidden.png';
import { useNavigate, Link } from 'react-router-dom';
import { Msg } from '../components/message.jsx';
import { getUserData } from '../services/apiclient.jsx';
import * as Yup from 'yup';
import './style.css'

// eslint-disable-next-line react/prop-types
const Login = ({ setIsLogged }) => {
    const initialValue = { email: '', password: '' }
    const navigate = useNavigate()
    const [check, setCheck] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [img, setImg] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        const loadData = async () => {
            const result = await getUserData()
            setData(result)
        }
        loadData()
    }, [])
    const handleToggle = () => {
        setImg(!img)
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('*Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, '*Invalid email address'),
        password: Yup.string().required('*Required')
            .matches(/[0-9]/, '*Password requires a number')
            .matches(/[a-z]/, '*Password requires a lowercase letter')
            .matches(/[A-Z]/, '*Password requires a uppercase letter')
            .matches(/[^\w]/, '*Password requires a symbol').min(8, '*Password must be 8 characters long'),
    })
    const handleSubmit = (values, setSubmitting) => {
        let checkUser = data.find((e) => (e.email === values.email && e.password === values.password))
        localStorage.setItem('ID', JSON.stringify(checkUser.id))
        if (checkUser) {
            setCheck(true)
            setCheck1(false)
            setIsLogged(true)
            setTimeout(() => {
                setCheck(false)
                navigate(`/logged/${checkUser.fullname}`)
                setCheck(true)
            }, 1000)
        }
        else {
            setCheck1(true)
        }
        setSubmitting(false)
    }
    return (
        <div className='main1'>
            <h1 style={{ margin: '0px' }}>Login</h1>
            <p>Don&apos;t have an account? <Link className='col' to={'/register'}>Sign up</Link></p>
            <Formik initialValues={initialValue} validationSchema={() => validationSchema} onSubmit={(values, { setSubmitting }) => { handleSubmit(values, setSubmitting) }}>
                {({ isSubmitting, resetForm }) => (
                    <Form className='form'>
                        <label htmlFor="email">Email Address:</label>
                        <Field className="size" id="email" type='text' name='email' placeholder='Enter your email' />
                        <ErrorMessage className="red" name='email' component='span' />
                        <div>Password:</div>
                        <label className='image' htmlFor="password">
                            <Field className="size pos" id="password" type={img ? "text" : "password"} name='password' placeholder='Enter password' />
                            {img ? <img className='img1' src={hidden} alt="Logo" onClick={handleToggle} /> : <img className='img1' src={eye} alt="Logo" onClick={handleToggle} />}
                        </label>
                        <ErrorMessage className="red" name='password' component='span' />
                        <div className='btn'>
                            <button type='submit' disabled={isSubmitting}>Login</button>
                            <button type='reset' onClick={resetForm}>Reset</button>
                        </div>
                    </Form>
                )}
            </Formik>
            {check ? <Msg message="Login Success!" /> : []}
            {check1 ? <Msg message="Incorrect Email/Password!" /> : []}
        </div>
    )
}
export default Login
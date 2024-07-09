/* eslint-disable react/prop-types */
import './style.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react';
import eye from '../assets/eye.png';
import hidden from '../assets/hidden.png';
import { useNavigate, Link } from 'react-router-dom';
import { Msg } from '../components/message.jsx';
import { postUserData } from '../services/apiclient.jsx';

// eslint-disable-next-line no-unused-vars
const Register = ({ initialValue, validationSchema }) => {
    const [check, setCheck] = useState(false);
    const [img, setImg] = useState(false)
    const handleToggle = () => {
        setImg(!img)
    }
    const navigate = useNavigate()
    const handleSubmit = async (value, setSubmitting) => {
        await postUserData(value.fullname, value.email, value.password)
        setCheck(true)
        setTimeout(() => {
            setCheck(false)
            setSubmitting(false)
            navigate('/login')
        }, 2000)
    }
    return (
        <div className='main1'>
            <h1 style={{ margin: '0px' }}>Register</h1>
            <p>Already have an account? <Link className='col' to={'/login'}>Log in</Link></p>
            <Formik initialValues={initialValue} validationSchema={() => validationSchema} onSubmit={(values, { setSubmitting }) => { handleSubmit(values, setSubmitting) }}>
                {({ isSubmitting, resetForm }) => (
                    <Form className='form'>
                        <label htmlFor="fullname">Full Name:</label>
                        <Field className="size" id="fullname" type='text' name='fullname' placeholder='Enter your name' />
                        <ErrorMessage className="red" name='fullname' component='span' />
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
                            <button type='submit' disabled={isSubmitting}>Sign-up</button>
                            <button type='reset' onClick={resetForm}>Reset</button>
                        </div>
                    </Form>
                )}
            </Formik>
            {check ? <Msg message="Sign up Successfull!" /> : []}
        </div>
    )
}
export default Register
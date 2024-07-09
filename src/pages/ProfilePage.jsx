/* eslint-disable react/prop-types */
import MainLayout from "../components/MainLayout"
import { useParams } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState, useEffect } from "react";
import './style.css';
import eye from '../assets/eye.png';
import hidden from '../assets/hidden.png';
import { Msg } from "../components/message";
import { getUserDataID, putUserDataID } from '../services/apiclient.jsx';

const ProfilePage = ({ isLogged, setIsLogged, validationSchema }) => {
  const { name } = useParams()
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [img, setImg] = useState(false)
  const [newName, setNewName] = useState('')
  useEffect(() => {
    setNewName(name)
  }, [name])
  const handleToggle = () => {
    setImg(!img)
  }
  const id = JSON.parse(localStorage.getItem("ID"))
  const [data, setData] = useState([])
  useEffect(() => {
    const loadData = async () => {
      const result = await getUserDataID(id)
      setData(result)
    }
    loadData()
  }, [id])
  const savedValues = {
    fullname: data.fullname, email: data.email, password: data.password
  }
  setTimeout(() => {
    setCheck1(true)
  }, 600)
  const handleSave = async (value, setSubmitting) => {
    await putUserDataID(id, value.fullname, value.email, value.password)
    setCheck(true)
    setNewName(value.fullname)
    setTimeout(() => {
      setCheck(false)
      setSubmitting(false)
    }, 2000)
  }
  return (
    <MainLayout isLogged={isLogged} setIsLogged={setIsLogged} name={newName}>
      {check1 ? <div className='main1'>
        <h1 style={{ marginBottom: '15px' }}>User Details</h1>
        <Formik initialValues={savedValues} validationSchema={() => validationSchema} onSubmit={(values, { setSubmitting }) => { handleSave(values, setSubmitting) }}>
          {({ isSubmitting }) => (
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
              <button className="btn1" type='submit' disabled={isSubmitting}>Save Changes</button>
            </Form>
          )}
        </Formik>
        {check ? <Msg message="Changes Saved!" /> : []}
      </div> : ''}
    </MainLayout >
  )
}

export default ProfilePage
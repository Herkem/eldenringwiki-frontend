// Imports
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import loginService from '../../services/crudApiService'

// Component that renders the login form
const Login = () => {
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    const navigate = useNavigate()

    const { Formik } = formik

    // Login schema
    const schema = yup.object().shape({
        email: yup.string().email('*Email must be a valid email').required('*Email is required'),
        password: yup.string().required('*Password is required')
    })

    const handleClose = () => setShow(false);

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-75 mx-auto"></hr>
                <h2 className='text-center'>LOGIN</h2>
                <hr className="w-75 mx-auto"></hr>
            </div>
            <Container>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)

                        loginService
                            .post('users/login', values)
                            .then(res => {
                                if (res.success) {
                                    navigate('/')
                                } else {
                                    resetForm()
                                    setMessage(res.message)
                                    setShow(true)
                                }
                            })
                    }}
                >

                    {({ values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <Form className='formStyle'>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!errors.email} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type='password' name='password' onChange={handleChange} onBlur={handleBlur} value={values.password} isInvalid={!!errors.password} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit}>LOGIN</Button>
                        </Form>
                    )}
                </Formik>
            </Container >

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Something wrong!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login;

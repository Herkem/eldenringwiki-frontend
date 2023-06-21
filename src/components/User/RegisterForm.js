// Imports
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import registerService from '../../services/crudApiService'

// Component that renders the register form
const Register = () => {
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    const navigate = useNavigate()

    const { Formik } = formik

    // RegEx for password
    const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    // Register schema
    const schema = yup.object().shape({
        userName: yup.string().required('*User Name is required'),
        email: yup.string().email('*Email must be a valid email').required('*Email is required'),
        password: yup.string()
            .matches(passRegEx, '*Password must be at minimum eight characters, at least one' +
                'uppercase letter, one lowercase letter, one number and one special character')
            .required('*Password is required'),
        rep_password: yup.string()
            .oneOf([yup.ref("password"), null], "*Passwords must match")
            .required('*Confirm Password is required')
    })

    // Modal handler
    const handleClose = () => setShow(false)

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-75 mx-auto"></hr>
                <h2 className='text-center'>REGISTER</h2>
                <hr className="w-75 mx-auto"></hr>
            </div>
            <Container>
                <Formik
                    initialValues={{
                        userName: '',
                        email: '',
                        password: '',
                        rep_password: ''
                    }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)

                        registerService
                            .post('users/register', values)
                            .then(res => {
                                if (res.success) {
                                    navigate('/')
                                } else {
                                    resetForm()
                                    setMessage(res.message)
                                    setShow(true)
                                }
                            })
                            .catch(err => console.log(err))
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
                                <Form.Label>User Name:</Form.Label>
                                <Form.Control type='text' name='userName' onChange={handleChange} onBlur={handleBlur} value={values.userName} isInvalid={!!errors.userName} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.userName}
                                </Form.Control.Feedback>
                            </Form.Group>

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

                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control type='password' name='rep_password' onChange={handleChange} onBlur={handleBlur} value={values.rep_password} isInvalid={!!errors.rep_password} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.rep_password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit}>REGISTER</Button>
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

export default Register;

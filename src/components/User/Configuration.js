// Imports
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Container, Row, Tab, Nav, Form, Modal } from 'react-bootstrap';
import userService from '../../services/crudApiService'

// Component that renders the configuration forms
const Configuration = () => {
    const location = useLocation()

    const { user } = location.state

    // State for the password check when the user is trying to change the password
    const [correctPass, setCorrectPass] = useState(false)

    // Modal states
    const [showPassModal, setShowPassModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false)
    const [message, setMessage] = useState('')

    const { Formik } = formik

    // General form schema
    const updateGeneralSchema = yup.object().shape({
        userName: yup.string().required('*User Name is required'),
        email: yup.string().email('*Email must be a valid email').required('*Email is required'),
    })

    // Password RegEx
    const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    // Update password form schema
    const updatePasswordSchema = yup.object().shape({
        password: yup.string()
            .matches(passRegEx, '*Password must be at minimum eight characters, at least one' +
                'uppercase letter, one lowercase letter, one number and one special character')
            .required('*Password is required'),
        rep_password: yup.string()
            .oneOf([yup.ref("password"), null], "*Passwords must match")
            .required('*Confirm Password is required')
    })

    // Handler for the check password form
    const handleSubmitCheckForm = async (e) => {
        e.preventDefault()

        await userService
            .post('users/password', {
                id: user.id,
                email: e.target.email.value,
                password: e.target.password.value
            })
            .then(res => {
                if (res.success) {
                    handleClosePassModal()
                    setCorrectPass(true)
                } else {
                    handleClosePassModal()
                    setShowErrorModal(true)
                    setMessage(res.message)
                }
            })
            .catch(err => console.log(err))
    }

    // Modal handlers
    const handleClosePassModal = () => setShowPassModal(false)
    const handleCloseErrorModal = () => setShowErrorModal(false)
    const handleCloseInfoModal = () => setShowInfoModal(false)

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-50 mx-auto"></hr>
                <h2>USER CONFIGUATION</h2>
                <hr className="w-50 mx-auto"></hr>
            </div>
            <Container className='rounded-4 mb-5 py-5 px-5' fluid style={{ maxWidth: '800px', height: '400px', backgroundColor: '#3C5473', color: '#D9D2B0' }}>
                <Tab.Container id="tabs" defaultActiveKey="general">
                    <Row>
                        <Col sm={3} className='mb-3'>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="general">General</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="password">Password</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="general">
                                    <Formik
                                        initialValues={{
                                            userName: user.userName,
                                            email: user.email,
                                        }}
                                        validationSchema={updateGeneralSchema}
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            setSubmitting(true)

                                            userService
                                                .put(`users/updateGeneral/${user.id}`, {
                                                    userName: values.userName,
                                                    email: values.email,
                                                    password: user.password,
                                                    imgUser: `${values.userName}.png`,
                                                    role: user.role
                                                })
                                                .then(res => {
                                                    if (res.success) {
                                                        setMessage(res.message)
                                                        setShowInfoModal(true)
                                                    } else {
                                                        setShowErrorModal(true)
                                                        setMessage(res.message)
                                                        resetForm(true)
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
                                            <Form>
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

                                                <Button onClick={handleSubmit}>UPDATE</Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Tab.Pane>

                                <Tab.Pane eventKey="password">
                                    {
                                        correctPass ?
                                            <Formik
                                                initialValues={{
                                                    password: '',
                                                    rep_password: ''
                                                }}
                                                validationSchema={updatePasswordSchema}
                                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                                    setSubmitting(true)

                                                    userService
                                                        .put(`users/updatePassword/${user.id}`, {
                                                            userName: user.userName,
                                                            email: user.email,
                                                            password: values.password,
                                                            imgUser: `${user.userName}.png`,
                                                            role: user.role
                                                        })
                                                        .then(res => {
                                                            if (res.success) {
                                                                setMessage(res.message)
                                                                setShowInfoModal(true)
                                                                setCorrectPass(false)
                                                            } else {
                                                                setShowErrorModal(true)
                                                                setMessage(res.message)
                                                                resetForm(true)
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
                                                    <Form>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>New Password:</Form.Label>
                                                            <Form.Control type='password' name='password' onChange={handleChange} onBlur={handleBlur} value={values.password} isInvalid={!!errors.password} />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.password}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Confirm New Password:</Form.Label>
                                                            <Form.Control type='password' name='rep_password' onChange={handleChange} onBlur={handleBlur} value={values.rep_password} isInvalid={!!errors.rep_password} />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.rep_password}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Button variant="primary" onClick={handleSubmit}>UPDATE</Button>
                                                    </Form>
                                                )}
                                            </Formik>
                                            :
                                            <Button className='mt-3' onClick={() => setShowPassModal(true)}>Change Password</Button>
                                    }
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>

            <Modal show={showPassModal} onHide={handleClosePassModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Please enter your email and password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitCheckForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='email' name='email' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' name='password' />
                        </Form.Group>
                        <Button variant="primary" type='submit'>CHECK</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Something wrong!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseErrorModal}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Looks good!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseInfoModal}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Configuration

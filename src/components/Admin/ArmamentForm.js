//Imports
import { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import armamentService from '../../services/crudApiService'

const ArmamentForm = () => {
    const [file, setFile] = useState('')
    const [subcategories, setSubcategories] = useState([])

    const location = useLocation()
    const navigate = useNavigate()

    const { type } = location.state

    useEffect(() => {
        armamentService
            .get(`${type}/${type}_categories`)
            .then(res => setSubcategories(res))
            .catch(err => console.log(err))
    })

    const { Formik } = formik
    const schema = yup.object().shape({
        name: yup.string().required('*Name is required'),
        location: yup.string().required('*Location is required'),
        weight: yup.number().required('*Weight is required'),
        requirement: yup.number().required('*Requirement is required'),
    })

    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }
    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-75 mx-auto"></hr>
                <h2 className='text-center'>{type.toUpperCase()} FORM</h2>
                <hr className="w-75 mx-auto"></hr>
            </div>
            <Container>
                <Formik
                    initialValues={{
                        name: '',
                        location: '',
                        weight: 0,
                        scales: 'Strength',
                        scaling: 'S',
                        requires: 'Strength',
                        requirement: 0
                    }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        const formData = new FormData()
                        formData.append('name', values.name)
                        formData.append('location', values.location)
                        formData.append('weight', values.weight)
                        formData.append('scales', values.scales)
                        formData.append('scaling', values.scaling)
                        formData.append('requires', values.requires)
                        formData.append('requirement', values.requirement)
                        formData.append('subcategory', values.subcategory)
                        formData.append('image', file)

                        armamentService
                            .post(`${type}`, formData)
                            .catch(err => console.log(err))

                        setSubmitting(false);
                        navigate('/admin_display', { state: { type: type } })
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
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type='text' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Location:</Form.Label>
                                <Form.Control as="textarea" rows={3} name='location' onChange={handleChange} onBlur={handleBlur} value={values.location} isInvalid={!!errors.location} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.location}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Weight:</Form.Label>
                                <Form.Control type='number' name='weight' onChange={handleChange} onBlur={handleBlur} value={values.weight} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Subcategory:</Form.Label>
                                <Form.Control as='select' name='subcategory' value={values.subcategory} onChange={handleChange} onBlur={handleBlur}>
                                    {
                                        subcategories.map((subcategory, i) => <option key={i} value={subcategory.category}>{subcategory.category.replace(/_/g, ' ')}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Label as='p'>Scales:</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Label>Stat:</Form.Label>
                                                <Form.Control as='select' name='scales' value={values.scales} onChange={handleChange} onBlur={handleBlur}>
                                                    <option value='strength'>Strength</option>
                                                    <option value='dexterity'>Dexterity</option>
                                                    <option value='intelligence'>Intelligence</option>
                                                    <option value='faith'>Faith</option>
                                                    <option value='arcane'>Arcane</option>
                                                </Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Label>Scaling:</Form.Label>
                                                <Form.Control as='select' name='scaling' value={values.scaling} onChange={handleChange} onBlur={handleBlur}>
                                                    <option value='S'>S</option>
                                                    <option value='A'>A</option>
                                                    <option value='B'>B</option>
                                                    <option value='C'>C</option>
                                                    <option value='D'>D</option>
                                                    <option value='E'>E</option>
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Label>Requires:</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Label>Stat:</Form.Label>
                                                <Form.Control as='select' name='requires' value={values.requires} onChange={handleChange} onBlur={handleBlur}>
                                                    <option value='strength'>Strength</option>
                                                    <option value='dexterity'>Dexterity</option>
                                                    <option value='intelligence'>Intelligence</option>
                                                    <option value='faith'>Faith</option>
                                                    <option value='arcane'>Arcane</option>
                                                </Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Label>Requirement:</Form.Label>
                                                <Form.Control type='number' name='requirement' onChange={handleChange} onBlur={handleBlur} value={values.requirement} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image:</Form.Label>
                                <Form.Control type="file" name='image' onChange={handleImageChange} />
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit}>ADD</Button>
                        </Form>
                    )}
                </Formik>
            </Container >
        </>
    )
}

export default ArmamentForm

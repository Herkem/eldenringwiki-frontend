//Imports
import { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import spellsService from '../../services/crudApiService'

const SpellForm = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [file, setFile] = useState('')
    const [spell] = useState(location.state !== null ?
        {
            name: location.state.type.name,
            location: location.state.type.location,
            effect: location.state.type.effect,
            category: location.state.type.category,
            cost: location.state.type.cost,
            slots: location.state.type.slots
        }
        :
        {
            name: '',
            location: '',
            effect: '',
            category: 'Sorcery',
            cost: 0,
            slots: 0
        })

    const { Formik } = formik
    const schema = yup.object().shape({
        name: yup.string().required('*Name is required'),
        location: yup.string().required('*Location is required'),
        effect: yup.string().required('*Effect is required'),
        cost: yup.number().required('*Cost is required'),
        slots: yup.number().required('*Slots are required'),
    })

    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-75 mx-auto"></hr>
                <h2 className='text-center'>SPELL FORM</h2>
                <hr className="w-75 mx-auto"></hr>
            </div>
            <Container>
                <Formik
                    initialValues={{
                        name: spell.name,
                        location: spell.location,
                        effect: spell.effect,
                        category: spell.category,
                        cost: spell.cost,
                        slots: spell.slots,
                    }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        const formData = new FormData()
                        formData.append('name', values.name)
                        formData.append('location', values.location)
                        formData.append('effect', values.effect)
                        formData.append('category', values.category)
                        formData.append('cost', values.cost)
                        formData.append('slots', values.slots)
                        formData.append('image', file)

                        if (location.state !== null) {
                            spellsService
                                .put(`spells/${location.state.type.id}`, formData)
                                .catch(err => console.log(err))
                        } else {
                            spellsService
                                .post('spells', formData)
                                .catch(err => console.log(err))
                        }

                        setSubmitting(false);
                        navigate('/admin_display', { state: { type: 'spells' } })
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
                                <Form.Label>Effect:</Form.Label>
                                <Form.Control as="textarea" rows={3} name='effect' onChange={handleChange} onBlur={handleBlur} value={values.effect} isInvalid={!!errors.effect} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.effect}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category:</Form.Label>
                                <Form.Control as='select' name='category' value={values.category} onChange={handleChange} onBlur={handleBlur}>
                                    <option value='sorcery'>Sorcery</option>
                                    <option value='incantation'>Incantation</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.affinity}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Cost:</Form.Label>
                                        <Form.Control type='number' name='cost' onChange={handleChange} onBlur={handleBlur} value={values.cost} />
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Slots:</Form.Label>
                                        <Form.Control type='number' name='slots' onChange={handleChange} onBlur={handleBlur} value={values.slots} />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image:</Form.Label>
                                <Form.Control type="file" name='image' onChange={handleImageChange} />
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit}>
                                {
                                    location.state !== null ?
                                        'UPDATE'
                                        :
                                        'ADD'
                                }
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container >
        </>
    )
}

export default SpellForm

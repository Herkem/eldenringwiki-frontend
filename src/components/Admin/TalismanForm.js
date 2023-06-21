//Imports
import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import talismanService from '../../services/crudApiService'

const TalismanForm = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [file, setFile] = useState('')
    const [talisman] = useState(location.state !== null ?
        {
            name: location.state.type.name,
            location: location.state.type.location,
            effect: location.state.type.effect,
            weight: location.state.type.weight
        }
        :
        {
            name: '',
            location: '',
            effect: '',
            weight: 0
        })

    const { Formik } = formik
    const schema = yup.object().shape({
        name: yup.string().required('*Name is required'),
        location: yup.string().required('*Location is required'),
        effect: yup.string().required('*Effect is required'),
        weight: yup.number().required('*Weight is required')
    })

    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-75 mx-auto"></hr>
                <h2 className='text-center'>TALISMAN FORM</h2>
                <hr className="w-75 mx-auto"></hr>
            </div>
            <Container>
                <Formik
                    initialValues={{
                        name: talisman.name,
                        location: talisman.location,
                        effect: talisman.effect,
                        weight: talisman.weight,
                    }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        const formData = new FormData()
                        formData.append('name', values.name)
                        formData.append('location', values.location)
                        formData.append('effect', values.effect)
                        formData.append('weight', values.weight)
                        formData.append('image', file)

                        if (location.state !== null) {
                            talismanService
                                .put(`talismans/${location.state.type.id}`, formData)
                                .catch(err => console.log(err))
                        } else {
                            talismanService
                                .post('talismans', formData)
                                .catch(err => console.log(err))
                        }

                        setSubmitting(false);
                        navigate('/admin_display', { state: { type: 'talismans' } })
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
                                <Form.Label>Weight:</Form.Label>
                                <Form.Control type='number' name='weight' onChange={handleChange} onBlur={handleBlur} value={values.weight} />
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

export default TalismanForm

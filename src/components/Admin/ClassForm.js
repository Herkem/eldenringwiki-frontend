//Imports
import { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import classService from '../../services/crudApiService'

const ClassForm = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [file, setFile] = useState(location.state !== null ? location.state.image : undefined)
    const [characterClass] = useState(location.state !== null ?
        {
            name: location.state.type.name,
            description: location.state.type.description,
            level: location.state.type.level,
            vig: location.state.type.stats.VIGOR,
            min: location.state.type.stats.MIND,
            end: location.state.type.stats.ENDURANCE,
            str: location.state.type.stats.STRENGTH,
            dex: location.state.type.stats.DEXTERITY,
            int: location.state.type.stats.INTELLIGENCE,
            fai: location.state.type.stats.FAITH,
            arc: location.state.type.stats.ARCANE
        }
        :
        {
            name: '',
            description: '',
            level: 0,
            vig: 0,
            min: 0,
            end: 0,
            str: 0,
            dex: 0,
            int: 0,
            fai: 0,
            arc: 0
        })

    const { Formik } = formik
    const schema = yup.object().shape({
        name: yup.string().required('*Name is required'),
        description: yup.string().required('*Description is required'),
        level: yup.number().required('*Level is required'),
        vig: yup.number().required('*Vigor is required'),
        min: yup.number().required('*Mind is required'),
        end: yup.number().required('*Endurance is required'),
        str: yup.number().required('*Strength is required'),
        dex: yup.number().required('*Dexterity is required'),
        int: yup.number().required('*Intelligence is required'),
        fai: yup.number().required('*Faith is required'),
        arc: yup.number().required('*Arcane is required')
    })

    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-75 mx-auto"></hr>
                <h2 className='text-center'>CLASS FORM</h2>
                <hr className="w-75 mx-auto"></hr>
            </div>
            <Container>
                <Formik
                    initialValues={{
                        name: characterClass.name,
                        description: characterClass.description,
                        level: characterClass.level,
                        vig: characterClass.vig,
                        min: characterClass.min,
                        end: characterClass.end,
                        str: characterClass.str,
                        dex: characterClass.dex,
                        int: characterClass.int,
                        fai: characterClass.fai,
                        arc: characterClass.arc
                    }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        const formData = new FormData()
                        formData.append('name', values.name)
                        formData.append('description', values.description)
                        formData.append('level', values.level)
                        formData.append('vigor', values.vig)
                        formData.append('mind', values.min)
                        formData.append('endurance', values.end)
                        formData.append('strength', values.str)
                        formData.append('dexterity', values.dex)
                        formData.append('intelligence', values.int)
                        formData.append('faith', values.fai)
                        formData.append('arcane', values.arc)
                        formData.append('image', file)

                        if (location.state !== null) {
                            classService
                                .put(`classes/${location.state.type.id}`, formData)
                                .catch(err => console.log(err))
                        } else {
                            classService
                                .post('classes', formData)
                                .catch(err => console.log(err))
                        }

                        setSubmitting(false);
                        navigate('/admin_display', { state: { type: 'classes' } })
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
                                <Form.Label>Description:</Form.Label>
                                <Form.Control as="textarea" rows={3} name='description' onChange={handleChange} onBlur={handleBlur} value={values.description} isInvalid={!!errors.description} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Level:</Form.Label>
                                <Form.Control type='number' rows={3} name='level' onChange={handleChange} onBlur={handleBlur} value={values.level} />
                            </Form.Group>

                            <Form.Group>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Vigor:</Form.Label>
                                        <Form.Control type='number' rows={3} name='vig' onChange={handleChange} onBlur={handleBlur} value={values.vig} />
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Mind:</Form.Label>
                                        <Form.Control type='number' rows={3} name='min' onChange={handleChange} onBlur={handleBlur} value={values.min} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Endurance:</Form.Label>
                                        <Form.Control type='number' rows={3} name='end' onChange={handleChange} onBlur={handleBlur} value={values.end} />
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Strength:</Form.Label>
                                        <Form.Control type='number' rows={3} name='str' onChange={handleChange} onBlur={handleBlur} value={values.str} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Dexterity:</Form.Label>
                                        <Form.Control type='number' rows={3} name='dex' onChange={handleChange} onBlur={handleBlur} value={values.dex} />
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Intelligence:</Form.Label>
                                        <Form.Control type='number' rows={3} name='int' onChange={handleChange} onBlur={handleBlur} value={values.int} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Faith:</Form.Label>
                                        <Form.Control type='number' rows={3} name='fai' onChange={handleChange} onBlur={handleBlur} value={values.fai} />
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Label className="mb-3">Arcane:</Form.Label>
                                        <Form.Control type='number' rows={3} name='arc' onChange={handleChange} onBlur={handleBlur} value={values.arc} />
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

export default ClassForm

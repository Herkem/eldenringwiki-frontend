// Imports
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import ashService from '../../services/crudApiService'

// Component that renders the information of an ash
const AshInfo = () => {
    const [ash, setAsh] = useState({})
    const location = useLocation()

    useEffect(() => {
        // Getting the ash by id
        ashService
            .get(`ashes/id=${location.state.id}`)
            .then(res => setAsh(res))
    }, [location.state.id])

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-50 mx-auto"></hr>
                <h2>ASH INFO</h2>
                <hr className="w-50 mx-auto"></hr>
            </div>
            <Container className='rounded-4 text-center mb-5 py-3 px-5' fluid style={{ maxWidth: '800px', backgroundColor: '#3C5473', color: '#D9D2B0' }}>
                <Row>
                    <h3> {ash.name} </h3>
                </Row>
                <Row>
                    <Col lg={6} md={12} className='d-flex justify-content-center align-self-center'>
                        <div className='img-container d-flex justify-content-center align-items-center'>
                            <img src={ash.image} alt='img' />
                        </div>
                    </Col>
                    <Col lg={6} md={12} className='mt-3'>
                        <article>
                            <div className='d-flex justify-content-center align-items-center'>
                                <hr className='w-25 me-2'></hr>
                                <h4>Effect</h4>
                                <hr className='w-25 ms-2'></hr>
                            </div>
                            <p> {ash.effect} </p>
                        </article>

                        <article>
                            <div className='d-flex justify-content-center align-items-center'>
                                <hr className='w-25 me-2'></hr>
                                <h4>Location</h4>
                                <hr className='w-25 ms-2'></hr>
                            </div>
                            <p> {ash.location} </p>
                        </article>

                        <article>
                            <div className='d-flex justify-content-center align-items-center'>
                                <hr className='w-25 me-2'></hr>
                                <h4>Affinity</h4>
                                <hr className='w-25 ms-2'></hr>
                            </div>
                            <p> {ash.affinity} </p>
                        </article>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AshInfo

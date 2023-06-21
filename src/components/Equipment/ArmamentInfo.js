// Imports
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Container, Row, Table } from 'react-bootstrap'
import armamentService from '../../services/crudApiService'

// Component that renders the information of an armament
const ArmamentInfo = ({ type }) => {
    const [armament, setArmament] = useState({})
    const location = useLocation()

    useEffect(() => {
        // Getting the armament by id
        armamentService
            .get(`${type}/${location.state.id}`)
            .then(res => setArmament(res))
    }, [type, location.state.id])

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-50 mx-auto"></hr>
                <h2>{type.slice(0, -1).toUpperCase()} INFO</h2>
                <hr className="w-50 mx-auto"></hr>
            </div>
            <Container className='rounded-4 text-center mb-5 py-3 px-5' fluid style={{ maxWidth: '800px', backgroundColor: '#3C5473', color: '#D9D2B0' }}>
                <Row>
                    <h3> {armament.name} </h3>
                </Row>
                <Row>
                    <Col lg={6} md={12} className='d-flex justify-content-center align-self-center'>
                        <div className='img-container d-flex justify-content-center align-items-center'>
                            <img src={armament.image} alt='img' />
                        </div>
                    </Col>
                    <Col lg={6} md={12} className='mt-3'>
                        <article>
                            <div className='d-flex justify-content-center align-items-center'>
                                <hr className='w-25 me-2'></hr>
                                <h4>Location</h4>
                                <hr className='w-25 ms-2'></hr>
                            </div>
                            <p> {armament.location} </p>
                        </article>

                        <article>
                            <div className='d-flex justify-content-center align-items-center'>
                                <hr className='w-25 me-2'></hr>
                                <h4>Requires</h4>
                                <hr className='w-25 ms-2'></hr>
                            </div>
                            <Table bordered striped>
                                <tbody>
                                    {
                                        armament.requires !== undefined ?
                                            Object.keys(armament.requires).length !== 0 ?
                                                Object.entries(armament.requires).map((entry, i) => {
                                                    const [key, value] = entry
                                                    return (
                                                        <tr key={i}>
                                                            <td>{key}</td>
                                                            <td>{value}</td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                'This armament doesn\'t require any stat.'
                                            :
                                            null
                                    }
                                </tbody>
                            </Table>
                        </article>

                        <article>
                            <div className='d-flex justify-content-center align-items-center'>
                                <hr className='w-25 me-2'></hr>
                                <h4>Scales</h4>
                                <hr className='w-25 ms-2'></hr>
                            </div>
                            <Table bordered striped>
                                <tbody>
                                    {
                                        armament.scales !== undefined ?
                                            Object.keys(armament.requires).length !== 0 ?
                                                Object.entries(armament.scales).map((entry, i) => {
                                                    const [key, value] = entry
                                                    return (
                                                        <tr key={i}>
                                                            <td>{key}</td>
                                                            <td>{value}</td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                'This armament doesn\'t require any scale stat.'
                                            :
                                            null
                                    }
                                </tbody>
                            </Table>
                        </article>

                        <article>
                            <div className='d-flex justify-content-center align-items-center'>
                                <hr className='w-25 me-2'></hr>
                                <h4>Weight</h4>
                                <hr className='w-25 ms-2'></hr>
                            </div>
                            <p> {armament.weight} </p>
                        </article>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ArmamentInfo

// Imports
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Image, Row, Table, Modal } from 'react-bootstrap'
import userService from '../../services/crudApiService'

// Component that renders the profile information of the user
const Profile = () => {
    const [show, setShow] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()
    const { user } = location.state

    // Modal handlers
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Handler for deleting the account
    const handleDeleteAccount = async () => {
        await userService
            .deleteItem(`users/${user.id}`)
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-50 mx-auto"></hr>
                <h2>USER PROFILE</h2>
                <hr className="w-50 mx-auto"></hr>
            </div>
            <Container className='rounded-4 mb-5 py-5 px-5' fluid style={{ maxWidth: '800px', backgroundColor: '#3C5473', color: '#D9D2B0' }}>
                <Row>
                    <Col lg={6} className='text-center'>
                        <div>
                            <Image src={user.imgUser} alt='user_img' width={200} height={200} style={{ borderRadius: '100%' }} />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>User Name:</td>
                                        <td>{user.userName}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{user.email}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Button onClick={() => navigate('/profile/config', { state: { user: user } })}>Modify Profile</Button>
                            <Button variant='danger' className='mt-3' onClick={handleShow}>Delete Account</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete your account! Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Discard
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleDeleteAccount()
                        handleClose()
                    }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile

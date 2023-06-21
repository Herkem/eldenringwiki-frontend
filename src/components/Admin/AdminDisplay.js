// Imports
import { useEffect, useState } from 'react'
import { Button, Table, Modal, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import displayService from '../../services/crudApiService'
import userService from '../../services/crudApiService'

// Global variable that stores the id of the item
let G_ELEMENTID

// Component tha renders a table of items and the actions
const AdminDisplay = () => {
    const [filteredResults, setFilteredResults] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [display, setDisplay] = useState([])
    const [show, setShow] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()
    const { type } = location.state

    let page = ''
    if (type === 'ashes' || type === 'classes') {
        page = type.slice(0, -2)
    } else if (type === 'weapons' || type === 'shields') {
        page = 'armament'
    } else {
        page = type.slice(0, -1)
    }

    useEffect(() => getDisplay())

    // Getting the display items
    const getDisplay = () => {
        displayService
            .get(`${type}`)
            .then(res => setDisplay(res))
            .catch(err => console.log(err))
    }

    // Setting the filtered data if the search input has text or not
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = display.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(display)
        }
    }

    // Handler for making admin any user
    const handleMakeAdmin = async (idUser) => {
        await userService
            .put(`users/updateRole/${idUser}`)
            .then(res => getDisplay())
            .catch(err => console.log(err))
    }

    // Modal handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handler for delete the item
    const handleDelete = async () => {
        await displayService
            .deleteItem(`${type}/${G_ELEMENTID}`)
            .then(res => getDisplay())
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='my-5 text-center'>
                <hr className="w-75 mx-auto"></hr>
                <h2 className='text-center'>{type.toUpperCase()}</h2>
                <hr className="w-75 mx-auto"></hr>
            </div>

            <Container className='text-center'>
                <input
                    placeholder='Search...'
                    onChange={(e) => searchItems(e.target.value)}
                    className='w-75 p-3'
                    style={{ borderColor: '#071635', borderRadius: '12px' }}
                />
            </Container>

            <Container className='mt-3 w-75 mb-5'>
                {
                    type !== 'users' ?
                        <article>
                            {
                                page === 'armament' ?
                                    <Button onClick={() => navigate(`/${page}_form`, { state: { type: type } })}>
                                        ADD {type.slice(0, -1).toUpperCase()}
                                    </Button>
                                    :
                                    <Button onClick={() => navigate(`/${page}_form`)}>
                                        ADD {page.toUpperCase()}
                                    </Button>
                            }
                        </article>
                        :
                        ''
                }

                <article className='mt-3'>
                    <Table bordered hover striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchInput.length > 1 ? (
                                filteredResults.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td className='col-lg-6'>{element.name}</td>
                                            <td className='col-lg-6'>
                                                {
                                                    type === 'users' ?
                                                        element.role !== 'admin' ?
                                                            <Button variant="warning" className='me-3' onClick={() => handleMakeAdmin(element.id)}>MAKE ADMIN</Button>
                                                            :
                                                            ''
                                                        :
                                                        page !== 'armament' ?
                                                            <Button variant='info' className='me-3' onClick={() => navigate(`/${page}_form`, { state: { type: element } })}>
                                                                <img src='http://localhost:3000/icons/update.png' alt='update' width={25} height={25} />
                                                            </Button>
                                                            :
                                                            ''
                                                }
                                                <Button variant='danger' onClick={() => {
                                                    handleShow()
                                                    G_ELEMENTID = element.id
                                                }}>
                                                    <img src='http://localhost:3000/icons/trash.png' alt='trash' width={25} height={25} />
                                                </Button></td>
                                        </tr>
                                    )
                                })
                            ) : (
                                display.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td className='col-lg-6'>{element.name}</td>
                                            <td className='col-lg-6'>
                                                {
                                                    type === 'users' ?
                                                        element.role !== 'admin' ?
                                                            <Button variant="warning" className='me-3' onClick={() => handleMakeAdmin(element.id)}>MAKE ADMIN</Button>
                                                            :
                                                            ''
                                                        :
                                                        page !== 'armament' ?
                                                            <Button variant='info' className='me-3' onClick={() => navigate(`/${page}_form`, { state: { type: element } })}>
                                                                <img src='http://localhost:3000/icons/update.png' alt='update' width={25} height={25} />
                                                            </Button>
                                                            :
                                                            ''
                                                }
                                                <Button variant='danger' onClick={() => {
                                                    handleShow()
                                                    G_ELEMENTID = element.id
                                                }}>
                                                    <img src='http://localhost:3000/icons/trash.png' alt='trash' width={25} height={25} />
                                                </Button></td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </Table>
                </article>
            </Container >

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete this {page}! Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Discard
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleDelete()
                        handleClose()
                    }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminDisplay

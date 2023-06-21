//Imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import userService from '../services/crudApiService'

// Component that renders the links of the navbar
const NavLinks = () => {
  const [auth, setAuth] = useState({ valid: false })

  const navigate = useNavigate()

  useEffect(() => checkUser())

  // Checking if the user is logged in
  const checkUser = () => {
    userService
      .get('users/validateUser')
      .then(res => {
        if (res.valid) {
          setAuth({
            valid: true,
            user: {
              id: res.user.id,
              userName: res.user.userName,
              email: res.user.email,
              password: res.user.password,
              role: res.user.role,
              imgUser: res.user.imgUser
            }
          })
        } else {
          setAuth({ valid: false })
        }
      })
      .catch(err => console.log(err))
  }

  // Function that handles the lof out of the user
  const handleLogOut = async () => {
    await userService
      .get('users/logout')
      .then(res => {
        checkUser()
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <Nav
      className='mx-auto my-2 my-lg-0'
      style={{ maxHeight: '100px' }}>
      <LinkContainer to='/stats' className='link'>
        <Nav.Link>Stats</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/classes' className='link'>
        <Nav.Link>Classes</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/achievements' className='link'>
        <Nav.Link>Achievements</Nav.Link>
      </LinkContainer>

      <NavDropdown title='Equipment' id='equipmentDropdown'>
        <LinkContainer to='/weapons'>
          <NavDropdown.Item>Weapons</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/shields'>
          <NavDropdown.Item>Shields</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/spells'>
          <NavDropdown.Item>Spells</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/talismans'>
          <NavDropdown.Item>Talismans</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/ashes'>
          <NavDropdown.Item>Ashes</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
      {
        auth.valid ?
          auth.user.role === 'admin' ?
            <>
              <NavDropdown title='Administration' id='adminDropdown'>
                <LinkContainer to='/admin_display' state={{ type: 'users' }}>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'news' }}>
                  <NavDropdown.Item>News</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'classes' }}>
                  <NavDropdown.Item>Classes</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'achievements' }}>
                  <NavDropdown.Item>Achievements</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'weapons' }}>
                  <NavDropdown.Item>Weapons</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'shields' }}>
                  <NavDropdown.Item>Shields</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'spells' }}>
                  <NavDropdown.Item>Spells</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'talismans' }}>
                  <NavDropdown.Item>Talismans</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin_display' state={{ type: 'ashes' }}>
                  <NavDropdown.Item>Ashes</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </>
            :
            ''
          :
          ''
      }

      {
        auth.valid ?
          <div className='d-flex'>
            <NavDropdown title={auth.user.userName} id='userDropdown'>
              <LinkContainer to='/profile' state={{ user: auth.user }}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <div className='text-center'>
                <Button variant='danger' onClick={handleLogOut}>Log Out</Button>
              </div>
            </NavDropdown>
            <Image src={auth.user.imgUser} alt='User profile' width={40} height={40} style={{ borderRadius: '100%' }} />
          </div>
          :
          <>
            <Button variant='outline-secondary' className='mx-3 mb-3' onClick={() => navigate('/register')}>REGISTER</Button>
            <Button variant='outline-primary' className='mb-3' onClick={() => navigate('/login')}>LOGIN</Button>
          </>
      }
    </Nav>
  )
}

// Component that renders the navbar of the page that works like a header
const Header = () => {
  const [show, setShow] = useState(false);

  // Handlers for the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header style={{ backgroundColor: '#3C5473', height: '130px' }}>
      <h1 style={{ display: 'none' }}>Elden Ring Wiki</h1>
      <Navbar expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src='http://localhost:3000/images/eldenringLogo.png'
                width={100}
                height={100}
                className="d-inline-block"
                alt='eldenring-logo'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Button className="d-lg-none" onClick={handleShow}>
            <img src='http://localhost:3000/icons/menu.png' alt='menu' width={30} height={30} />
          </Button>
          <Navbar.Collapse>
            <NavLinks />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} className='w-50'>
        <Offcanvas.Header closeButton className='d-flex justify-content-end'>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar>
            <NavLinks />
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  )
}

export default Header

// Imports
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"


// Component that renders the footer of the page
const Footer = () => (
  <footer>
    <Container className="py-5 text-white" style={{ backgroundColor: '#071635' }} fluid>
      <Row className="py-4">
        <Col lg={3} md={6} className="mb-4 text-center">
          <img
            src='http://localhost:3000/images/eldenringLogo.png'
            alt="logo"
            width="180"
          />
        </Col>

        <Col lg={3} md={6} className="mb-4 text-center">
          <h6 style={{ fontWeight: 'bold' }} className="mb-4">COMPANY</h6>
          <ul className="list-unstyled">
            <li className="mb-2"><Link to='/login' className='link'>Login</Link></li>
            <li className="mb-2"><Link to='/register' className='link'>Register</Link></li>
          </ul>
        </Col>

        <Col lg={3} md={6} className="mb-4 text-center">
          <h6 style={{ fontWeight: 'bold' }} className="mb-4">WEBMAP</h6>
          <ul className="list-unstyled">
            <li className="mb-2"><Link to='/classes' className='link'>Classes</Link></li>
            <li className="mb-2"><Link to='/stats' className='link'>Stats</Link></li>
            <li className="mb-2"><Link to='/achievements' className='link'>Achievements</Link></li>
            <li className="mb-2"><Link to='/weapons' className='link'>Weapons</Link></li>
            <li className="mb-2"><Link to='/shields' className='link'>Shields</Link></li>
            <li className="mb-2"><Link to='/spells' className='link'>Spells</Link></li>
            <li className="mb-2"><Link to='/talismans' className='link'>Talismans</Link></li>
            <li className="mb-2"><Link to='/ashes' className='link'>Ashes</Link></li>
          </ul>
        </Col>

        <Col lg={3} md={6} className="mb-4 text-center">
          <h6 style={{ fontWeight: 'bold' }} className="mb-4">FOLLOW ME</h6>
          <a href="https://twitter.com" target="blank_"><img src="http://localhost:3000/icons/twitter.png" alt="twitter" width={50} height={50} className="me-2" /></a>
          <a href="https://es-es.facebook.com" target="blank_"><img src="http://localhost:3000/icons/facebook.png" alt="facebook" width={50} height={50} className="me-2" /></a>
          <a href="https://www.instagram.com" target="blank_"><img src="http://localhost:3000/icons/instagram.png" alt="instagram" width={50} height={50} className="me-2" /></a>
        </Col>
      </Row>
    </Container>

    {/* Copyright */}
    <div style={{ backgroundColor: '#A4B2BF' }}>
      <Container className="text-center">
        <p className="mb-0 py-2">
          © 2023 Sergio Lara All rights reserved.
        </p>
      </Container>
    </div>
  </footer>
)

export default Footer

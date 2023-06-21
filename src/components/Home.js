// Imports
import { useState, useEffect } from "react"
import { Col, Container, Image, Row, Carousel } from "react-bootstrap"
import newService from '../services/crudApiService'
import '../styles/index.css'

// COmponent that renders the home page of the site
const Home = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    // Getting all the news
    newService
      .get('news')
      .then(res => setNews(res.reverse()))
  }, [])

  return (
    <>
      <section className="text-center">
        <div className="subtitle-container">
          <div className="hover hover-1"></div>
          <div className="hover hover-2"></div>
          <div className="hover hover-3"></div>
          <div className="hover hover-4"></div>
          <div className="hover hover-5"></div>
          <div className="hover hover-6"></div>
          <div className="hover hover-7"></div>
          <div className="hover hover-8"></div>
          <div className="hover hover-9"></div>
          <div className="subtitle">
            <h2>ELDEN RING</h2>
            <p>THE WIKI</p>
          </div>
        </div>
      </section>

      <section className="text-center mt-5">
        <div>
          <hr className="w-75 mx-auto"></hr>
          <h2>ABOUT</h2>
          <hr className="w-75 mx-auto"></hr>
        </div>
        <Container fluid className="text-white pt-5 px-5 aboutContainer">
          <Row className="aboutRow">
            <Col lg={4} sm={6} xs={12} className="d-flex flex-column align-items-center mb-3">
              <Row>
                <Image src="http://localhost:3000/images/homeImage1.png" alt="homeImage1" />
              </Row>
              <Row className="aboutContent mt-3">
                <h2>WHAT IS ELDEN RING?</h2>
                <p>
                  Elden Ring is a 2022 action role-playing game developed by FromSoftware. It was
                  directed by Hidetaka Miyazaki with worldbuilding provided by fantasy writer George
                  R. R. Martin. Players control a customizable player character who is on a quest to
                  repair the Elden Ring and become the new Elden Lord.
                </p>
              </Row>
            </Col>

            <Col lg={4} sm={6} xs={12} className="d-flex flex-column align-items-center mb-3">
              <Row>
                <Image src="http://localhost:3000/images/homeImage2.png" alt="homeImage2" />
              </Row>
              <Row className="aboutContent mt-3">
                <h2>THE PURPOUSE OF THIS WIKI</h2>
                <p>
                  In this wiki you can find all the information you need to complete Elden Ring as easily as possible. Each section is carefully designed to provide the best experience for both experienced and novice players. Don't miss out on what the Classes and Stats sections have to offer when you need to determine your game mode.
                </p>
              </Row>
            </Col>

            <Col lg={4} sm={12} className="d-flex flex-column align-items-center mb-3">
              <Row>
                <Image src="http://localhost:3000/images/homeImage3.png" alt="homeImage2" />
              </Row>
              <Row className="aboutContent mt-3">
                <h2>DON'T MISS A THING</h2>
                <p>
                  Keep track of weaponry, talismans, ashes, in short everything you are able to get in the game you can mark it here as achieved so you know what you have left to discover and do not miss anything that the Elden Ring can offer you.
                </p>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="text-center my-5">
        <div>
          <hr className="w-75 mx-auto"></hr>
          <h2>NEWS</h2>
          <hr className="w-75 mx-auto"></hr>
        </div>
        <div className="mt-5">
          <Carousel fade className="px-4">
            {news.map((element, i) => {
              return (
                <Carousel.Item className="text-center" key={i}>
                  <img src={element.image} alt={element.image} className="d-block w-100" />
                  <Carousel.Caption>
                    <p style={{ fontSize: '50px' }}> {element.name} </p>
                    <p style={{ fontSize: '30px' }}> {element.date} </p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
      </section>
    </>
  )
}

export default Home

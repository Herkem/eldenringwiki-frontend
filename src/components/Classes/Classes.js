// Imports
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import classesService from '../../services/crudApiService'

// Importing components
import ClassCard from './ClassCard'

// Component that renders a list of classes
const Classes = () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    // Getting all the classes
    classesService
      .get('classes')
      .then(res => setClasses(res))
  }, [])

  return (
    <>
      <div className='my-5 text-center'>
        <hr className="w-75 mx-auto"></hr>
        <h2>CLASSES</h2>
        <hr className="w-75 mx-auto"></hr>
      </div>
      <Container className='d-flex flex-wrap justify-content-center' fluid>
        {classes.map((newClass) => <ClassCard key={newClass.id} newClass={newClass} />)}
      </Container>
    </>
  )
}

export default Classes

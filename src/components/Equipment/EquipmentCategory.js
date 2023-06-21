// Imports
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import equipmentService from '../../services/crudApiService'

// Componnet that renders all the categories
const EquipmentCategory = ({ type }) => {
  const [equipment, setEquipment] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    // Getting all categories
    equipmentService
      .get(`${type}/${type}_categories`)
      .then(res => setEquipment(res))

  }, [type])

  return (
    <>
      <div className='my-5'>
        <hr className="w-75 mx-auto"></hr>
        <h2 className='text-center'> {type.toUpperCase()} CATEGORIES </h2>
        <hr className="w-75 mx-auto"></hr>
      </div>

      <Container className='d-flex flex-wrap justify-content-center mb-5' fluid>
        {equipment.map((equipment, i) => {
          const categoryName = equipment.category.toUpperCase().replace(/_/g, ' ')
          return (
            <article key={i} className="categoryContainer" onClick={() => navigate(`/${type}/category`, { state: { category: equipment.category } })}>
              <div style={{ backgroundColor: '#071635' }}>
                <img src={`http://localhost:3000/images/categories/${categoryName.toLowerCase()}.png`} alt={categoryName} className='w-100' />
              </div>
              <h3 className='mt-1 ms-1'>{categoryName}</h3>
            </article>
          )
        })}
      </Container>
    </>
  )
}

export default EquipmentCategory

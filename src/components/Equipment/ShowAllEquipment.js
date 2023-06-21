// Imports
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import equipmentService from '../../services/crudApiService'

// Importing components
import EquipmentCard from './EquipmentCard'

// Component that shows all the items of a equipment
const ShowAllEquipment = ({ type }) => {
    const [equipment, setEquipment] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    // Checking the category
    const location = useLocation()
    let category = ''
    const equipmentWithCat = ['weapons', 'shields', 'spells']
    if (equipmentWithCat.includes(type)) {
        ({ category } = location.state)
    }

    useEffect(() => {
        // If category is empty set talismans and ashes if category has something set weapons, shields and spells
        if (category !== '') {
            equipmentService
                .get(`${type}/category=${category}`)
                .then(res => setEquipment(res))
        } else {
            equipmentService
                .get(`${type}`)
                .then(res => setEquipment(res))
        }
    }, [type, category])

    // Setting the filtered data if the search input has text or not
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = equipment.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(equipment)
        }
    }

    return (
        <>
            <div className='my-5'>
                <hr className="w-75 mx-auto"></hr>
                {
                    category === '' ?
                        <h2 className='text-center'>{type.toUpperCase().replace('_', ' ')}</h2>
                        :
                        <h2 className='text-center'>{category.toUpperCase().replace('_', ' ')}</h2>
                }
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

            <Container className='d-flex flex-wrap justify-content-center mt-3' fluid>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return <EquipmentCard key={item.id} type={type} equipment={item} />
                    })
                ) : (
                    equipment.map((item) => {
                        return <EquipmentCard key={item.id} type={type} equipment={item} />
                    })
                )}
            </Container>
        </>
    )
}

export default ShowAllEquipment

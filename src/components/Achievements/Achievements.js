// Imports
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import achievementService from '../../services/crudApiService'

// Importing components
import AchievementCard from './AchievementCard'

// Component that renders a list of achievements
const Achievements = () => {
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [achievements, setAchievements] = useState([])


  useEffect(() => {
    // Getting all achievements and setting them
    achievementService
      .get('achievements')
      .then(res => setAchievements(res))
  }, [])

  // Setting the filtered data if the search input has text or not
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = achievements.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(achievements)
    }
  }

  return (
    <>
      <div className='my-5'>
        <hr className="w-75 mx-auto"></hr>
        <h2 className='text-center'>ACHIEVEMENTS</h2>
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

      <Container className='d-flex flex-wrap justify-content-center' fluid>
        {searchInput.length > 1 ? (
          filteredResults.map((item, i) => {
            return <AchievementCard key={i} achievement={item} />
          })
        ) : (
          achievements.map((item, i) => {
            return <AchievementCard key={i} achievement={item} />
          })
        )}
      </Container>
    </>
  )
}

export default Achievements

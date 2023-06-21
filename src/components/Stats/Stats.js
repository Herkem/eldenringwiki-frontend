// Imports
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import statsService from '../../services/crudApiService'

// Importing components
import StatCard from './StatCard'

// Component that renders a list of stats
const Stats = () => {
  const [stats, setStats] = useState([])

  useEffect(() => {
    // Getting all the stats
    statsService
      .get('stats')
      .then(res => setStats(res))
  }, [])

  return (
    <>
      <div className='my-5 text-center'>
        <hr className="w-75 mx-auto"></hr>
        <h2>STATS</h2>
        <hr className="w-75 mx-auto"></hr>
      </div>
      <Container className='d-flex flex-wrap justify-content-center' fluid>
        {stats.map((stat) => <StatCard key={stat.id} stat={stat} />)}
      </Container>
    </>
  )
}

export default Stats

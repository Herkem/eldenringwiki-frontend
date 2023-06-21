// Imports
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import userService from '../../services/crudApiService'

// Component that renders a single card containing the information of the achievement
const AchievementCard = ({ achievement }) => {
    const [userAchievements, setUserAchievements] = useState(false)
    const [auth, setAuth] = useState({ valid: false })

    useEffect(() => {
        // Checking if the user is logged in
        userService
            .get('users/validateUser')
            .then(res => {
                if (res.valid) {
                    setAuth({
                        valid: true,
                        id: res.user.id
                    })

                    userService
                        .post(`users_achievements/${res.user.id}`, { idAchievement: achievement.id })
                        .then(res => setUserAchievements(res.exists))
                        .catch(err => console.log(err))
                } else {
                    setAuth({ valid: false })
                }
            })
            .catch(err => console.log(err))
    }, [achievement.id])

    // Adding or removing the achievement to the user if this checks the checkbox
    const handleHaveIt = async (e) => {
        if (e.target.checked) {
            await userService
                .post('users_achievements', { id: auth.id, idAchievement: e.target.id })
                .then(res => setUserAchievements(true))
                .catch(err => console.log(err))
        } else if (!e.target.checked) {
            await userService
                .deleteItem(`users_achievements/${auth.id}`, { idAchievement: e.target.id })
                .then(res => setUserAchievements(false))
                .catch(err => console.log(err))
        }
    }

    return (
        <article className='achievementContainer d-flex flex-column align-items-center text-center'>
            <img src={achievement.image} alt={achievement.name} />
            <h3 className='mt-3' style={{ color: '#D9D2B0' }}> {achievement.name} </h3>
            <p style={{ color: '#BCBE8C' }}> {achievement.obtaining} </p>
            {
                auth.valid ?
                    <>
                        <Form className='check'>
                            <Form.Check reverse id={achievement.id} label='Have it!' type='checkbox' onChange={handleHaveIt} checked={userAchievements} />
                        </Form>
                    </>
                    :
                    ''
            }
        </article >
    )
}

export default AchievementCard

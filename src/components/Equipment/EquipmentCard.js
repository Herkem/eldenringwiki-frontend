// Imports
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import userService from '../../services/crudApiService'

// Component that renders a single card containing the information of the equipment
const EquipmentCard = ({ type, equipment }) => {
    const [userEquipment, setUserEquipment] = useState(false)
    const [auth, setAuth] = useState({ valid: false })

    const navigate = useNavigate()

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
                        .post(`users_equipment/${res.user.id}`, { idEquipment: equipment.id })
                        .then(res => setUserEquipment(res.exists))
                        .catch(err => console.log(err))
                } else {
                    setAuth({ valid: false })
                }
            })
            .catch(err => console.log(err))
    }, [equipment.id])

    // Adding or removing the equipment to the user if this checks the checkbox
    const handleHaveIt = (e) => {
        if (e.target.checked) {
            userService
                .post('users_equipment', { id: auth.id, idEquipment: e.target.id })
                .then(res => setUserEquipment(true))
                .catch(err => console.log(err))
        } else if (!e.target.checked) {
            userService
                .deleteItem(`users_equipment/${auth.id}`, { idEquipment: e.target.id })
                .then(res => setUserEquipment(false))
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <article className='equipmentCard d-flex flex-column text-center'>
                <div onClick={() => navigate(`/${type}/info`, { state: { id: equipment.id } })}>
                    <div className='imgContainer'>
                        <img src={equipment.image} alt={equipment.name} />
                    </div>
                    <div>
                        <h3 style={{ color: '#D9D2B0' }}> {equipment.name} </h3>
                    </div>
                </div>

                {
                    auth.valid ?
                        <>
                            <Form className='check'>
                                <Form.Check reverse id={equipment.id} label='Have it!' type='checkbox' onChange={handleHaveIt} checked={userEquipment} />
                            </Form>
                        </>
                        :
                        ''
                }
            </article >
        </>
    )
}

export default EquipmentCard

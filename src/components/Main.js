//Imports
import { Routes, Route } from 'react-router-dom'

//Importing components
import Classes from './Classes/Classes'
import Stats from './Stats/Stats'
import Achievements from './Achievements/Achievements'
import EquipmentCategory from './Equipment/EquipmentCategory'
import ShowAllEquipment from './Equipment/ShowAllEquipment'
import ArmamentInfo from './Equipment/ArmamentInfo'
import SpellInfo from './Equipment/SpellInfo'
import TalismanInfo from './Equipment/TalismanInfo'
import AshInfo from './Equipment/AshInfo'
import Register from './User/RegisterForm'
import Login from './User/LoginForm'
import Profile from './User/Profile'
import Configuration from './User/Configuration'
import AdminDisplay from './Admin/AdminDisplay'
import AchievementForm from './Admin/AchievementForm'
import TalismanForm from './Admin/TalismanForm'
import AshForm from './Admin/AshForm'
import ClassForm from './Admin/ClassForm'
import SpellForm from './Admin/SpellForm'
import NewForm from './Admin/NewForm'
import ArmamentForm from './Admin/ArmamentForm'

// Component that manage the information display on the main label
const Main = () => {
  return (
    <>
      <section>
        <Routes>
          <Route path='/classes' element={<Classes />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/achievements' element={<Achievements />} />

          <Route path='/weapons' element={<EquipmentCategory type='weapons' />} />
          <Route path='/shields' element={<EquipmentCategory type='shields' />} />
          <Route path='/spells' element={<EquipmentCategory type='spells' />} />

          <Route path='/weapons/category' element={<ShowAllEquipment type='weapons' />} />
          <Route path='/shields/category' element={<ShowAllEquipment type='shields' />} />
          <Route path='/spells/category' element={<ShowAllEquipment type='spells' />} />
          <Route path='/talismans' element={<ShowAllEquipment type='talismans' />} />
          <Route path='/ashes' element={<ShowAllEquipment type='ashes' />} />

          <Route path='/weapons/info' element={<ArmamentInfo type='weapons' />} />
          <Route path='/shields/info' element={<ArmamentInfo type='shields' />} />
          <Route path='/spells/info' element={<SpellInfo />} />
          <Route path='/talismans/info' element={<TalismanInfo />} />
          <Route path='/ashes/info' element={<AshInfo />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/config' element={<Configuration />} />

          <Route path='/admin_display' element={<AdminDisplay />} />
          <Route path='/achievement_form' element={<AchievementForm />} />
          <Route path='/talisman_form' element={<TalismanForm />} />
          <Route path='/ash_form' element={<AshForm />} />
          <Route path='/class_form' element={<ClassForm />} />
          <Route path='/spell_form' element={<SpellForm />} />
          <Route path='/new_form' element={<NewForm />} />
          <Route path='/armament_form' element={<ArmamentForm />} />
        </Routes>
      </section>
    </>
  )
}

export default Main

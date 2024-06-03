import { InfoPopup } from './InfoPopup'
import { Sidebar } from './Sidebar'
import './SettingPage.css'
import { SettingForm } from './SettingForm'
import { useParams } from 'react-router-dom'

function SettingPage() {
  const { id } = useParams()

  return (
    <>
      <div className='settingSidebar sectionBorder'>
        <Sidebar isSettings={true}></Sidebar>
      </div>
      <div className='settingView'>
        <SettingForm/>
      </div>
      <div className='settingSideView'>
        <InfoPopup/>
      </div>
    </>
  )
}

export default SettingPage

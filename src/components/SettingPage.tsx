import { InfoPopup } from './InfoPopup'
import { Sidebar } from './Sidebar'
import './SettingPage.css'
import { SettingForm } from './SettingForm'
import { useParams } from 'react-router-dom'

function SettingPage() {
  const { id } = useParams()
  const num_id = isNaN(Number(id)) ? 0 : Number(id);

  return (
    <>
      <div className='settingSidebar sectionBorder'>
        <Sidebar isSettings={true}></Sidebar>
      </div>
      <div className='settingView'>
        <SettingForm id={num_id}/>
      </div>
      <div className='settingSideView'>
        <InfoPopup/>
      </div>
    </>
  )
}

export default SettingPage

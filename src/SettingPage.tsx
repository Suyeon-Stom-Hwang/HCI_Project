import { InfoPopup } from './InfoPopup'
import { Sidebar } from './Sidebar'
import './SettingPage.css'
import { SettingForm } from './SettingForm'

function SettingPage() {
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

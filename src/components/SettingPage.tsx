import "./css/shadcn.css"
import './css/SettingPage.css'
import '../index.css'

import Sidebar from './Sidebar'
import { SettingForm } from './SettingForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useParams } from 'react-router-dom'


export function InfoPopup() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Lexile measures 란?</AccordionTrigger>
        <AccordionContent>
          널리 사용되고 있는 이독성지수 중 하나로 읽기 능력과 읽기 난이도를 나타내는 지수로 나눠져 있습니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function SettingPage() {
  const { id } = useParams()
  const num_id = isNaN(Number(id)) ? 0 : Number(id);

  return (
    <>
      <div className='sidebarView sectionBorder'>
        <Sidebar isSettings={true}></Sidebar>
      </div>
      <div className='settingView sectionBorder'>
        <SettingForm id={num_id} />
      </div>
      <div className='settingSideView sectionBorder'>
        <InfoPopup/>
      </div>
    </>
  )
}

export default SettingPage

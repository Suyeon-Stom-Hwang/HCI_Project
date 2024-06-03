import { InfoPopup } from './InfoPopup'
import { Sidebar } from './Sidebar'
import { Button } from "@/components/ui/button"

import './shadcn.css'
import './MainPage.css'
import './index.css'

interface ParagraphBoxProps {
  text: string
}

interface KeywordBlockProps {
  tag: string
}

function KeywordBlock({tag}: KeywordBlockProps) {
  return (
    <div className='keywordBlock'>
      <span>{tag}</span>
      <div></div>
    </div>
  )
}

function CurrentSettingBlock() {
  return (
    <div className='currentSettingBlock'>
      <div className='currentSettingIcon'></div>
      <div className='textSubTitle currentSettingSubTitle'>
        <div>필수 키워드</div>
        <div>유형/형식</div>
      </div>
      <div className='currentSettingTagBlock'>
        <KeywordBlock tag={'인공지능'}></KeywordBlock>
      </div>
      <Button className='currentSettingEditButton' variant="secondary">편집설정</Button>
    </div>
  )
}

function ParagraphBox({text}: ParagraphBoxProps) {
  return (<div className='paragraphBox'>{text}</div>)
}

function MainPage() {
  return (
    <>
      <div className='mainSidebar'>
        <Sidebar isSettings={false}></Sidebar>
      </div>
      <div className='mainView sectionBorder'>
        <div className='sectionBorder'><CurrentSettingBlock/></div>
        <div>
          <ParagraphBox text={'hello this is a paragraph box'}/>
        </div>
        <div>
          <Button variant={'default'}>새로운 글</Button>
        </div>
      </div>
      <div className='mainSideView sectionBorder'>
      </div>
    </>
  )
}

export default MainPage

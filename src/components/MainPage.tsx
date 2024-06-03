// import { InfoPopup } from './InfoPopup'
import Sidebar from './Sidebar'
import { Button } from "@/components/ui/button"

import './css/shadcn.css'
import './css/MainPage.css'
import '../index.css'
import { useContexts } from '@/Contexts'
import TranslateSetting from './api/TranslateSettings'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate();
  const { currentSetting } = useContexts();

  return (
    <div className='currentSettingBlock'>
      <div className='currentSettingIcon'></div>
      <div className='textSubTitle currentSettingSubTitle'>
        <div>필수 키워드</div>
        <div>유형/형식</div>
      </div>
      <div className='currentSettingTagBlock'>
        {
          currentSetting()?.keywords.map((keyword) => (
            <KeywordBlock tag={keyword} key={"keywordblock-"+keyword}/>
          ))
        }
      </div>
      <Button className='currentSettingEditButton' variant="secondary" onClick={() => navigate("/settings/"+currentSetting()?.id.toString())}>편집설정</Button>
    </div>
  )
}

function ParagraphBox({text}: ParagraphBoxProps) {
  return (<div className='paragraphBox'>{text}</div>)
}

function MainPage() {
  const { currentSetting, addHistoryByText } = useContexts();
  const [ text, setText ] = useState("");

  const handleClick = async () => {
    await addHistoryByText(text);
    const newText = await TranslateSetting(currentSetting());
    setText(newText);
  }

  return (
    <>
      <div className='mainSidebar'>
        <Sidebar isSettings={false}></Sidebar>
      </div>
      <div className='mainView sectionBorder'>
        <div className='sectionBorder'><CurrentSettingBlock/></div>
        <div>
          <ParagraphBox text={text}/>
        </div>
        <div>
          <Button variant={'default'} onClick={handleClick}>새로운 글</Button>
        </div>
      </div>
      <div className='mainSideView sectionBorder'>
      </div>
    </>
  )
}

export default MainPage

import './css/shadcn.css'
import './css/MainPage.css'
import '../index.css'

import deleteKeyword from '../assets/deleteKeyword.svg'
import exitIcon from '../assets/exitIcon.svg'

import Sidebar from './Sidebar'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ReactNode, useState } from 'react'
import { useContexts } from '@/Contexts'
import TranslateSetting from './api/TranslateSettings'
import { useNavigate } from 'react-router-dom'
import { LucideTable2 } from 'lucide-react'

interface DictionaryPopupProps {
  word: string;
  description: string;
}

interface ParagraphBoxProps {
  children: ReactNode
}

interface KeywordBlockProps {
  children: ReactNode
}

function KeywordBlock({children}: KeywordBlockProps) {
  return (
    <div className='keywordBlock'>
      <span>{children}</span>
      <img src={deleteKeyword}></img>
    </div>
  )
}

function FormatBlock({children}: KeywordBlockProps) {
  return (
    <div id='formatBlock' className='textSubTitle'>
      {children}
    </div>
  )
}

export function DictionaryPopup({word, description}: DictionaryPopupProps) {
    return (
      <div id="dictionaryPopup">
        <div className='rightAlign'>
          <img src={exitIcon}/>
        </div>
        <div className="textTitle">{word}</div>
        <div className="textRegular">{description}</div>
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
        <div className='currentKeywords'>
        {
          currentSetting()?.keywords.map((keyword) => (
            <KeywordBlock key={"keywordblock-"+keyword}>{keyword}</KeywordBlock>
          ))
        }
        </div>
        <div className='currentKeywords'>
          {
            <FormatBlock>{currentSetting()?.format}</FormatBlock>
          }
        </div>
      </div>
      <Button className='currentSettingEditButton' variant="secondary" onClick={() => navigate("/settings/"+currentSetting()?.id.toString())}>편집설정</Button>
    </div>
  )
}

function ParagraphBox({children}: ParagraphBoxProps) {
  return (<div className='paragraphBox'>{children}</div>)
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
      <div className='sidebarView sectionBorder'>
        <Sidebar isSettings={false}/>
      </div>

      <div className='mainView sectionBorder'>
        <div className='sectionBorderOnlyBottom'>
          <CurrentSettingBlock/>
        </div>
        <div>
          <ParagraphBox>{text}</ParagraphBox>
        </div>
      </div>

      <div className='mainSideView sectionBorder'>
        <DictionaryPopup word='Artificial' description='1. 이건 하나의 예시'/>

        <div id="evaluationCointainer" className='space-y-5'>
          <div className='space-y-3'>
            <RadioGroup defaultValue="comfortable" >
              <div className='textSubTitle'>글은 만족스러운가요?</div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="up" id="r1" />
                <Label className='textTitle' htmlFor="r1">👍</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="down" id="r2" />
                <Label className='textTitle' htmlFor="r2">👎</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className='space-y-3'>
            <RadioGroup defaultValue="comfortable" >
              <div className='textSubTitle'>글의 내용이 이해되나요?</div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="up" id="r1" />
                <Label className='textTitle' htmlFor="r1">⭕</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="down" id="r2" />
                <Label className='textTitle' htmlFor="r2">❌</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Button variant={'default'} onClick={handleClick}>새로운 글</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage

import { Component, ReactNode, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import newSetting from "./assets/newSetting.svg"

import './Sidebar.css'

type SettingBlockClickHandler = () => void;

interface SettingBlockProps {
  image: string;
  isSelected: boolean;
  onClick: SettingBlockClickHandler;
  children: ReactNode;
}

interface SidebarProps {
  openMainPage: SettingBlockClickHandler;
  openSettingPage: SettingBlockClickHandler;
  isHistoryShown: boolean;
}

interface HistoryBlockProps {
  index: number;
  text: string;
  isPositive: boolean;
}

function HistoryBlock({index, text, isPositive=true}: HistoryBlockProps) {
  let className = 'historyBlock';
  if (isPositive) {
    className += ' historyBlockPositive'; 
  } else {
    className += ' historyBlockNegative'; 
  }

  return (
    <div className={className}>
      {text}
    </div>
  )
}

function SettingBlock({image, isSelected, onClick, children}: SettingBlockProps) {
  let className = 'settingBlock ';
  if (isSelected) {
    className += 'settingBlockSelected';
  }

  return (
    <div className={className} onClick={onClick}>
      <div className='settingBlockIcon'>
        <img src={image}/>
      </div>
      <div className='settingBlockText textTitle'>
        {children}
      </div>
    </div>
  )
}

export function Sidebar({openMainPage, openSettingPage, isHistoryShown}: SidebarProps) {
    const [settings, setSettings] = useState([{index:0, name:'신규 설정', selected:false}, {index:1, name:'Settings 1', selected:true}, {index:1, name:'Settings 2', selected:false}])

    function handleNewSettingBlockClick() {
      settings.forEach(setting => {
        setting.selected = false;
      })
      settings[0].selected = true;
      console.log(settings)
      setSettings(settings);
      openSettingPage()
    }

    let historyBlock = (<div></div>)
    let blockHeight = '800px'

    if (isHistoryShown == false) {
      historyBlock = (
        <div>
          <div className='sideBarTitle textViewTitle'>History</div>
          <ScrollArea className="h-[320px] w-[400px] p-[20px]">
            <div>
              <HistoryBlock text={'hello'} isPositive={true}/>
              <HistoryBlock text={'hello2'}/>
              <HistoryBlock text={'hello3'} isPositive={false}/>
            </div>
          </ScrollArea>
        </div>
      )
      blockHeight = '600px'
    }

    const newSettingBlock = (
      <SettingBlock onClick={handleNewSettingBlockClick} image={newSetting} isSelected={settings[0].selected}>신규 설정</SettingBlock>
    )

    const settingBlocks = settings.slice(1).map(
      setting => <SettingBlock isSelected={setting.selected}>{setting.name}</SettingBlock>
    );
  
    return (
      <>
        <div className='sectionBorderOnlyBottom'>
          <div className='sideBarTitle textViewTitle'>Setting</div>
          <ScrollArea className={"h-[" + blockHeight + "] w-[400px]"}>
            {settingBlocks}
            {newSettingBlock}
          </ScrollArea>
        </div>
        {historyBlock}
      </>
    )
  }
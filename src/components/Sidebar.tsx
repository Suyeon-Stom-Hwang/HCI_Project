import { Component, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

import './Sidebar.css'
import './HistoryBlock.css'

interface SettingBlockProps {
  image: string;
  name: string;
}

interface SidebarProps {
  isSettings: boolean;
}

interface HistoryBlockProps {
  index: number;
  text: string;
}

function HistoryBlock({index, text}: HistoryBlockProps) {
  return (
    <div className='historyBlock'>
      {text}
    </div>
  )
}

function SettingBlock({image, name}: SettingBlockProps) {
  return (
    <div className='settingBlock'>
      <div className='settingBlockIcon'/>
      <div className='settingBlockText textTitle'>{name}</div>
    </div>
  )
}

export function Sidebar({isSettings}: SidebarProps) {
    const [count, setCount] = useState(0)

    let historyBlock = (<div></div>)
    let blockHeight = '800px'

    if (isSettings == false) {
      historyBlock = (
        <div className='sectionBorder'>
          <div className='sideBarTitle'>History</div>
          <ScrollArea className="h-[320px] w-[400px] p-4">
            <div>
              <HistoryBlock text={'hello'}/>
              <HistoryBlock text={'hello2'}/>
              <HistoryBlock text={'hello3'}/>
            </div>
          </ScrollArea>
        </div>
      )
      blockHeight = '400px'
    }
  
    return (
      <>
        <div>
          <div className='sideBarTitle'>Setting</div>
          <ScrollArea className={"h-[" + blockHeight + "] w-[400px]"}>
            <SettingBlock name={'Setting1'}/>
            <SettingBlock name={'Setting2'}/>
          </ScrollArea>
        </div>
        {historyBlock}
      </>
    )
  }
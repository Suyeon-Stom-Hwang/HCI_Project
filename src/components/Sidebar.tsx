import { ScrollArea } from "@/components/ui/scroll-area"

import './Sidebar.css'
import './HistoryBlock.css'
import { useSettingContext } from "@/Contexts";
import { Link } from "react-router-dom";

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
    let historyBlock = (<div></div>)
    let blockHeight = '800px'
    const { settings } = useSettingContext();

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
            {
              settings.map((setting) => (
                <Link to={"/settings/"+setting.id.toString()}>
                  <SettingBlock name={setting.name} image=""/>
                </Link>
              ))
            }
            <Link to={"/settings/0"}>
              <SettingBlock name={"Add new setting"} image=""/>
            </Link>
          </ScrollArea>
        </div>
        {historyBlock}
      </>
    )
  }
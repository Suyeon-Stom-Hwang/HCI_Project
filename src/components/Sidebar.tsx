import { ScrollArea } from "@/components/ui/scroll-area"

import './css/Sidebar.css'
import './css/HistoryBlock.css'
import { useContexts } from "@/Contexts";
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
    <div className='historyBlock' id={index.toString()}>
      {text}
    </div>
  )
}

function SettingBlock({image, name}: SettingBlockProps) {
  return (
    <div className='settingBlock'>
      <div className='settingBlockIcon'><img src={image}/></div>
      <div className='settingBlockText textTitle'>{name}</div>
    </div>
  )
}

export function Sidebar({isSettings}: SidebarProps) {
    let historyBlock = (<div></div>)
    let blockHeight = '800px'
    const { settings, histories } = useContexts();

    if (isSettings == false) {
      historyBlock = (
        <div className='sectionBorder'>
          <div className='sideBarTitle'>History</div>
          <ScrollArea className="h-[320px] w-[400px] p-4">
            <div>
              {
                histories.map((history) => (
                  <HistoryBlock text={history.summary} index={history.id}/>
                ))
              }
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
                <Link to={"/settings/"+setting.id.toString()} key={"link-" + setting.name}>
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
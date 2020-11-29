import React from  'react'
import {Avatar, RichCell, Panel, PanelHeader, Group} from "@vkontakte/vkui";
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch} from "react-redux";

const SelPeo = ({req}) => {
  const dispatch = useDispatch()

  return(
    <>
    <Panel>
    <PanelHeader separator={false}
      text="Настроки"
      level="2" weight="semibold"
      left={<Icon28ArrowLeftOutline />}
      onClick = {() => dispatch(uiActions.push_route('selection/steam'))}>
        Подбор
    </PanelHeader>
    <Group separator="hide">
      <RichCell
        caption="Откликнулся на анкету"
       before={<Avatar size={48} src={('/ex/avatar.jpg')}/>}
       onClick = {() => dispatch(uiActions.push_route('people'))}>

       Михаил Лихачев
     </RichCell>
     <RichCell
       before={<Avatar size={48} src={('/ex/avatar.jpg')}/>}
       caption="Откликнулась на анкету"
       onClick = {() => dispatch(uiActions.push_route('people'))}>

       Тимофей Чаптыков
     </RichCell>
     <RichCell
       before={<Avatar size={48} src={('/ex/avatar.jpg')}/>}
       caption="Хочет поиграть в CS GO"
       onClick = {() => dispatch(uiActions.push_route('people'))}>

       Тимофей Чаптыков
     </RichCell>
    </Group>
    </Panel>
    </>
  )
}
 export default SelPeo;

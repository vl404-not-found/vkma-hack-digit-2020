import React from 'react'
import {
    Div,
    ModalCard,
    ModalPage,
    ModalRoot,
    Button,
    Panel,
    PanelHeader,
    Group,
    Search,
    FixedLayout,
    View,
    List,
    SimpleCell,
    Avatar,
    FormLayout,
    Select
} from '@vkontakte/vkui'
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch} from "react-redux";


const PageGame = ({id}) =>{
  const dispatch = useDispatch();

  return(
    <Panel>
    <PanelHeader>
      <SimpleCell
          before={<Icon28ArrowLeftOutline />}
          onClick = {() => dispatch(uiActions.push_route('games'))}
          text="Настроки"
          level="2" weight="semibold"
        >
        Игры
      </SimpleCell>
    </PanelHeader>
    <Group>
    <List>
        <SimpleCell
            before={<Avatar src={('/ex/avatar.jpg')} size={48}/>}
            text="Игра"
        >
            Название игры
        </SimpleCell>
    </List>
    </Group>
    </Panel>
  )
}
export default PageGame;

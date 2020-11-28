import React from 'react'
import {


    Button,
    Panel,
    PanelHeader,
    Group,
    FixedLayout,

    List,
    SimpleCell,
    Avatar,
    Cell,
    Header
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
            description="Steam"

        >
            Название игры
        </SimpleCell>
    </List>
    </Group>
        <Group header={<Header mode="secondary">Статистика</Header>}>
             <List>
               <Cell expandable indicator="4 часа">Всего в игре</Cell>
               <Cell expandable indicator="2 часа">В игре за 2 недели</Cell>
               <Cell expandable indicator="2.34">У/С</Cell>
               <Cell expandable indicator="22.1%">Точность</Cell>
               <Cell expandable indicator="22.36%">В голову</Cell>
               <Cell expandable indicator="21%">УMVP за матчС</Cell>
               <Cell expandable indicator="10%">Удачных пистолетных раудовС</Cell>
             </List>
        </Group>
        <FixedLayout vertical="bottom">
            <Button
                stretched
                size="xl"
                style={{width: '95%', margin: '0 auto'}}
            >Умный поиск</Button>
            <Button
                stretched
                mode="secondary"
                size="xl"
                style={{width: '95%', margin: '0 auto', marginTop:'8px'}}
                onClick = {() => dispatch(uiActions.push_route('add_req'))}
            >Создать заявку</Button>
        </FixedLayout>
    </Panel>
  )
}
export default PageGame;

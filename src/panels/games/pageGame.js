import React, {useEffect} from 'react'
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
import {useDispatch, useSelector} from "react-redux";
import {getStatCsGo} from '../../store/games/actions'
import * as gameActions from "../../store/games/actions";



const PageGame = ({id}) =>{
  const dispatch = useDispatch();
  const stats = useSelector(s => s.games.stat)
  useEffect(()=>{dispatch(gameActions.getStatCsGo.saga())},[dispatch])
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
               <Cell indicator={stats.playtime_forever + 'ч'}>В игре за все время</Cell>
               <Cell  indicator={stats.kdr}>У/С</Cell>
               <Cell  indicator={stats.accuracy*100 + '%'}>Точность</Cell>
               <Cell  indicator={stats.headshot*100 + '%'}>В голову</Cell>
               <Cell  indicator={stats.count_mvp_for_match}>MVP за матч</Cell>
               <Cell  indicator={stats.wins_pistolround*100 + '%'}>Удачных пистолетных раундов</Cell>

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

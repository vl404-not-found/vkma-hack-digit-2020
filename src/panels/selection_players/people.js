import React, {useEffect} from 'react'
import {FormLayout, Div, Button, Header, RichCell, List, Cell, Avatar, Group, CardGrid, Card, FixedLayout, View, Panel, PanelHeader, Search} from '@vkontakte/vkui'
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from "../../store/dynamicui/actions";
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";
import {getStatCsGo} from '../../store/games/actions'
import * as gameActions from "../../store/games/actions";


const People = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)
  const stats = useSelector(s => s.games.stat)
  useEffect(()=>{dispatch(gameActions.getStatCsGo.saga())},[dispatch])
  console.log(stats)


  return(
    <Panel id={id} >
        <PanelHeader separator={false}
          text="Настроки"
          level="2" weight="semibold"
          left={<Icon28ArrowLeftOutline />}
          onClick = {() => dispatch(uiActions.push_route('selpeople'))}>
            Подбор
        </PanelHeader>
        <Group>
        <CardGrid>
          <Card size="l" mode="shadow">
            <List style={{ paddingTop:"19px", paddingBottom:"19px", paddingLeft:"13px"}}>
                <Cell
                    before={<Avatar  size={48}/>}
                    text="Игра"
                     >
                  Counter-Strike Global Offensive
                </Cell>
            </List>
          </Card>
        </CardGrid>
      </Group>
      <Group separator="hide">
          <CardGrid>
            <Card size="l" mode="outline">
              <RichCell
              style={{marginTop:"20px"}}
                caption="Возраст: 21; Микрофон: есть"
               before={<Avatar size={72} src={('/ex/avatar.jpg')}/>}>
               Михаил Лихачев
               </RichCell>
            </Card>
          </CardGrid>
      </Group>
      <Group header={<Header mode="secondary">Статистика</Header>}>

            <Cell indicator={stats.playtime_forever + 'ч'}>В игре за все время</Cell>
            <Cell  indicator={stats.kdr}>У/С</Cell>
            <Cell  indicator={stats.accuracy*100 + '%'}>Точность</Cell>
            <Cell  indicator={stats.headshot*100 + '%'}>В голову</Cell>
            <Cell  indicator={stats.count_mvp_for_match}>УMVP за матч</Cell>
            <Cell  indicator={stats.wins_pistolround*100 + '%'}>Удачных пистолетных раудов</Cell>




      </Group>
      <FormLayout vertical="bottom">
        <Div style={{display: 'flex'}}>
         <Button size="l" stretched mode="destructive" style={{ marginRight: 8 }}>Отклонить</Button>
         <Button size="l" stretched >Добавить</Button>
       </Div>
       </FormLayout>
      </Panel>
  )
}
export default People;

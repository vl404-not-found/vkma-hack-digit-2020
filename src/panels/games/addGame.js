import React, {setState} from 'react';
import {Div, ModalCard, ModalPage, ModalRoot, Button, Panel, PanelHeader, Group, Search, FixedLayout, View, ActionSheet, ActionSheetItem} from '@vkontakte/vkui'
import {TabsItem, Tabs, CellButton, List, SimpleCell, Avatar, FormLayout, Select} from '@vkontakte/vkui'
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch, useSelector} from "react-redux";
import Steam from './steamkill.js'

const GameAdd = ({id}) => {
  const dispatch = useDispatch();
  const ui = useSelector(s => s.dynamic_ui)
  const linker = useSelector(s => s.dynamic_ui.history[ui.history.length - 1].split("/")[1])
  const req = useSelector(s => s.requests)

    return (
      <Panel id={id} >
      <PanelHeader separator={false}>
        <SimpleCell
            before={<Icon28ArrowLeftOutline />}
            onClick = {() => dispatch(uiActions.push_route('games'))}
            text="Настроки"
            level="2" weight="semibold"
          >
          Игры
        </SimpleCell>
      </PanelHeader>
        <Search icon={
               <div style={{display: "flex", marginRight: "80%"}}>
               </div>
         }/>
         <FixedLayout vertical="top">
           <Tabs mode="buttons">
                <TabsItem
                onClick={() => dispatch(uiActions.push_route('addGame/steam'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'steam'}>
                  Steam
                </TabsItem>
                <TabsItem
                onClick={() => dispatch(uiActions.push_route('addGame/playstation'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'playstation'}>
                  PlayStation
                </TabsItem>
                <TabsItem
                onClick={() => dispatch(uiActions.push_route('addGame/xbox'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'xbox'}>
                  Xbox
                </TabsItem>
                <TabsItem
                onClick={() => dispatch(uiActions.push_route('addGame/telephon'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'telephon'}>
                  Телефон
                </TabsItem>
            </Tabs>
          </FixedLayout>
          <View style={{marginTop: '90px'}} activePanel={ui.history[ui.history.length - 1].split("/")[1]}>
              <Panel id={"steam"}>
                  {Array.isArray(req.main) ? req.main.map(s => (
                      <Steam req={s}/>
                  )) : ''}
              </Panel>
              <Panel id={"playstation"}>
                  {Array.isArray(req.main) ? req.main.map(s => (
                      <Steam req={s}/>
                  )) : ''}
              </Panel>
              <Panel id={"xbox"}>
                  {Array.isArray(req.main) ? req.main.map(s => (
                      <Steam req={s}/>
                  )) : ''}
              </Panel>
              <Panel id={"telephon"}>
                  {Array.isArray(req.main) ? req.main.map(s => (
                      <Steam req={s}/>
                  )) : ''}
              </Panel>
          </View>
         <FixedLayout vertical="bottom">
            <Button stretched size="xl" style={{width:'95%', margin:'0 auto'}}>Добавить игру</Button>
          </FixedLayout>

      </Panel>
    )
  }
export default GameAdd;

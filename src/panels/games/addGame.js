import React, {useEffect} from 'react';
import {Panel, PanelHeader, Search, FixedLayout, View} from '@vkontakte/vkui'
import {TabsItem, Tabs, SimpleCell} from '@vkontakte/vkui'
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch, useSelector} from "react-redux";
import Steam from './steamkill.js'
import LinkAccount from './linkAccount'
import * as gameActions from "../../store/games/actions";


const GameAdd = ({id}) => {
  const dispatch = useDispatch();
  const ui = useSelector(s => s.dynamic_ui)
  // const linker = useSelector(s => s.dynamic_ui.history[ui.history.length - 1].split("/")[1])
  const games = useSelector(s => s.games)

  useEffect(()=>{dispatch(gameActions.getSteamGame.saga())},[dispatch])

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
                onClick={() => dispatch(uiActions.push_route('addGame/mobile'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'mobile'}>
                  Телефон
                </TabsItem>
            </Tabs>
          </FixedLayout>
          <View activePanel={ui.history[ui.history.length - 1].split("/")[1]}>
              <Panel id={"steam"}>
                  {Array.isArray(games.steam) ? games.steam.map(s => (
                      <Steam req={s} />
                  )) : <LinkAccount />}
              </Panel>
              <Panel id={"playstation"}>
                  {Array.isArray(games.ps) ? games.ps.map(s => (
                      <Steam req={s}/>
                  )) : <LinkAccount />}
              </Panel>
              <Panel id={"xbox"}>
                  {Array.isArray(games.xbox) ? games.xbox.map(s => (
                      <Steam req={s}/>
                  )) : <LinkAccount />}
              </Panel>
              <Panel id={"mobile"}>
                  {Array.isArray(games.mobile) ? games.mobile.map(s => (
                      <Steam req={s}/>
                  )) : <LinkAccount /> }
              </Panel>
          </View>

      </Panel>
    )
  }
export default GameAdd;

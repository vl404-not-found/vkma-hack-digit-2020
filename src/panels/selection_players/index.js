import React, {useEffect} from 'react';
import {FixedLayout, View, Panel, PanelHeader, Search} from '@vkontakte/vkui'
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline'
import Icon24Filter from "@vkontakte/icons/dist/24/filter";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from "../../store/dynamicui/actions";
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";
import * as gameActions from "../../store/games/actions";
import Steam from './steamac.js'



const SelectMarketPlace = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)
    const games = useSelector(s => s.games)
    useEffect(()=>{dispatch(gameActions.getSteamGame.saga())},[dispatch])

    // const [activeTab4] = useState()

    return (
        <Panel id={id}>
            <PanelHeader
              left={<Icon24NotificationOutline
                 style={{ color: '#3F8AE0' }}
                 onClick = {() => dispatch(uiActions.push_route('selpeople'))}
            />} >
                Подбор
            </PanelHeader>

            <Search icon={
                <Icon24Filter/>
            }/>
            <FixedLayout vertical="top">

            <Tabs mode="buttons">
            <TabsItem
                onClick={() => dispatch(uiActions.push_route('selection/steam'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'steam'}> Steam
            </TabsItem>

            <TabsItem
                onClick={() => dispatch(uiActions.push_route('selection/Playstation'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'Playstation'}> Playstation
            </TabsItem>

            <TabsItem
                onClick={() => dispatch(uiActions.push_route('selection/Xbox'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'Xbox'}> Xbox
            </TabsItem>

            <TabsItem
                onClick={() => dispatch(uiActions.push_route('selection/Телефон'))}
                selected={ui.history[ui.history.length - 1].split("/")[1] === 'Телефон'}> Телефон
            </TabsItem>

            </Tabs>
          </FixedLayout>

            <View  activePanel={ui.history[ui.history.length - 1].split("/")[1]}>
                <Panel id={"steam"}>
                    {Array.isArray(games.steam) ? games.steam.map(s => (
                        <Steam req={s}/>
                    )) : ''}
                </Panel>
                <Panel id={"playstation"}>
                    {Array.isArray(games.ps) ? games.ps.map(s => (
                        <Steam req={s}/>
                    )) : ''}
                </Panel>
                <Panel id={"xbox"}>
                    {Array.isArray(games.xbox) ? games.xbox.map(s => (
                        <Steam req={s}/>
                    )) : ''}
                </Panel>
                <Panel id={"mobile"}>
                    {Array.isArray(games.mobile) ? games.mobile.map(s => (
                        <Steam req={s}/>
                    )) : ''}
                </Panel>
            </View>
        </Panel>
    )
};

export default SelectMarketPlace;

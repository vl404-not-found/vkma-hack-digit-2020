import React, {useState} from 'react';

import {Panel, PanelHeader, Search} from '@vkontakte/vkui'
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline'
import Icon24Filter from "@vkontakte/icons/dist/24/filter";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from "../../store/dynamicui/actions";
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";

const SelectMarketPlace = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)

    const [activeTab4] = useState()

    return (
        <Panel id={id}>
            <PanelHeader left={<Icon24NotificationOutline style={{ color: '#3F8AE0' }}/>} >
                Подбор
            </PanelHeader>

            <Search icon={
                <Icon24Filter/>
            }/>
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
            {/*тут твой уникальный код*/}
        </Panel>
    )
};

export default SelectMarketPlace;

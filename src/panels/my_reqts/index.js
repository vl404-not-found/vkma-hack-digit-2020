import React, {useState} from 'react';

import {Panel, PanelHeader, Search} from '@vkontakte/vkui'
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from "../../store/dynamicui/actions";
import {PanelHeaderBack} from "@vkontakte/vkui";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";

const AddReq = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)


    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => dispatch(uiActions.back())} />}>
                Заявки
            </PanelHeader>

            <Tabs>
                <TabsItem
                    onClick={() => {
                        dispatch(uiActions.push_route('add_req/news'))
                    }}
                    selected={ui.history[ui.history.length - 1].split("/")[1] === 'news'}
                    >
                    Новости
                </TabsItem>
                <TabsItem
                    onClick={() => {
                        dispatch(uiActions.push_route('add_req/recomendations'))
                    }}
                    selected={ui.history[ui.history.length - 1].split("/")[1] === 'recomendations'}
                >
                    Интересное
                </TabsItem>
            </Tabs>

        </Panel>
    )
};

export default AddReq;
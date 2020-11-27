import React, {useState} from 'react';

import {Panel, PanelHeader, Search} from '@vkontakte/vkui'
import {useDispatch, useSelector} from "react-redux";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import * as uiActions from "../../store/dynamicui/actions";

const Team = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)


    return (
        <Panel id={id}>
            <PanelHeader>
                Команды
            </PanelHeader>
            {/*тут твой уникальный код*/}
            <Div style={{ marginTop: 600 }}>
                <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.push_route('add_team'))}>Добавить команду</Button>
            </Div>
        </Panel>
    )
};

export default Team;
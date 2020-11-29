import React, {useEffect} from 'react';

import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'
import {useDispatch, useSelector} from "react-redux";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import * as uiActions from "../../store/dynamicui/actions";
import {RequestGamers} from "../home/RequestsGamers";
import {conclusionMyTeam} from "../../store/requests/actions";
import {RequestTeam} from "../home/RequestsTeam";

const ListTeamReq = ({id}) => {
    const dispatch = useDispatch()

    // const ui = useSelector(s => s.dynamic_ui)
    const req = useSelector(s => s.requests)

    useEffect(() => {
        dispatch(conclusionMyTeam.saga())
        // dispatch(getRequestsMain.saga())
    }, [dispatch])

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => dispatch(uiActions.back())} />}>
                Команды
            </PanelHeader>

            {Array.isArray(req.com) ? req.com.map(s => (
                <RequestTeam req={s}/>
            )) : ''}

            <Div style={{ marginTop: 600 }}>
                <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.push_route('add_team'))}>Добавить заявку</Button>
            </Div>
        </Panel>
    )
};

export default ListTeamReq;
import React, {useEffect} from 'react';

import {Panel, PanelHeader} from '@vkontakte/vkui'
import {useDispatch, useSelector} from "react-redux";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import * as uiActions from "../../store/dynamicui/actions";
import {RequestGamers} from "../home/RequestsGamers";
import {backendReg, conclusionMyTeam, getRequestsMain} from "../../store/requests/actions";

const Team = ({id}) => {
    const dispatch = useDispatch()

    // const ui = useSelector(s => s.dynamic_ui)
    const req = useSelector(s => s.requests)

    useEffect(() => {
         dispatch(conclusionMyTeam.saga())
        // dispatch(getRequestsMain.saga())
    }, [dispatch])

    return (
        <Panel id={id}>
            <PanelHeader>
                Команды
            </PanelHeader>
            <Div style={{ marginTop: 0 }}>
                <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.push_route('page_team'))}>page test</Button>
            </Div>
            {/*тут твой уникальный код*/}

            {Array.isArray(req.my_team) ? req.my_team.map(s => (
                <RequestGamers req={s}/>
            )) : ''}


            <Div style={{ marginTop: 600 }}>
                <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.push_route('add_team'))}>Добавить команду</Button>
            </Div>
        </Panel>
    )
};

export default Team;

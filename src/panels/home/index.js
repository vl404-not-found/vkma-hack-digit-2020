import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import {Div, FixedLayout, Search, Tabs, TabsItem, View, Button} from "@vkontakte/vkui";
import {Icon24GameOutline} from "@vkontakte/icons";
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from "../../store/dynamicui/actions";
import {backendReg, getRequestsCom, getRequestsMain, getRequestsYour} from "../../store/requests/actions";
import {RequestGamers} from "./RequestsGamers";

const Home = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)
    const linker = useSelector(s => s.dynamic_ui.history[ui.history.length - 1].split("/")[1])
    const req = useSelector(s => s.requests)


    useEffect(() => {
        dispatch(backendReg.saga())
        dispatch(getRequestsMain.saga())
    }, [dispatch])

    useEffect(() => {
        linker === 'commands' ?
            dispatch(getRequestsCom.saga()) :
            dispatch(getRequestsYour.saga())
    }, [linker, dispatch])

    return (
        <Panel id={id}>
            <PanelHeader>
                Заявки
            </PanelHeader>
            <FixedLayout vertical="top">
                <Search icon={
                    <div style={{display: "flex", marginRight: "80%"}}>
                        <div style={{margin: "7px"}}>
                            <Icon24GameOutline/>
                        </div>
                        <div style={{margin: "7px"}}>
                            <Icon24Filter/>
                        </div>
                    </div>
                }/>
                <Tabs>
                    <TabsItem
                        onClick={() => dispatch(uiActions.push_route('requests/gamers'))}
                        selected={ui.history[ui.history.length - 1].split("/")[1] === 'gamers'}>
                        Игроки
                    </TabsItem>
                    <TabsItem
                        onClick={() => dispatch(uiActions.push_route('requests/commands'))}
                        selected={ui.history[ui.history.length - 1].split("/")[1] === 'commands'}>
                        Команды
                    </TabsItem>
                    <TabsItem
                        onClick={() => dispatch(uiActions.push_route('requests/your'))}
                        selected={ui.history[ui.history.length - 1].split("/")[1] === 'your'}>
                        Мои заявки
                    </TabsItem>
                </Tabs>
            </FixedLayout>
            <View style={{marginTop: '90px'}} activePanel={ui.history[ui.history.length - 1].split("/")[1]}>
                <Panel id={"gamers"}>
                    {Array.isArray(req.main) ? req.main.map(s => (
                        <RequestGamers req={s}/>
                    )) : ''}
                </Panel>
                <Panel id={"commands"}>
                    {Array.isArray(req.com) ? req.com.map(s => (
                        <RequestGamers req={s}/>
                    )) : ''}
                </Panel>
                <Panel id={"your"}>
                    {Array.isArray(req.your) ? req.your.map(s => (
                        <RequestGamers req={s}/>
                    )) : ''}
                    <Div>
                        <Div style={{marginTop: 0}}>
                            <Button size="xl" stretched style={{marginRight: 8}}
                                    onClick={() => dispatch(uiActions.push_route('add_req/news'))}>Добавить
                                заявку</Button>
                        </Div>
                    </Div>
                </Panel>
            </View>
        </Panel>
    )
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;

import React, {useEffect} from "react";
import {Tabbar, TabbarItem} from "@vkontakte/vkui";
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from '../store/dynamicui/actions'
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
// import {backendAuth} from "../store/vkdata/actions";

export const TabBar = () => {
    const history = useSelector(s => s.dynamic_ui.history)
    const dispatch = useDispatch();

    useEffect( () => {
        // dispatch(backendAuth.saga())
    }, [dispatch])

    return (
        <Tabbar>
            <TabbarItem
                selected={history[history.length - 1].includes('requests')}
                text="Заявки"
                onClick={() => dispatch(uiActions.push_route('requests/gamers'))}
            >
                <Icon28ArticleOutline />
            </TabbarItem>
            <TabbarItem
                selected={history[history.length - 1].includes('selection')}
                text="Подбор"
                onClick = {() => dispatch(uiActions.push_route('selection/main'))}
            >
                <Icon28ServicesOutline />
            </TabbarItem>
            <TabbarItem
                selected={history[history.length - 1].includes('games')}
                onClick = {() => dispatch(uiActions.push_route('games/main'))}
                text="Игры"
            >
                <Icon28GameOutline />
            </TabbarItem>
            <TabbarItem
                selected={history[history.length - 1].includes('commands')}
                onClick = {() => dispatch(uiActions.push_route('commands/main'))}
                text="Команды"
            >
                <Icon28Users3Outline />
            </TabbarItem>
            <TabbarItem
                selected={history[history.length - 1].includes('settings')}
                onClick = {() => dispatch(uiActions.push_route('settings/main'))}
                text="Настроки"
            >
                <Icon28SettingsOutline />
            </TabbarItem>
        </Tabbar>
    )
}

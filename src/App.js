import React, {useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/index';
import {Provider} from "react-redux";

import {store} from './store/index'
import ToastContainer from './components/Toasts';
import {Epic, ScreenSpinner} from "@vkontakte/vkui";

import {TabBar} from "./components/TabBar";
import Proto from "./panels/proto";
import GameCom from "./panels/games/index";
import Set from "./panels/setting/index";
import DopSet from "./panels/setting/dobsetting";
import AddGame from "./panels/games/addGame";
import Link from "./panels/games/linkAccount";



const App = () => {

    const [ui, SetUi] = useState(store.getState().dynamic_ui)

    function handleActions() {
        SetUi(store.getState().dynamic_ui)
    }

    store.subscribe(handleActions)



    return (
        <Provider store={store}>
            <ToastContainer/>
            <Epic activeStory={ui.history[ui.history.length - 1].split("/")[0]} tabbar={<TabBar />}>
                <View activePanel="requests"
                      id={'requests'}
                    popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                    <Home id='requests' />
                </View>

                {/*(Redux DevTools Dispatcher) если хочешь перейти на конкретный экран -- выполни :
                ----------------------
                {
                   type: 'gen/PUSH_TO_HISTORY',
                   $payload: 'proto/main'
                }
                ----------------------
                */}
                {/*Тут обозначаете условный "роут"*/}
                <View activePanel="proto/main" id="proto/main"
                      popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                    <Proto id='proto/main' />
                </View>
                <View activePanel="games" id="games"
                      popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                    <GameCom id='games' />
                </View>
                <View activePanel="settings" id="settings"
                      popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                    <Set id='settings' />
                </View>
                <View activePanel="dopsettings" id="dopsettings"
                      popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                    <DopSet id='dopsettings' />
                </View>
                <View activePanel="addGame" id="addGame"
                      popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                    <AddGame id='addGame' />
                </View>
                <View activePanel="addGame/playstation" id="addGame/playstation"
                      popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                    <Link id='addGame/playstation' />
                </View>
            </Epic>
        </Provider>
    );
}

export default App;

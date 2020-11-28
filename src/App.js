import React, {useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/index';
import {Provider} from "react-redux";

import {store} from './store/index'
import ToastContainer from './components/Toasts';
import {
    Epic,
    FormLayout,
    ModalCard,
    ModalPage,
    ModalPageHeader,
    ModalRoot,
    Root,
    ScreenSpinner,
    Select
} from "@vkontakte/vkui";

import {TabBar} from "./components/TabBar";
import Proto from "./panels/proto";
import SelectMarketPlace from "./panels/selection_players";
import Team from "./panels/team_main";
import TeamAdd from "./panels/team_main/AddTeam";
import AddReq from "./panels/my_reqts";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import {Div} from "@vkontakte/vkui/dist/es6";


const App = () => {

    const [ui, SetUi] = useState(store.getState().dynamic_ui)

    function handleActions() {
        SetUi(store.getState().dynamic_ui)
    }

    store.subscribe(handleActions)

    const baseModal = (
        <ModalRoot activeModal={ui.modal}>
            <ModalPage id="select"
                       header={<ModalPageHeader left={<Icon24Cancel/>} right={<>Очистить</>}>
                           Фильтры
                       </ModalPageHeader>}>
                <FormLayout>
                    <Select top="Сортировка">
                        <option value="rel" selected>По релевантности</option>
                        <option value="f">Женский</option>
                    </Select>
                </FormLayout>
            </ModalPage>
            <ModalCard id="faq">
                ...
            </ModalCard>
        </ModalRoot>
    )

    return (
        <Provider store={store}>
            <ToastContainer/>
            <Root activeView={'epic'} modal={baseModal}>
                <Epic id={'epic'} activeStory={ui.history[ui.history.length - 1].split("/")[0]} tabbar={<TabBar/>}>
                    <View activePanel="requests"
                          id={'requests'}
                          popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                        <Home id='requests'/>
                    </View>

                    <View activePanel="selection" id="selection"
                          popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                        <SelectMarketPlace id='selection'/>
                    </View>

                    <View activePanel="commands" id="commands"
                          popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                        <Team id='commands'/>
                    </View>

                    <View activePanel="add_team" id="add_team"
                          popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                        <TeamAdd id='add_team'/>
                    </View>

                    <View activePanel="add_req" id="add_req"
                          popout={ui.isLoaderShow ? <ScreenSpinner size='large'/> : null}>
                        <AddReq id='add_req'/>
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
                        <Proto id='proto/main'/>
                    </View>


                </Epic>
            </Root>
        </Provider>
    );
}

export default App;


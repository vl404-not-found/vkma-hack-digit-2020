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
    ModalRoot, PopoutWrapper,
    Root,
    ScreenSpinner,
    Select
} from "@vkontakte/vkui";

import {TabBar} from "./components/TabBar";
import Proto from "./panels/proto";
import GameCom from "./panels/games/index";
import Set from "./panels/setting/index";
import DopSet from "./panels/setting/dobsetting";
import AddGame from "./panels/games/addGame";
import Link from "./panels/games/linkAccount";
import SelectMarketPlace from "./panels/selection_players";
import Team from "./panels/team_main";
import TeamAdd from "./panels/team_main/AddTeam";
import AddReq from "./panels/my_reqts";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import PageTeam from "./panels/page_team";
import PageUser from "./panels/page_user";


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
            <Root activeView={'epic'} modal={baseModal} popout={ui.isLoaderShow ?
                <PopoutWrapper hasMask={true}><ScreenSpinner size='large'/></PopoutWrapper> : null}>
                    <Epic id={'epic'} activeStory={ui.history[ui.history.length - 1].split("/")[0]} tabbar={<TabBar/>}>
                    <View activePanel="requests"
                          id={'requests'}
                    >
                        <Home id='requests'/>
                    </View>

                    <View activePanel="selection" id="selection"
                    >
                        <SelectMarketPlace id='selection'/>
                    </View>

                    <View activePanel="commands" id="commands"
                    >
                        <Team id='commands'/>
                    </View>

                    <View activePanel="add_team" id="add_team"
                    >
                        <TeamAdd id='add_team'/>
                    </View>

                    <View activePanel="add_req" id="add_req"
                    >
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
                    >
                        <Proto id='proto/main'/>
                    </View>
                    <View activePanel="games" id="games"
                    >
                        <GameCom id='games'/>
                    </View>
                    <View activePanel="settings" id="settings"
                    >
                        <Set id='settings'/>
                    </View>
                    <View activePanel="dopsettings" id="dopsettings"
                    >
                        <DopSet id='dopsettings'/>
                    </View>
                    <View activePanel="addGame" id="addGame"
                    >
                        <AddGame id='addGame'/>
                    </View>
                    <View activePanel="addGame/playstation" id="addGame/playstation">
                        <Link id='addGame/playstation'/>
                    </View>
                    {/*Тут обозначаете условный "роут"*/}
                    <View activePanel="page_team" id="page_team">
                        <PageTeam id='page_team'/>
                    </View>

                    <View activePanel="page_user" id="page_user">
                        <PageUser id='page_user'/>
                    </View>

                    <View activePanel="proto/main" id="proto/main">
                        <Proto id='proto/main'/>
                    </View>


                </Epic>
            </Root>
        </Provider>
    );
}

export default App;

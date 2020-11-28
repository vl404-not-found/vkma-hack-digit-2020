import React, {useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/index';

import {store} from './store/index'
import ToastContainer from './components/Toasts';
import {
    Epic,
    Panel,
    PanelHeader,

    FormLayout,
    ModalPage,
    ModalPageHeader,
    ModalRoot, PopoutWrapper,
    Root,
    ScreenSpinner,
    Select,
    SimpleCell,
    Div,
    Button
} from "@vkontakte/vkui";

import {TabBar} from "./components/TabBar";
import Proto from "./panels/proto";
import GameCom from "./panels/games/index";
import Set from "./panels/setting/index";
import DopSet from "./panels/setting/dobsetting";
import AddGame from "./panels/games/addGame";
import Link from "./panels/games/linkAccount";
import PageGame from "./panels/games/pageGame";
import SelectMarketPlace from "./panels/selection_players";
import SelPeople from "./panels/selection_players/selPeople";
import Team from "./panels/team_main";
import TeamAdd from "./panels/team_main/AddTeam";
import AddReq from "./panels/my_reqts";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import PageTeam from "./panels/page_team";
import PageUser from "./panels/page_user";
import * as uiActions from './store/dynamicui/actions'
import {useDispatch} from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const [ui, SetUi] = useState(store.getState().dynamic_ui)
    function handleActions() {
        SetUi(store.getState().dynamic_ui)
    }
    store.subscribe(handleActions)


    const baseModal = (
        <ModalRoot activeModal={ui.modal} onClose={() => dispatch(uiActions.open_modal(null))}>
            <ModalPage id="filter_main"
                       header={<ModalPageHeader left={<Icon24Cancel/>} right={<>Очистить</>}>
                           Фильтры
                       </ModalPageHeader>}>
                <FormLayout>
                    <Select top="Сортировка">
                        <option value="rel" selected>По релевантности</option>
                        <option value="f">По новизне</option>
                    </Select>
                </FormLayout>
            </ModalPage>
            <ModalPage id="selectgames">
                <Panel>
                    <PanelHeader
                        onClick={() => dispatch(uiActions.open_modal(null))}
                        right={'Очистить'}
                        style={{marginTop: '-50px'}}
                    >
                        <SimpleCell>Фильтры</SimpleCell>

                    </PanelHeader>
                    <FormLayout>
                        <Select top="Платформа" placeholder="Все">
                            <option value="m">PC</option>
                            <option value="f">PlayStation</option>
                            <option value="a">Xbox</option>
                        </Select>
                        <Select top="Метод поиска" placeholder="Все">
                            <option value="m">1 метод</option>
                            <option value="f">2 метод</option>
                        </Select>
                    </FormLayout>
                    <Div></Div>
                    <Div></Div>
                    <Button
                        stretched
                        size="xl"
                        style={{width: '95%', margin: '0 auto'}}
                    >Показать результат</Button>
                    <Div></Div>
                    <Div></Div>
                    <Div></Div>
                </Panel>
            </ModalPage>
        </ModalRoot>

    )

    return (
        <>
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
                    <View activePanel="steam" id="steam">
                        <Link id='steam'/>
                    </View>
                    <View activePanel="pageGame" id="pageGame">
                        <PageGame id='pageGame'/>
                    </View>
                    <View activePanel="selpeople" id="selpeople">
                        <SelPeople id='selpeople'/>
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
        </>
    );
}

export default App;

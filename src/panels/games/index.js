import React, {useState} from 'react';
import {
    Div,
    ModalCard,
    ModalPage,
    ModalRoot,
    Button,
    Panel,
    PanelHeader,
    Group,
    Search,
    FixedLayout,
    View,
} from '@vkontakte/vkui'
import {List, SimpleCell, Avatar, FormLayout, Select} from '@vkontakte/vkui'
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import {useDispatch} from "react-redux";
import * as uiActions from '../../store/dynamicui/actions'


const Game = ({id}) => {
    const [modal, setModal] = useState(null);
    const dispatch = useDispatch();

    const openBase = (
        <ModalRoot activeModal={modal}>
            <ModalPage id="select">
                <Panel>
                    <PanelHeader
                        onClick={() => setModal(null)}
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
            <ModalCard id="faq">
                ...
            </ModalCard>
        </ModalRoot>

    )

    return (
        <Panel id={id}>
            <PanelHeader separator={false}>
                Игры
            </PanelHeader>
            <View modal={openBase}>
                <Search icon={
                    <div style={{display: "flex", marginRight: "80%"}}>
                        <div style={{margin: "7px"}}>
                            <Icon24Filter onClick={() => setModal('select')}/>
                        </div>
                    </div>
                }/>
                <Group separator="hide">
                    <List>
                        <SimpleCell
                            onClick={() => dispatch(uiActions.push_route('pageGame'))}
                            before={<Avatar src={('/ex/avatar.jpg')} size={48}/>}
                            text="Игра"
                        >
                            Название игры
                        </SimpleCell>
                    </List>
                </Group>
                <FixedLayout vertical="bottom">
                    <Button
                        stretched
                        size="xl"
                        style={{width: '95%', margin: '0 auto'}}
                        onClick={() => dispatch(uiActions.push_route('addGame/steam'))}
                    >Добавить игру</Button>
                </FixedLayout>
            </View>
        </Panel>
    )
}

export default Game;

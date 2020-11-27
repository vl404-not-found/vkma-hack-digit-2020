import React, {useState} from 'react';

import {Checkbox, Div, FixedLayout, Panel, PanelHeader, Search, View} from '@vkontakte/vkui'
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from "../../store/dynamicui/actions";
import {PanelHeaderBack} from "@vkontakte/vkui";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Link from "@vkontakte/vkui/dist/components/Link/Link";
import Icon24GameOutline from '@vkontakte/icons/dist/24/game_outline';
import {SelectMimicry} from "@vkontakte/vkui";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
const AddReq = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)


    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => dispatch(uiActions.back())} />}>
                Заявки
            </PanelHeader>

            <FixedLayout vertical="top">
            <Tabs>
                <TabsItem
                    onClick={() => {
                        dispatch(uiActions.push_route('add_req/news'))
                    }}
                    selected={ui.history[ui.history.length - 1].split("/")[1] === 'news'}
                    >
                    Поиск игрока
                </TabsItem>
                <TabsItem
                    onClick={() => {
                        dispatch(uiActions.push_route('add_req/recomendations'))
                    }}
                    selected={ui.history[ui.history.length - 1].split("/")[1] === 'recomendations'}
                >
                    Поиск в команду
                </TabsItem>
            </Tabs>
            </FixedLayout>

            <View style={{marginTop: '30px'}} activePanel={ui.history[ui.history.length - 1].split("/")[1]}>
                <Panel id={"news"}>
                    <Div>
                        <FormLayout>
                            <FormLayoutGroup top="Текст заявки">
                                <Input type="text" defaultValue="" placeholder="Введите текст заявки" />
                            </FormLayoutGroup>
                        </FormLayout>

                        <FormLayout>
                            <FormLayoutGroup top="Игра">
                                <Input type="text" defaultValue="" placeholder="Выберите игру" disabled  right={<Icon24GameOutline/>}/>
                            </FormLayoutGroup>
                        </FormLayout>

                        <FormLayout>
                            <Checkbox>Я прочитал и согласен с <Link>правилами</Link></Checkbox>
                        </FormLayout>
                        {/*тут твой уникальный код*/}
                        <Div style={{ marginTop: 340 }}>
                            <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.back('add_team'))}>Добавить команду</Button>
                        </Div>
                    </Div>
                </Panel>
                <Panel id={"recomendations"}>
                    <Div>
                        <Div>
                            <FormLayout>
                                <FormLayoutGroup top="Текст заявки">
                                    <Input type="text" defaultValue="" placeholder="Введите текст заявки" />
                                </FormLayoutGroup>
                            </FormLayout>

                            <FormLayout>
                                <FormLayoutGroup top="Игра">
                                    <Input type="text" defaultValue="" placeholder="Выберите игру" disabled  right={<Icon24GameOutline/>}/>
                                </FormLayoutGroup>
                            </FormLayout>

                            <FormLayout>
                                <Select top="Команда" placeholder="Выберите команду">
                                    <option value="m">Команда-1</option>
                                    <option value="f">Команда-2</option>
                                </Select>
                            </FormLayout>

                            <FormLayout>
                                <Checkbox>Я прочитал и согласен с <Link>правилами</Link></Checkbox>
                            </FormLayout>
                            {/*тут твой уникальный код*/}
                            <Div style={{ marginTop: 230 }}>
                                <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.back('add_team'))}>Добавить команду</Button>
                            </Div>
                        </Div>
                    </Div>
                </Panel>
            </View>



        </Panel>
    )
};

export default AddReq;
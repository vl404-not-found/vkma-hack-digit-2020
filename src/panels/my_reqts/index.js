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
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Link from "@vkontakte/vkui/dist/components/Link/Link";

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
                    Новости
                </TabsItem>
                <TabsItem
                    onClick={() => {
                        dispatch(uiActions.push_route('add_req/recomendations'))
                    }}
                    selected={ui.history[ui.history.length - 1].split("/")[1] === 'recomendations'}
                >
                    Интересное
                </TabsItem>
            </Tabs>
            </FixedLayout>

            <View style={{marginTop: '0'}} activePanel={ui.history[ui.history.length - 1].split("/")[1]}>
                <Panel id={"news"}>
                    <Div>
                        <FormLayout>
                            <FormLayoutGroup top="Текст заявки">
                                <Input type="text" defaultValue="" placeholder="Введите текст заявки" />
                            </FormLayoutGroup>
                        </FormLayout>

                        <FormLayout>
                            <FormLayoutGroup top="Игра">
                                <Input type="text" defaultValue="" placeholder="Выберите игру" disabled />
                            </FormLayoutGroup>
                        </FormLayout>

                        <FormLayout>
                            <Checkbox>Я прочитал и согласен с <Link>правилами</Link></Checkbox>
                        </FormLayout>
                        {/*тут твой уникальный код*/}
                        <Div style={{ marginTop: 244 }}>
                            <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.back('add_team'))}>Добавить команду</Button>
                        </Div>
                    </Div>
                </Panel>
                <Panel id={"recomendations"}>
                    <Div>
                        Заявки команды
                    </Div>
                </Panel>
            </View>



        </Panel>
    )
};

export default AddReq;
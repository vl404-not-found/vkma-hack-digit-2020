import React from 'react';

import {Checkbox, Div, FixedLayout, Panel, PanelHeader, View} from '@vkontakte/vkui'
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
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import {useForm} from "react-hook-form";
import {postRequestsTextReq} from "../../store/requests/actions";

const AddReq = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)
    const games = useSelector(s => s.games.your)
    const {register, handleSubmit, getValues} = useForm();

    const onSubmit = data => {
        dispatch(postRequestsTextReq.saga({...data, game_id: ui.selected_game}))
    }

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => dispatch(uiActions.back())}/>}>
                Заявки
            </PanelHeader>

            <FixedLayout vertical="top">
                <Tabs>
                    <TabsItem
                        onClick={() => {
                            dispatch(uiActions.push_route('add_req/find_solo'))
                        }}
                        selected={ui.history[ui.history.length - 1].split("/")[1] === 'find_solo'}
                    >
                        Поиск игрока
                    </TabsItem>
                    <TabsItem
                        onClick={() => {
                            dispatch(uiActions.push_route('add_req/find_team'))
                        }}
                        selected={ui.history[ui.history.length - 1].split("/")[1] === 'find_team'}
                    >
                        Поиск в команду
                    </TabsItem>
                </Tabs>
            </FixedLayout>

            <View style={{marginTop: '30px'}} activePanel={ui.history[ui.history.length - 1].split("/")[1]}>
                <Panel id={"find_solo"}>
                    <Div>
                        <FormLayout onSubmit={handleSubmit(onSubmit)}>
                            <FormLayoutGroup top="Текст заявки">
                                <Input type="text" defaultValue="" getRef={register({required: false})}
                                       name="text"
                                       placeholder="Введите текст заявки"/>
                            </FormLayoutGroup>
                        </FormLayout>

                        <FormLayout>
                            <FormLayoutGroup top="Игра">
                                <Input type="text" defaultValue={games.filter(s => s.game_id === ui.selected_game)[0]
                                    ? games.filter(s => s.game_id === ui.selected_game)[0].name : null} placeholder="Выберите игру"
                                       name="game_id"
                                       onClick={() => dispatch(uiActions.open_modal('select_game'))}
                                right={<Icon24GameOutline/>}/>
                            </FormLayoutGroup>
                        </FormLayout>

                        <FormLayout>
                            <Checkbox>Я прочитал и согласен с <Link>правилами</Link></Checkbox>
                        </FormLayout>

                        {/*тут твой уникальный код*/}
                        <Div style={{marginTop: 100}}>
                            <Button size="xl" stretched
                                    style={{marginRight: 8}} type={'submit'}
                                    onClick={()=> onSubmit(getValues()) }
                            >Добавить заявку</Button>
                        </Div>
                    </Div>
                </Panel>
                <Panel id={"find_team"}>
                    <Div>
                        <Div>
                            <FormLayout>
                                <FormLayoutGroup top="Текст заявки">
                                    <Input type="text" name="text" defaultValue="" placeholder="Введите текст заявки"/>
                                </FormLayoutGroup>
                            </FormLayout>

                            <FormLayout>
                                <FormLayoutGroup top="Игра">
                                    <Input type="text" defaultValue="" placeholder="Выберите игру" disabled
                                           right={<Icon24GameOutline/>}/>
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
                            <Div style={{marginTop: 230}}>
                                <Button size="xl" type={"submit"} stretched style={{marginRight: 8}}
                                        onClick={() => dispatch(uiActions.back('add_team'))}>Добавить заявку</Button>
                            </Div>
                        </Div>
                    </Div>
                </Panel>
            </View>


        </Panel>
    )
};

export default AddReq;

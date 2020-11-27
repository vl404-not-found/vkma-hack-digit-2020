import React, {useState} from 'react';

import {Panel, PanelHeader, Search} from '@vkontakte/vkui'
import {useDispatch, useSelector} from "react-redux";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import * as uiActions from "../../store/dynamicui/actions";
import {PanelHeaderBack} from "@vkontakte/vkui";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import {Checkbox} from "@vkontakte/vkui";
import Link from "@vkontakte/vkui/dist/components/Link/Link";

const TeamAdd = ({id}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)


    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => dispatch(uiActions.back('add_team'))} />}>
                Заявки
            </PanelHeader>


            <FormLayout>
                <FormLayoutGroup top="Фамилия">
                    <Input type="text" defaultValue="" placeholder="Введите название команды" />
                </FormLayoutGroup>
            </FormLayout>


            <FormLayout>
                <Select top="Участники" placeholder="Выберите участников">
                    <option value="m">Slot-1</option>
                    <option value="f">Slot-2</option>
                </Select>
            </FormLayout>

            <FormLayout>
                <FormLayoutGroup top="Беседа команды">
                    <Input type="text" defaultValue="" placeholder="Вставьте ссылку на беседу" />
                </FormLayoutGroup>
            </FormLayout>

            <FormLayout>
                <Checkbox>Я прочитал и согласен с <Link>правилами</Link></Checkbox>
            </FormLayout>
            {/*тут твой уникальный код*/}
            <Div style={{ marginTop: 244 }}>
                <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.back('add_team'))}>Добавить команду</Button>
            </Div>
        </Panel>
    )
};

export default TeamAdd;
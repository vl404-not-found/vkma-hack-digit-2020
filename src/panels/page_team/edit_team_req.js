import React from 'react';

import {Panel, PanelHeader} from '@vkontakte/vkui'
import {useDispatch, useSelector} from "react-redux";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import * as uiActions from "../../store/dynamicui/actions";
import {PanelHeaderBack} from "@vkontakte/vkui";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";

const EditTeamPage = ({id}) => {
    const req = useSelector(s => s.requests)
    const dispatch = useDispatch()
    const id_req = useSelector(s => s.dynamic_ui.history[s.dynamic_ui.history.length - 1].split("/")[1])
    const data = useSelector(s => s.requests.com.filter(item => {return item.request_id === id_req})[0])
    console.log(id_req)

    // const ui = useSelector(s => s.dynamic_ui)


    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => dispatch(uiActions.back('add_team'))} />}>
                Заявки
            </PanelHeader>


            <FormLayout>
                <FormLayoutGroup top="Название ">
                    <Input type="text" Value={data.name} placeholder="Введите название команды" />
                </FormLayoutGroup>
            </FormLayout>

            <FormLayout>
                <FormLayoutGroup top="Ссылка на беседу ">
                    <Input type="text" defaultValue="" placeholder="Введите название команды" />
                </FormLayoutGroup>
            </FormLayout>

            {/*тут твой уникальный код*/}
            <Div style={{ marginTop: 244 }}>
                <Button size="xl" stretched style={{ marginRight: 8 }} onClick={() => dispatch(uiActions.back('add_team'))}>Изменить</Button>
            </Div>
        </Panel>
    )
};

export default EditTeamPage;
import React from 'react';

import {Counter, MiniInfoCell, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import * as uiActions from "../../store/dynamicui/actions";
import {useDispatch, useSelector} from "react-redux";
import {Separator} from "@vkontakte/vkui";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Icon20Info from "@vkontakte/icons/dist/20/info";
import Card from "@vkontakte/vkui/dist/components/Card/Card";
import CardScroll from "@vkontakte/vkui/dist/components/CardScroll/CardScroll";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24PenOutline from "@vkontakte/icons/dist/24/pen_outline";
import Icon28DeleteOutlineAndroid from "@vkontakte/icons/dist/28/delete_outline_android";


const PageUser = ({id}) => {
    const req = useSelector(s => s.requests)
    const dispatch = useDispatch()
    const id_req = useSelector(s => s.dynamic_ui.history[s.dynamic_ui.history.length - 1].split("/")[1])
    const data = useSelector(s => s.requests.com.filter(item => {return item.request_id === id_req})[0])
    console.log(id_req)

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => dispatch(uiActions.back())}/>}>
                Команды
            </PanelHeader>

            <SimpleCell
                after={
                    <React.Fragment>
                        <PanelHeaderButton><Icon24PenOutline onClick={() => dispatch(uiActions.push_route(`edit_page_team/${id_req}`))} /></PanelHeaderButton>
                        <PanelHeaderButton><Icon28DeleteOutlineAndroid /></PanelHeaderButton>
                    </React.Fragment>} description="Рейтинг 4.8" before={ <Avatar size={72} src={data.avatar_url ? data.avatar_url : null}/> }>
                <Text
                    weight="semibold">{data.name}</Text></SimpleCell>
            {/*тут твой уникальный код*/}
            <Div style={{display: 'flex'}}>
                <Button size="l" stretched style={{ marginRight: 8 }}>Написать</Button>
                <Button size="l" stretched style={{ marginRight: 8 }}>Перейти на ст...</Button>
            </Div>

            <Separator style={{marginTop: 20}}/>
            <Header>
                ЗАЯВКА
            </Header>
            <Div>
                <Text weight="regular" style={{ marginBottom: 16 }}>{data.text}</Text>
            </Div>

            <MiniInfoCell
                style={{ color: "#4986CC", marginTop: -25 }}
                before={<Icon20Info />}
                mode="more"
            >
                Подробная информация
            </MiniInfoCell>

            <div>
                <Header indicator={2} aside={<text style={{color: "#3F8AE0" }} onClick={() => dispatch(uiActions.push_route(`list_teammates`))}>Показать все</text>} style={{weight:"medium", color:"red"}}>
                    УЧАСТНИКИ
                </Header>
            <Group separator="hide">
                <CardScroll>
                    {Array.isArray(req.com) ? req.com.map(s => (
                        <Card size="m">
                            <div style={{ width: 64, height: 64 }} />
                        </Card>
                    )) : ''}

                </CardScroll>
            </Group>
                </div>

            <Separator style={{marginTop: 24}}/>
            <div>
                <Header indicator={3} aside={<text style={{color: "#3F8AE0" }} onClick={() => dispatch(uiActions.push_route(`list_team_req`))}>Показать все</text>} style={{weight:"medium", color:"red"}}>
                    ЗАЯВКИ
                </Header>

                <Group separator="hide">
                    <CardScroll>
                        <Card size="m">
                            <div style={{ width: 224, height: 96 }} />
                        </Card>
                        <Card size="m">
                            <div style={{ width: 224, height: 96 }} />
                        </Card>
                        <Card size="m">
                            <div style={{ width: 224, height: 96 }} />
                        </Card>
                    </CardScroll>
                </Group>
            </div>

            <div>
                <Separator style={{marginTop: 20}}/>
                <Header aside={<text style={{color: "#3F8AE0" }}>Показать все</text>} style={{weight:"medium", color:"red"}}>
                    ССЫЛКА НА БЕСЕДУ
                </Header>
                <FormLayout>
                     <FormLayoutGroup>
                          <Input type="text" placeholder="Вставьте ссылку на беседу" />
                      </FormLayoutGroup>
                </FormLayout>
            </div>
        </Panel>
    )
};

export default PageUser;

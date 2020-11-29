import React from 'react';

import {MiniInfoCell, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'
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
//import CardGrid from "@vkontakte/vkui/dist/components/CardGrid/CardGrid";
//import {RequestGamers} from "../home/RequestsGamers";


const PageUser = ({id}) => {
    const req = useSelector(s => s.requests)
    const dispatch = useDispatch()
    const id_req = useSelector(s => s.dynamic_ui.history[s.dynamic_ui.history.length - 1].split("/")[1])
    const data = useSelector(s => s.requests.main.filter(item => {return item.request_id === id_req})[0])
    console.log(id_req)

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => dispatch(uiActions.back())}/>}>
                Профиль
            </PanelHeader>

            <SimpleCell before={<Avatar size={72} src={data.avatar_url} />} description="Рейтинг 4.8"><text weight="semibold">{data.name}</text></SimpleCell>
            {/*тут твой уникальный код*/}
            <Div style={{display: 'flex'}}>
                <Button size="l" stretched style={{ marginRight: 8 }}>Написать</Button>
                <Button size="l" stretched style={{ marginRight: 8 }} href={`https://vk.me/${data.vk_id}`} target={"_blank"}>Профиль ВК</Button>
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


            <Separator style={{marginTop: 24}}/>
            <SimpleCell expandable indicator="24">Возраст</SimpleCell>
            <SimpleCell expandable indicator="Есть">Микрофон</SimpleCell>
            <SimpleCell expandable indicator="BOYA BY-PM700">Модель микрофона</SimpleCell>
            <Separator style={{marginTop: 24}}/>
            <div>
                <Header indicator={12} aside={<text style={{color: "#3F8AE0" }}>Показать все</text>} style={{weight:"medium", color:"red"}}>
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
                <Header indicator={24} aside={<text style={{color: "#3F8AE0" }}>Показать все</text>} style={{weight:"medium", color:"red"}}>
                    ИГРЫ
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
                <Separator style={{marginTop: 20}}/>
            </div>
        </Panel>
    )
};

export default PageUser;

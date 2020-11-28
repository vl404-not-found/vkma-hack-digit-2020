import React from "react";
import {Avatar, Card, CardGrid, Cell, Group, Subhead, Title, Counter} from "@vkontakte/vkui";
import {Icon28MessageOutline} from "@vkontakte/icons";
import * as uiActions from "../../store/dynamicui/actions";
import {useDispatch, useSelector} from "react-redux";

export const RequestGamers = ({req}) => {
    const dispatch = useDispatch()
    const ui = useSelector(s => s.dynamic_ui)
    return (
        <>
            <Group separator="hide">
                <CardGrid>
                    <Card onClick={() => dispatch(uiActions.push_route(`page_user/${req.request_id}`))} size="l" mode="outline" style={{border: '1px double #ccc'}}>
                        <Cell before={<Avatar src={req.avatar_url} size={48}/>}
                              after={<Icon28MessageOutline/>}>
                            <div style={{display:"flex"}}>
                                <Counter size={"s"} mode={"primary"}>
                                    {req.game_name}
                                </Counter>
                            </div>
                            <Title level="3" weight="heavy">
                                {req.name}
                            </Title>
                            <Subhead weight="regular">
                                {req.text}
                            </Subhead>
                        </Cell>
                    </Card>
                </CardGrid>
            </Group>
        </>
    )
}

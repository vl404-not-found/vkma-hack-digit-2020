import React from "react";
import {Avatar, Card, CardGrid, Cell, Group, Subhead, Title, Counter} from "@vkontakte/vkui";
import {Icon28MessageOutline} from "@vkontakte/icons";

export const RequestGamers = ({req}) => {
    return (
        <>
            <Group separator="hide">
                <CardGrid>
                    <Card size="l" mode="outline">
                        <Cell before={<Avatar src={req.avatar_url} size={48}/>}
                              after={<Icon28MessageOutline/>}>
                            <div style={{display:"flex"}}>
                                <Counter size={"s"} mode={"primary"}>
                                    {req.game_name}
                                </Counter>
                            </div>
                            <Title level="2" weight="heavy">
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

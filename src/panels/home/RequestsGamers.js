import React from "react";
import {Avatar, Card, CardGrid, Cell, Group, Subhead, Title, Counter} from "@vkontakte/vkui";
import {Icon28MessageOutline} from "@vkontakte/icons";

export const RequestGamers = () => {
    return (
        <>
            <Group separator="hide">
                <CardGrid>
                    <Card size="l" mode="outline">
                        <Cell before={<Avatar src={"/ex/avatar.jpg"} size={48}/>}
                              after={<Icon28MessageOutline/>}>
                            <div style={{display:"flex"}}>
                                <Counter size={"s"} mode={"primary"}>
                                    Primary
                                </Counter>
                            </div>
                            <Title level="2" weight="heavy">
                                Георгий Летов
                            </Title>
                            <Subhead weight="regular">
                                Есть приличный опыт в команде СПб Могу играть как просто на рофле, так и на IGL
                            </Subhead>
                        </Cell>
                    </Card>
                </CardGrid>
            </Group>
        </>
    )
}

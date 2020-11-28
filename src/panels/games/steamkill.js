import React from  'react'
import {FixedLayout, Button, List, Avatar, Cell, Group} from "@vkontakte/vkui";

const SteamKill = ({req}) => {
  return(
    <>
    <Group separator="hide">
      <List>
        <Cell
            selectable
            before={<Avatar src={req.image} size={48}/>}
            text="Игра"
          description={"Сыграно: " + req.playtime + " ч."}
             >
          {req.name}
        </Cell>
      </List>
    </Group>
    <FixedLayout vertical="bottom">
        <Button
            stretched
            size="xl"
            style={{width: '95%', margin: '0 auto'}}
        >Добавить игру</Button>
    </FixedLayout>
    </>
  )
}
 export default SteamKill;

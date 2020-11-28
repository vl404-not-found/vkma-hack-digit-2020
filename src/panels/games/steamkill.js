import React from  'react'
import {List, Avatar, Cell, Group} from "@vkontakte/vkui";

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
    </>
  )
}
 export default SteamKill;

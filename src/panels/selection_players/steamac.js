import React from  'react'
import {List, Avatar, Cell, Group} from "@vkontakte/vkui";

const SteamAc = ({req}) => {
  return(
    <>
    <Group separator="hide">
      <List>
        <Cell
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
 export default SteamAc;

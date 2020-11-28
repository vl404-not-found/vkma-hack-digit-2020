import React from  'react'
import {List, Avatar, Cell, Group} from "@vkontakte/vkui";


const SteamKill = ({req}) => {
  return(
    <>
    <Group separator="hide">
      <List>
        <Cell
            selectable
            before={<Avatar src={('/ex/avatar.jpg')} size={48}/>}
            text="Игра"
          >
          Название игры
        </Cell>
      </List>
    </Group>
    </>
  )
}
 export default SteamKill;

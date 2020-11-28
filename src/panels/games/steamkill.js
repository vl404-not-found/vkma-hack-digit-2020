import React from  'react'
import {SimpleCell, List, Avatar, Card, CardGrid, Cell, Group, Subhead, Title, Counter} from "@vkontakte/vkui";
import {Icon28MessageOutline} from "@vkontakte/icons";


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

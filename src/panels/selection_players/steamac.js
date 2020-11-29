import React from  'react'
import {List, Avatar, Cell, Group} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from "../../store/dynamicui/actions";

const SteamAc = ({req}) => {
  const dispatch = useDispatch()
  const ui = useSelector(s => s.dynamic_ui)
  return(
    <>
    <Group separator="hide">
      <List>
        <Cell
            before={<Avatar src={req.image} size={48}/>}
            text="Игра"
            description={"Сыграно: " + req.playtime + " ч."}
            onClick = {() => dispatch(uiActions.push_route('people'))}>

             
          {req.name}
        </Cell>
      </List>
    </Group>
    </>
  )
}
 export default SteamAc;

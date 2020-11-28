import React from  'react'
import {FixedLayout, Button, List, Avatar, Cell, Group} from "@vkontakte/vkui";
import {useSelector, useDispatch} from "react-redux";
import {getSteamGameArray} from "../../store/games/actions";
import {useForm} from "react-hook-form";


const SteamKill = ({req}) => {
  const dispatch = useDispatch();

  const reqq = useSelector(s => s.games.addgame)
  const {register, getValues} = useForm();

  const onSubmit = data => {
    console.log(data)
    dispatch(getSteamGameArray.saga({...data}))
  }
  return(
    <>
    <Group separator="hide">
      <List>
        {Array.isArray(reqq) ? reqq.map((s, index) => (
          <Cell
            getRef={register({games: false})}
              selectable
              name={`array[${index}]`}
              before={<Avatar src={req.image} size={48}/>}
              text="Игра"
            description={"Сыграно: " + req.playtime + " ч."}
               >
            {req.name}
          </Cell>
        )) : ''}
      </List>
    </Group>
    <FixedLayout vertical="bottom">
        <Button
            stretched
            size="xl"
            onClick={()=> onSubmit(getValues()) }
            style={{width: '95%', margin: '0 auto'}}
        >Добавить игру</Button>
    </FixedLayout>
    </>
  )
}
 export default SteamKill;

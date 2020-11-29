import React from 'react'
import {Checkbox, FixedLayout, Button, List, Avatar, Cell, Group} from "@vkontakte/vkui";
import {useSelector, useDispatch} from "react-redux";
import {getSteamGameArray} from "../../store/games/actions";
import {useForm} from "react-hook-form";
import * as uiActions from '../../store/dynamicui/actions'


const SteamKill = ({reqs}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, getValues} = useForm(
        {defaultValues: {array: []}}
    );

    const onSubmit = (data) => {
        console.log(data)
        dispatch(getSteamGameArray.saga(data.array));
        // dispatch(uiActions.push_route('addGame/steam'))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Group separator="hide">
                <List>
                    {reqs ? reqs.map((req, index) => (

                        <Checkbox
                            getRef={register({required: false})}
                            name={`array[${req.game_id}]`}>
                            <Cell before={<Avatar src={req.image} size={48}/>}
                                  text="Игра"
                                  description={"Сыграно: " + req.playtime + " ч."}>

                                {req.name}
                            </Cell>

                        </Checkbox>
                    )) : ''}
                </List>
            </Group>
            <FixedLayout vertical="bottom">
                <Button
                    stretched
                    size="xl"
                    type={'button'}
                    onClick={() => onSubmit(getValues())}
                    style={{width: '95%', margin: '0 auto'}}
                >Добавить игру</Button>
            </FixedLayout>
        </form>
    )
}
export default SteamKill;

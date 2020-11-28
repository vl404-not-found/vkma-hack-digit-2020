import React, {useState, useEffect} from 'react';
import {
    ModalCard,
    ModalRoot,
    Button,
    Panel,
    PanelHeader,
    Group,
    Search,
    FixedLayout,
    View,
} from '@vkontakte/vkui'
import {List, SimpleCell, Avatar} from '@vkontakte/vkui'
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from '../../store/dynamicui/actions'
import {getSteamGameArray} from '../../store/games/actions'

const Game = ({id}) => {
    const [modal] = useState(null);
    const dispatch = useDispatch();
    const Games = useSelector(s => s.games.all);
    useEffect(()=>{dispatch(getSteamGameArray.saga())},[dispatch])

    const openBase = (
        <ModalRoot activeModal={modal}>

            <ModalCard id="faq">
                ...
            </ModalCard>
        </ModalRoot>

    )

    return (
        <Panel id={id}>
            <PanelHeader separator={false}>
                Игры
            </PanelHeader>
            <View modal={openBase}>
                <Search icon={
                    <div style={{display: "flex", marginRight: "80%"}}>
                        <div style={{margin: "7px"}}>
                              <Icon24Filter onClick={() => dispatch(uiActions.open_modal('selectgames'))}/>
                        </div>
                    </div>
                }/>
                <Group separator="hide">
                    <List>
                      {Array.isArray(Games) ? Games.map(game=>(
                        <SimpleCell
                            onClick={() => dispatch(uiActions.push_route('pageGame'))}
                            before={<Avatar src={game.image} size={48}/>}
                            text="Игра"
                        >
                            {game.name}
                        </SimpleCell>)) : ''
                       }
                    </List>
                </Group>
                <FixedLayout vertical="bottom">
                    <Button
                        stretched
                        size="xl"
                        style={{width: '95%', margin: '0 auto'}}
                        onClick={() => dispatch(uiActions.push_route('addGame/steam'))}
                    >Добавить игру</Button>
                </FixedLayout>
            </View>
        </Panel>
    )
}

export default Game;

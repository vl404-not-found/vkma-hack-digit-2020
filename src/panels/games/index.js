import React from 'react';
import {Panel, PanelHeader, Group } from '@vkontakte/vkui'
import GameComponent from './gameComponent'


const Game = ({id}) => {

    return (
        <Panel id={id}>
          <PanelHeader>
            Игры
          </PanelHeader>
          <Group separator = {true}>
            <GameComponent/>
          </Group>
        </Panel>

    )
};

export default Game;

import React from 'react'

import {Panel, Group,SimpleCell,Avatar,List } from '@vkontakte/vkui'



const GameComponent = ({id}) => {

    return (
        <Panel id={id}>
          <Group>
            <List>
              <SimpleCell
                  before={<Avatar src={('/ex/avatar.jpg')} size={48}/>}
                  text="Игра"
                >
                Название игры
              </SimpleCell>
            </List>
          </Group>
        </Panel>

    )
};

export default GameComponent;

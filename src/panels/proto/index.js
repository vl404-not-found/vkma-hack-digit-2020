import React from 'react';

import {Panel, PanelHeader} from '@vkontakte/vkui'


const Proto = ({id}) => {

    return (
        <Panel id={id}>
            <PanelHeader>
                Название экрана
            </PanelHeader>
            {/*тут твой уникальный код*/}
        </Panel>
    )
};

export default Proto;

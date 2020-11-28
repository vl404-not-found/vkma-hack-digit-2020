import React from 'react';

import {Panel, PanelHeader, Group, Avatar } from '@vkontakte/vkui'
import  {Cell, Switch, List} from '@vkontakte/vkui'
import  { SimpleCell }  from '@vkontakte/vkui'
import Icon24DocumentOutline from '@vkontakte/icons/dist/24/document_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import Icon28CommentOutline from '@vkontakte/icons/dist/28/comment_outline';
import Icon28AdvertisingOutline from '@vkontakte/icons/dist/28/advertising_outline';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import {useDispatch} from "react-redux";
import * as uiActions from '../../store/dynamicui/actions'



const Setting = ({id}) => {
const dispatch = useDispatch();

    return (
        <Panel id={id}>
          <PanelHeader>
            Настройки
          </PanelHeader>
          <Group>
            <SimpleCell
              description="Был в сети 34 минуты назад"
              before={<Avatar src={('/ex/avatar.jpg')} size={72}/>}
            >
              Михаил Лихачёв
            </SimpleCell>
          </Group>
          <Group description="Уведомления о успешном подборе игроков">
            <Cell asideContent={<Switch />}>
                Уведомления
            </Cell>
          </Group>
          <Group>
            <SimpleCell
                before={<Icon24DocumentOutline />}

                onClick = {() => dispatch(uiActions.push_route('dopsettings'))}
                text="Настроки"
              >
              Данные аккаунта
            </SimpleCell>
          </Group>
          <Group>
            <List>
              <SimpleCell expandable before={<Icon28UsersOutline />}>Официальное сообщество</SimpleCell>
              <SimpleCell expandable before={<Icon28CommentOutline />}>Беседа сообщества</SimpleCell>
              <SimpleCell expandable before={<Icon28AdvertisingOutline />}>Сообщить об ошибке</SimpleCell>
              <SimpleCell expandable before={<Icon28InfoOutline />}>Предложить идею</SimpleCell>
            </List>
          </Group>

        </Panel>
    )
};

export default Setting;

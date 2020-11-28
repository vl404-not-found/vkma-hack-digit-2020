import React, {useState, useEffect} from 'react';
import {
    Div,
    ModalCard,
    ModalPage,
    ModalRoot,
    Button,
    Panel,
    PanelHeader,
    Group,
    Search,
    FixedLayout,
    View,
} from '@vkontakte/vkui'
import {List, SimpleCell, Avatar, FormLayout, Select} from '@vkontakte/vkui'
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import {useDispatch, useSelector} from "react-redux";
import * as uiActions from '../../store/dynamicui/actions'
import {getSteamGame} from '../../store/requests/actions'

const RegSteam = ({id}) => {
  return(
    <Panel>
      <PanelHeader>
        ck cmdc
      </PanelHeader>
      <Button size="l" href="https://scripthub.ru/cyber_mini_apps/steam_auth.php?login">jijij</Button>
    </Panel>

  )
}

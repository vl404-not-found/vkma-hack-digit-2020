import React from  'react'
import {Separator, Placeholder, Button, Div, PanelHeader, Panel, SimpleCell, Title} from "@vkontakte/vkui";
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch, useSelector} from "react-redux";
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import Icon56UserAddOutline from '@vkontakte/icons/dist/56/user_add_outline';
import qs from 'qs'


const LinkAccount = ({id}) => {
  const dispatch = useDispatch();
  const ui = useSelector(s => s.dynamic_ui)

  return(
    <Panel id={id}>
    <PanelHeader separator={false}>
      <SimpleCell
          before={<Icon28ArrowLeftOutline />}
          onClick = {() => dispatch(uiActions.push_route('addGame'))}
          text="Настроки"
          level="2" weight="semibold"
        >
        Игры
      </SimpleCell>
    </PanelHeader>
          <Placeholder
            icon={<Icon56UserAddOutline />}
            header="Привяжите аккаунт Steam"
            action={<Button size="l" target={'_blank'} href={`https://scripthub.ru/cyber_mini_apps/steam_auth.php?login&${qs.stringify(ui.start_data)}`}>Привязать аккаунт</Button>}
          >
            Прикрипите аккаунт Steam, чтобы использовать сисистему поиска игроков
         </Placeholder>
        </Panel>
  )
}
export default LinkAccount;

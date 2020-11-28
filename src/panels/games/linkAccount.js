import React from  'react'
import {Separator, Placeholder, Button, Div, PanelHeader, Panel, SimpleCell, Title} from "@vkontakte/vkui";
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch} from "react-redux";
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import Icon56UserAddOutline from '@vkontakte/icons/dist/56/user_add_outline';

const LinkAccount = ({id}) => {
  const dispatch = useDispatch();
  // const ui = useSelector(s => s.dynamic_ui)

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
            action={<Button size="l" href="https://scripthub.ru/cyber_mini_apps/steam_auth_return.php?login">Привязать аккаунт</Button>}
          >
            Прикрипите аккаунт Steam, чтобы использовать сисистему поиска игроков
         </Placeholder>
        </Panel>
  )
}
export default LinkAccount;

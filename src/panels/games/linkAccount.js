import React from  'react'
import {Button, Div, PanelHeader, Panel, SimpleCell, Title} from "@vkontakte/vkui";
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch} from "react-redux";
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import Icon56UserAddOutline from '@vkontakte/icons/dist/56/user_add_outline';

const Link = ({id}) => {
  const dispatch = useDispatch();
  // const ui = useSelector(s => s.dynamic_ui)

  return(
    <Panel id={id}>
    <PanelHeader separator={false}>
      <SimpleCell
          before={<Icon28ArrowLeftOutline />}
          onClick = {() => dispatch(uiActions.push_route('addGame/playstation'))}
          text="Настроки"
          level="2" weight="semibold"
        >
        Игры
      </SimpleCell>
    </PanelHeader>
    <Div></Div>
    <Div></Div>
    <Div></Div>
    <Div></Div>
    <Div></Div>
    <Div style={{width:'296px', margin:'0 auto'}}  vertical="center" >
    <Icon56UserAddOutline style={{width:'100%', margin:'0 auto'}}/>
      <Title level="2" weight="semibold" style={{ textAlign:'center', marginBottom:'8px'}}>
      Привяжите аккаунт Playstation
      </Title>
      <Title style={{ textAlign:'center', color: 'gray', marginBottom:"24px"}}>
        Прикрипите аккаунт Playstation, чтобы использовать сисистему поиска игроков
      </Title>
      <Button size="xl">Привязать аккаунт</Button>
    </Div>
    </Panel>
  )
}
export default Link;

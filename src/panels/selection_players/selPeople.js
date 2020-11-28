import React from  'react'
import {Panel, PanelHeader, SimpleCell, Group} from "@vkontakte/vkui";
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import * as uiActions from '../../store/dynamicui/actions'
import {useDispatch} from "react-redux";

const SelPeo = ({req}) => {
  const dispatch = useDispatch()

  return(
    <>
    <Panel>
    <PanelHeader separator={false}>
      <SimpleCell
          before={<Icon28ArrowLeftOutline />}
          onClick = {() => dispatch(uiActions.push_route('selection'))}
          text="Настроки"
          level="2" weight="semibold"
        >
        Игры
      </SimpleCell>
    </PanelHeader>
    <Group separator="hide">

    </Group>
    </Panel>
    </>
  )
}
 export default SelPeo;

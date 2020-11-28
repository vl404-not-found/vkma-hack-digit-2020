import React from 'react';

import {Panel, PanelHeader, Group, SimpleCell, FormLayout, Select } from '@vkontakte/vkui'
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import {useDispatch} from "react-redux";
import * as uiActions from '../../store/dynamicui/actions'


const DopSetting = ({id}) => {
  const dispatch = useDispatch();

    return (
        <Panel id={id}>
          <PanelHeader>
            <SimpleCell
                before={<Icon28ArrowLeftOutline />}
                onClick = {() => dispatch(uiActions.push_route('settings'))}
                text="Настроки"
              >
              Настройки
            </SimpleCell>
          </PanelHeader>
          <Group>
            <FormLayout>
              <Select top="Микрофон" placeholder="Выберите наличие микрофона">
                <option value="m">1-ый микрофон</option>
                <option value="f">2-ой микрофон</option>
              </Select>
              <Select top="Модель микрофона" placeholder="Введите модель микрофона">
                <option value="m">1-ый микрофон</option>
                <option value="f">2-ой микрофон</option>
              </Select>
            </FormLayout>
          </Group>
        </Panel>
    )
};

export default DopSetting;

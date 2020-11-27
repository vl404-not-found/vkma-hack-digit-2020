// import React from 'react';
// import PropTypes from 'prop-types';
// import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
// import Button from '@vkontakte/vkui/dist/components/Button/Button';
// import Group from '@vkontakte/vkui/dist/components/Group/Group';
// // import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
// import Div from '@vkontakte/vkui/dist/components/Div/Div';
// import {useDispatch} from "react-redux";
// // import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
// // import {useDispatch, useSelector} from "react-redux";
// import * as uiActions from '../store/dynamicui/actions'
//
//
//
// const Home = ({id}) => {
//     // TODO: перенести логику в стор! ( очистить от вкшной хрени )
//     const dispatch = useDispatch();
//     // const {bridge , userData} = useSelector(s => s.vk_data);
//
//
//     // useEffect(()=> {
//     //     if (Object.keys(bridge).length > 0) {
//     //         dispatch(vkActions.userGet.saga())
//     //     }
//     // }, [dispatch, Object.keys(bridge).length, bridge])
//
//     return (
//         <Panel id={id}>
//             <PanelHeader>Example</PanelHeader>
//
//         </Panel>
//     )
// };
//
// Home.propTypes = {
//     id: PropTypes.string.isRequired,
//     fetchedUser: PropTypes.shape({
//         photo_200: PropTypes.string,
//         first_name: PropTypes.string,
//         last_name: PropTypes.string,
//         city: PropTypes.shape({
//             title: PropTypes.string,
//         }),
//     }),
// };
//
// export default Home;

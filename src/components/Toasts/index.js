import React from "react";
import {dismiss, ToastContainer} from 'react-toastify-redux';
import {Snackbar} from "@vkontakte/vkui";


const Toast = ({title, message, id}) => (
    <Snackbar
        layout="vertical"
        onClose={() => dismiss(id)}
    >
        { message }
    </Snackbar>
);



export default () => {
    return (
        <ToastContainer toastComponent={Toast}/>
    );
};

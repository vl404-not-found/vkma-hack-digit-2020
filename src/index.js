import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import {store} from './store/index'
import {Provider} from "react-redux";

// Init VK  Mini App
bridge.send("VKWebAppInit");

// const ex = ({children}) =>()

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}

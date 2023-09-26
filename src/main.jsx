import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				background: "dark",
			},
		}),
	},
});
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</Provider>
);

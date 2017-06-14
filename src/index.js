import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import "./index.css";
import store from './store.js'; // step 1 sends us to store.js

import App from "./components/App"; //step 6 imports App which calls mapStateToProps in App.js

// make sure to wrap the root file in a provider!!
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById( 'root' )
);

import React from "react";
import { Provider } from "react-redux";

import "./App.scss";

import store from "../redux/store";

import ActiveBuilds from "./ActiveBuilds";
import Repositories from "./Repositories";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="ActiveBuilds">
          <ActiveBuilds />
        </div>
        <div className="Repositories">
          <Repositories />
        </div>
      </div>
    </Provider>
  );
}

export default App;

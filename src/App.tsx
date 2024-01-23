import "./App.css";
import AuthVerify from "./providers/AuthVerify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Router from "./Routes/Router";
import store, { persistor } from "./Store/Slices";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthVerify>
          <Router />
        </AuthVerify>
      </PersistGate>
    </Provider>
  );
}

export default App;

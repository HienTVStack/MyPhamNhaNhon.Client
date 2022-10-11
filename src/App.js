import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/500.css";
import "@fontsource/josefin-sans/600.css";
import "@fontsource/josefin-sans/700.css";
import "./assets/css/customer-scroll.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import Router from "./routes";
import ThemeProvider from "./theme";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <ScrollToTop />
                <Router />
            </ThemeProvider>
        </Provider>
    );
}

export default App;

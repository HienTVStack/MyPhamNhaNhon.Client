import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/500.css";
import "@fontsource/josefin-sans/600.css";
import "@fontsource/josefin-sans/700.css";
import "./assets/css/customer-scroll.css";
import Router from "./routes";
import ThemeProvider from "./theme";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <ThemeProvider>
            <ScrollToTop />
            <Router />
        </ThemeProvider>
    );
}

export default App;

import Router from "./routes";
import ThemeProvider from "./theme";
import ScrollToTop from "./layouts/components/ScrollToTop";

function App() {
    return (
        <ThemeProvider>
            <ScrollToTop />
            <Router />
        </ThemeProvider>
    );
}

export default App;

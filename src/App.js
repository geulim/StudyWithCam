import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import NavBar from "./components/NavBarComponent";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              exact
              path={route.path}
              Component={route.component}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;

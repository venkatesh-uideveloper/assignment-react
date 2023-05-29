import { Routes, Outlet, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Sessions from "./Pages/Sessions/Sessions";
import NotFound from "./components/NotFound";
import News from "./Pages/News/News";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="news" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <header>
        <h1>Dashboard</h1>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/sessions">Sessions</NavLink>
            </li>
            <li>
              <NavLink to="/News">News</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default App;

// Importing: Router.
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Importing: Project components.
import Homepage from "./Homepage";
import Foobar from "./components/Foobar";
import RockScissorPaper from "./components/RockScissorPaper";

// Importing: Styles.
import "./App.css";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/foobar", element: <Foobar /> },
    { path: "/rockScissorsPaper", element: <RockScissorPaper /> },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

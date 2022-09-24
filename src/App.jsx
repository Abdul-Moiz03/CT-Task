import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Categories } from "./Pages/Categories";
import { Login } from "./Pages/Login";
import { PageNotFound } from "./Pages/PageNotFound";
import { PrivateRoutes } from "./PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" exact element={<Categories />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

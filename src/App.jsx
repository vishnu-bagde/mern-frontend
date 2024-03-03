import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Loader from "./component/Loader/Loader";
import HomeLayout from "./component/HomeLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <Loader />
    </>
  );
}

export default App;

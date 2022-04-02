import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Pages;

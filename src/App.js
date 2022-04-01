import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;

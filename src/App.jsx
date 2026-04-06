import { BrowserRouter, Routes } from "react-router-dom";

import { renderRoutes } from "./routes";
// import "antd/dist/reset.css";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App

import {Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalState";

import Home from "./Pages/Home.jsx";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </GlobalProvider>
  );
  
}

export default App;


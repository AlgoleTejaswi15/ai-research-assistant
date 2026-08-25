import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadPDF from "./pages/UploadPDF";
import Chat from "./pages/Chat";
import Summary from "./pages/Summary";
import History from "./pages/History";
import AskQuestion from "./pages/AskQuestion";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/upload" element={<UploadPDF />} />
        <Route path="/summary" element={<Summary />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/history" element={<History />}/>
        <Route path="/ask" element={<AskQuestion />}/>
        

      </Routes>

    </BrowserRouter>

  );
}

export default App;
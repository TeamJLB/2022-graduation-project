import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MeetingListPage } from "./pages/MeetingListPage";
import { HistoryPage } from "./pages/HistoryPage";
import { SummaryPage } from "./pages/HistoryPage";
import { MemoPage } from "./pages/HistoryPage";
import { RegisterPage } from "./pages/RegisterPage"
import { LoginPage } from "./pages/LoginPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meetingList" element={<MeetingListPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/summary" element={<SummaryPage />} />
        <Route path="/history/memo" element={<MemoPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

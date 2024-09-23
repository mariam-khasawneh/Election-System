import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";

//PAGES
import Home from "./Pages/Home";
import Statistics from "./Pages/Statistics";
import FAQs from "./Pages/FAQs";
import CandidateLists from "./Pages/CandidateLists";
import Messages from "./Pages/Messages";
import Results from "./Pages/ElectionResults";
import Members from "./Pages/Members";
import RequestDetails from "./Pages/RequestDetails";
import Users from "./Pages/users";
import Orders from "./Pages/Orders";
import VoteTable from "./Pages/VoteTable";
import LocalCandidateInfoPage from "./Pages/LocalCandidateInfoPage";
import TimerAdmin from "./Pages/Timer";
//PAGES

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Statistics />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/members" element={<Members />} />
          <Route path="/CandidateLists" element={<CandidateLists />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/results" element={<Results />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/request-details/:id" element={<RequestDetails />} />
          <Route path="/results" element={<Results />} />
          <Route path="/VoteTable" element={<VoteTable />} />
          <Route
            path="/local-candidate-info/:listId"
            element={<LocalCandidateInfoPage />}
          />

          <Route path="/TimerAdmin" element={<TimerAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Home } from "@mui/icons-material";
import Header from "./components/header";
import UserHome from "./page/user/user-home";
import Layout from "./components/layout";
import UserFaqs from "./page/user/user-faqs";
import UserCounsellorList from "./page/user/user-counsellor-list";
import CounsellorHome from "./page/counsellor/counsellor-home";
import CounsellorQuestionList from "./page/counsellor/counsellor-question-list";
import Login from "./page/public/login";
import Register from "./page/public/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userHome from "./page/user/user-home";

export default function App() {
  return (
    <>
      <BrowserRouter >
        <Layout >
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/faqs" element={<UserFaqs />} />
            <Route path="/counsellors" element={<UserCounsellorList />} />


            <Route path="/counsellor" element={<CounsellorHome />} />
            <Route path="/counsellor/question-list" element={<CounsellorQuestionList />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}
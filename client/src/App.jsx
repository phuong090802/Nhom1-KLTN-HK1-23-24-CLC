import UserHome from "./page/user/user-home";
import Layout from "./components/layout";
import UserFaqs from "./page/user/user-faqs";
import UserCounsellorList from "./page/user/user-counsellor-list";
import CounsellorHome from "./page/counsellor/counsellor-home";
import CounsellorQuestionList from "./page/counsellor/counsellor-question-list";
import Login from "./page/public/login";
import Register from "./page/public/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <>
      <BrowserRouter >
        <Layout >
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<Register />} />
            <Route path="/thu-vien-cau-hoi" element={<UserFaqs />} />
            <Route path="/danh-sach-tu-van-vien" element={<UserCounsellorList />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/counsellor" element={<CounsellorHome />} />
              <Route path="/counsellor/danh-sach-cau-hoi" element={<CounsellorQuestionList />} />
            </Route>

          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}
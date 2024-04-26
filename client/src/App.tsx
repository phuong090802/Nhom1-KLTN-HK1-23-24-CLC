import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AdminRoute, DepheadRoute, ProtectedRoute, UserRoute } from "./routes";

import HeaderLayout from "./template/header-layout";
import AppLayout from "./template/app-layout";

import CounsellorsPage from "./page/public/counsellors-page";
import FaqsPage from "./page/public/faqs-page/FaqsPage";
import HomePage from "./page/public/home-page";
import Login from "./page/public/login";
import NewsPage from "./page/public/news-page";
import Register from "./page/public/register";
import UserLayout from "./template/user-layout";

import AdminDepartment from "./page/admin/admin-department";
import AdminHome from "./page/admin/admin-home";
import AdminNews from "./page/admin/admin-news";
import AdminStaff from "./page/admin/admin-staff";

import DepheadHome from "./page/dephead/dephead-home";
import DepheadField from "./page/dephead/dephead-field";
import DepheadCounsellor from "./page/dephead/dephead-counsellor";
import DepheadFaq from "./page/dephead/dephead-faq";
import DepheadAnswer from "./page/dephead/dephead-answer";

import CounsellorQuestion from "./page/counsellor/counsellor-question";

import UserProfile from "./page/user/user-profile";
import PasswordChange from "./page/user/password-change";
import VerifyAccount from "./page/user/verify-account";
import History from "./page/user/history";

import TempComponent from "./TempComponent";

import { links } from "./constance";

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/temp" element={<TempComponent />} />
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/thu-vien-cau-hoi" element={<FaqsPage />} />
            <Route
              path="/danh-sach-tu-van-vien"
              element={<CounsellorsPage />}
            />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route element={<UserRoute />}>
              <Route path={links.user.profile} element={<UserProfile />} />
              <Route
                path={links.user.passwordChange}
                element={<PasswordChange />}
              />
              <Route path={links.user.verify} element={<VerifyAccount />} />
              <Route path={links.user.history} element={<History />} />
            </Route>
          </Route>

          <Route path="/dang-ky" element={<Register />} />
          <Route path="/dang-nhap" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/khoa" element={<AdminDepartment />} />
              <Route path="/admin/nhan-su" element={<AdminStaff />} />
              <Route path="/admin/tin-tuc" element={<AdminNews />} />
            </Route>

            <Route element={<DepheadRoute />}>
              <Route path="/dephead" element={<DepheadHome />} />
              <Route path="/dephead/linh-vuc" element={<DepheadField />} />
              <Route path="/dephead/nhan-su" element={<DepheadCounsellor />} />
              <Route path="/dephead/faqs" element={<DepheadFaq />} />
              <Route path="/dephead/cau-hoi" element={<CounsellorQuestion />} />
              <Route
                path="/dephead/duyet-cau-tra-loi"
                element={<DepheadAnswer />}
              />
            </Route>
          </Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;

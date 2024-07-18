import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  AdminRoute,
  CounsellorRoute,
  DepartmentHeadRoute,
  ProtectedRoute,
  SupervisorRoute,
  UserRoute,
} from "./routes";

import AppLayout from "./layout/app-layout";

import UserLayout from "./layout/user-layout";
import CounsellorsPage from "./page/public/counsellors-page";
import FaqsPage from "./page/public/faqs-page/FaqsPage";
import ForgotPassword from "./page/public/forgot-password";
import HomePage from "./page/public/home-page";
import Login from "./page/public/login";
import NewsPage from "./page/public/news-page";
import Register from "./page/public/register";

import AdminDepartment from "./page/admin/admin-department";
import AdminHome from "./page/admin/admin-home";
import AdminNews from "./page/admin/admin-news";
import AdminStaff from "./page/admin/admin-staff";
import AdminField from "./page/admin/admin-field";

import DepheadAnswer from "./page/dephead/dephead-answer";
import DepheadCounsellor from "./page/dephead/dephead-counsellor";
import DepheadFaq from "./page/dephead/dephead-faq";
import DepheadField from "./page/dephead/dephead-field";
import DepheadHome from "./page/dephead/dephead-home";

import CounsellorFeedback from "./page/counsellor/counsellor-feedback";
import CounsellorHome from "./page/counsellor/counsellor-home";
import CounsellorQuestion from "./page/counsellor/counsellor-question";

import History from "./page/user/history";
import PasswordChange from "./page/user/password-change";
import UserProfile from "./page/user/user-profile";
import VerifyAccount from "./page/user/verify-account";

import { links } from "./constance";

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* <Route path="/temp" element={<TempComponent />} /> */}
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
          <Route path="/quen-mat-khau" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/khoa" element={<AdminDepartment />} />
              <Route path="/admin/nhan-su" element={<AdminStaff />} />
              <Route path="/admin/tin-tuc" element={<AdminNews />} />
              <Route path="/admin/linh-vuc-chung" element={<AdminField />} />
            </Route>

            <Route element={<SupervisorRoute />}>
              <Route path="/supervisor" element={<AdminHome />} />
            </Route>

            <Route element={<DepartmentHeadRoute />}>
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
            <Route element={<CounsellorRoute />}>
              <Route path="/counsellor" element={<CounsellorHome />} />
              <Route
                path="/counsellor/cau-hoi"
                element={<CounsellorQuestion />}
              />
              <Route
                path="/counsellor/phan-hoi"
                element={<CounsellorFeedback />}
              />
            </Route>
          </Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;

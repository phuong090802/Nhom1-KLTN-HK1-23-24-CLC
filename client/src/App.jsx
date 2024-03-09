import UserHome from "./page/user/user-home";
import Layout from "./template/layout";
import UserFaqs from "./page/user/user-faqs";
import UserCounsellorList from "./page/user/user-counsellor-list";
import CounsellorHome from "./page/counsellor/counsellor-home";
import CounsellorQuestionList from "./page/counsellor/counsellor-question-list";
import Login from "./page/public/login";
import Register from "./page/public/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Temp from "./temp/components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CounsellorRoute from "./routes/CounsellorRoute";
import UserRoute from "./routes/UserRoute";
import DepHeadRoute from "./routes/DepHeadRoute";
import AdminRoute from "./routes/AdminRoute";
import SupervisorRoute from "./routes/SupervisorRoute";
import AdminHome from "./page/admin/admin-home";
import AdminLayout from "./template/admin-layout/AdminLayout";
import DataProvider from "./store/Store";
import AdminUser from "./page/admin/admin-user";
import AdminDepartment from "./page/admin/admin-department";
import StaffLayout from "./template/staff-layout";
import DepheadDashboard from "./page/dephead/dephead-dashboard";

export default function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <BrowserRouter >
        <DataProvider>
          <QueryClientProvider client={queryClient}>
            <Layout >
              <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/dang-nhap" element={<Login />} />
                <Route path="/dang-ky" element={<Register />} />
                <Route path="/thu-vien-cau-hoi" element={<UserFaqs />} />
                <Route path="/danh-sach-tu-van-vien" element={<UserCounsellorList />} />
                <Route path="/temp" element={<Temp />} />

                <Route element={<ProtectedRoute />}>
                  <Route element={<UserRoute />}>

                  </Route>

                  <Route element={<CounsellorRoute />}>
                    <Route path="/counsellor" element={<CounsellorHome />} />
                    <Route path="/counsellor/danh-sach-cau-hoi" element={<CounsellorQuestionList />} />
                  </Route>

                  <Route element={<DepHeadRoute />}>
                    <Route element={<StaffLayout />}>
                      <Route path="/department-head" element={<DepheadDashboard />} />
                    </Route>
                  </Route>

                  <Route element={<SupervisorRoute />}>

                  </Route>

                  <Route element={<AdminRoute />}>
                    <Route element={<StaffLayout />}>
                      <Route path="/admin" element={<AdminHome />} />
                      <Route path="/admin/dashboard" element={<AdminHome />} />
                      <Route path="/admin/nguoi-dung" element={<AdminUser />} />
                      <Route path="/admin/khoa" element={<AdminDepartment />} />
                      <Route path="/admin/tin-tuc" element={<AdminHome />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </Layout>
          </QueryClientProvider>
        </DataProvider>
      </BrowserRouter>
    </>
  )
}
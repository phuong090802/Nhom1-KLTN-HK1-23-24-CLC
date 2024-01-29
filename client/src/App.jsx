import { Home } from "@mui/icons-material";
import Header from "./components/header";
import UserHome from "./page/user/user_home";
import Layout from "./components/layout";
import UserFaqs from "./page/user/user_faqs";
import UserCounsellorList from "./page/user/user_counsellor_list/UserCounsellorList";

export default function App() {
  return (
    <>
      <Layout >
        {/* <UserHome /> */}
        {/* <UserFaqs /> */}
        <UserCounsellorList />
      </Layout>
    </>
  )
}
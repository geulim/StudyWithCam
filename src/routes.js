import BoardDetailPage from "./pages/BoardDetailPage";
import BoardPage from "./pages/BoardPage";
import CreateBoardPage from "./pages/CreateBoardPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import GroupListPage from "./pages/GroupListPage";
import HomePage from "./pages/HomePage";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import UpdateBoardPage from "./pages/UpdateBoardPage";
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/join",
    component: JoinPage,
  },
  {
    path: "/findId",
    component: FindIdPage,
  },
  {
    path: "/findPassword",
    component: FindPasswordPage,
  },
  {
    path: "/resetPassword",
    component: ResetPasswordPage,
  },
  {
    path: "/group",
    component: GroupListPage,
  },
  {
    path: "/group/create",
    component: CreateGroupPage,
  },
  {
    path: "/group/:group_id",
    component: GroupDetailPage,
  },
  {
    path: "/group/:group_id/board",
    component: BoardPage,
  },
  {
    path: "/group/:group_id/board/create",
    component: CreateBoardPage,
  },
  {
    path: "/group/:group_id/board/:board_id/update",
    component: UpdateBoardPage,
  },
  {
    path: "/group/:group_id/board/:board_id",
    component: BoardDetailPage,
  },
];

export default routes;

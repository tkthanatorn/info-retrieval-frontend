import { notifications } from "@mantine/notifications";
import { useQuery } from "react-query";
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { getUserAPI } from "../api";
import Home from "../page/home";
import Login from "../page/login";
import Register from "../page/register";
import { userIdState } from "../store";
import Bookmark from "../page/bookmark";

interface ICustomRoute {
  user_id: string | null;
  isLoading: boolean;
  redirectPath: string;
  children: JSX.Element;
}

const AuthRoute = ({
  user_id,
  isLoading,
  redirectPath,
  children,
}: ICustomRoute) => {
  if (isLoading) {
    return null;
  }

  if (!user_id) {
    return children;
  }

  return (
    <Navigate
      to={redirectPath}
      replace
    />
  );
};

const ProtectRoute = ({
  user_id,
  isLoading,
  redirectPath,
  children,
}: ICustomRoute) => {
  if (isLoading) {
    return null;
  }

  if (user_id) {
    return children;
  }

  return (
    <Navigate
      to={redirectPath}
      replace
    />
  );
};

const Router = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  useQuery(["user"], getUserAPI, {
    onSuccess: (resp) => {
      const result = resp.data.result;
      if (!resp.data.success || !result) {
        notifications.show({
          message: "result is empty",
          color: "red",
        });
        return;
      }

      setUserId(result.id);
    },
    onError: () => {
      notifications.show({
        message: "🚨 failed to get user session",
        color: "red",
      });
    },
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          index
          path=""
          element={
            <ProtectRoute
              isLoading={false}
              redirectPath="/auth/login"
              user_id={userId}
            >
              <Home />
            </ProtectRoute>
          }
        />

        <Route
          path="bookmark"
          element={
            <ProtectRoute
              isLoading={false}
              redirectPath="/auth/login"
              user_id={userId}
            >
              <Bookmark />
            </ProtectRoute>
          }
        />

        <Route
          path="auth"
          element={<Outlet />}
        >
          <Route
            path="login"
            element={
              <AuthRoute
                isLoading={false}
                redirectPath="/"
                user_id={userId}
              >
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="register"
            element={
              <AuthRoute
                isLoading={false}
                redirectPath="/"
                user_id={userId}
              >
                <Register />
              </AuthRoute>
            }
          />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;

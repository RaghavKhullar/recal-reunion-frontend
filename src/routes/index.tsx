import { routes } from "./routes";
import { userRoutes } from "./user.routes";
import { ProtectedRoutes } from "../components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages";
import { MetaDecoratedPage } from "../components";
import AppWrapper from "../components/AppWrapper/AppWrapper";
import { adminRoutes } from "./admin.routes";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppWrapper />}>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <MetaDecoratedPage
                    title={route.title}
                    description={route.description}
                    element={route.element}
                  />
                }
              >
                {route.children}
              </Route>
            );
          })}
          {adminRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoutes type="admin">
                    <MetaDecoratedPage
                      title={route.title}
                      description={route.description}
                      element={route.element}
                    />
                  </ProtectedRoutes>
                }
              >
                {route.children}
              </Route>
            );
          })}
          {userRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoutes type="user">
                    <MetaDecoratedPage
                      title={route.title}
                      description={route.description}
                      element={route.element}
                    />
                  </ProtectedRoutes>
                }
              >
                {route.children}
              </Route>
            );
          })}
        </Route>
        <Route
          path="*"
          element={
            <MetaDecoratedPage
              title="Not Found"
              description="This is the not found page of App"
              element={<NotFoundPage />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

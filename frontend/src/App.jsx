import DefaultLayout from "./layouts/DefaultLayout";
import { Routes, Route } from "react-router-dom";
import { routes } from "./route/index";
import { Fragment } from "react";
import RouteWrapper from "./route/RouteWrapper";
import ToastProvider from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.element;
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <RouteWrapper isPrivate={route.isPrivate}>
                  <Layout>
                    <Page />
                  </Layout>
                </RouteWrapper>
              }
            />
          );
        })}
      </Routes>
    </ToastProvider>
  );
}

export default App;

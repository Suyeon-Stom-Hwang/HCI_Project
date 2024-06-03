import { Navigate, createBrowserRouter } from "react-router-dom"
import App from "./App"
import MainPage from "./components/MainPage"
import SettingPage from "./components/SettingPage"

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "settings/:id",
        element: <SettingPage />,
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
])

export default Router
import { Navigate, createBrowserRouter } from "react-router-dom"
import App from "./App"
import MainPage from "./components/MainPage"
import SettingPage from "./components/SettingPage"
import SettingForm from "./components/SettingForm"

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
        path: "/settings/new",
        element: <SettingPage />,
      },
      {
        path: "/settings/:id",
        element: <SettingForm />,
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
])

export default Router
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { SettingProvider } from "./Contexts.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingProvider>
      <RouterProvider router={Router} />
    </SettingProvider>
  </React.StrictMode>,
)

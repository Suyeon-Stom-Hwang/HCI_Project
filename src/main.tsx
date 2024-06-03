import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { ContextProvider } from "./Contexts.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={Router} />
    </ContextProvider>
  </React.StrictMode>,
)

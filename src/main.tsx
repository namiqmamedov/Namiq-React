import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "bootswatch/dist/sketchy/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React from 'react'

export const router = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

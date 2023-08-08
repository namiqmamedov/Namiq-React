import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "bootswatch/dist/sketchy/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/configureStore.ts';

export const router = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

import SignIn from "./pages/SignIn";
import Root from "./pages/Root";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/Home";
import Basket from "./pages/Basket"
import Registrar from "./pages/Registrar"
import { ThemeProvider } from '@mui/material/styles';
import theme from "./PageTheme";
import FavoritesPage from './pages/FavoritesPage';
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route></Route>
      <Route index element={<SignIn />} />
      <Route path="registrar" element={<Registrar />} />
      <Route path="/" element={<Root />}>
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/basket" element={<ProtectedRoute> <Basket /> </ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute> <FavoritesPage /> </ProtectedRoute>} />
      </Route>
    </Route>

  )
);


export default function MyApp() {
  

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>

    </>
  )
}
import { RouteProps } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

export const publicRoutes: RouteProps[] = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
];
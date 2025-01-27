import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Register from "@pages/Register";
import Login from "@pages/Login";
import Profile from "@components/settings/Profile";
import {
    ProtectedWrapper,
    UnauthorizedWrapper,
} from "@components/auth/RouteAuth";
import Settings from "@pages/Settings";
import { ToastProvider } from "@contexts/ToastContext";
import { AuthProvider } from "@contexts/AuthContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <ToastProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route
                                path="/register"
                                element={
                                    <UnauthorizedWrapper>
                                        <Register />
                                    </UnauthorizedWrapper>
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <UnauthorizedWrapper>
                                        <Login />
                                    </UnauthorizedWrapper>
                                }
                            />
                            <Route path="/" element={<div>Home Page</div>} />
                            <Route
                                path="settings"
                                element={
                                    <ProtectedWrapper>
                                        <Settings />
                                    </ProtectedWrapper>
                                }
                            >
                                <Route path="profile" element={<Profile />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ToastProvider>
        </AuthProvider>
    </StrictMode>
);

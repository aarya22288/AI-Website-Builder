import { Routes, Route } from "react-router-dom";

import { Layout, GuestLayout } from "./pages/LayoutPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";

function App() {
    return (
        <Routes>

            {/* Guest Routes */}
            <Route element={<GuestLayout />}>

                <Route
                    path="/login"
                    element={<AuthPage mode="login" />}
                />

                <Route
                    path="/register"
                    element={<AuthPage mode="register" />}
                />

            </Route>

            {/* Protected Routes */}
            <Route element={<Layout />}>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/builder/:id"
                    element={<BuilderPage />}
                />

                <Route
                    path="/preview/:id"
                    element={<PreviewPage />}
                />

            </Route>

        </Routes>
    );
}

export default App;
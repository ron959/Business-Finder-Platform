import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AppSidebar } from "./components/AppSideBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { MyBusiness } from "./pages/MyBusiness";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppLayout />
      </Router>
    </QueryClientProvider>
  );
}

function AppLayout() {
  const location = useLocation();

  // Routes where the sidebar should be hidden
  const hideSidebarRoutes = ["/login", "/signup"];

  // Check if the current route is one where the sidebar should be hidden
  const isSidebarHidden = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {isSidebarHidden ? (
                    <AuthProvider>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
                      </AuthProvider>

      ) : (
        <SidebarProvider>
                              <AuthProvider>

          <div className="flex">
            <AppSidebar />
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-business" element={<MyBusiness />} />
              </Routes>
            </div>
          </div>
          </AuthProvider>

        </SidebarProvider>
      )}
    </>
  );
}

export default App;

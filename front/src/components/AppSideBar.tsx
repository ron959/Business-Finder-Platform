import { NavLink, useNavigate } from "react-router-dom";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useMutation, useQueryClient } from "@tanstack/react-query"; // React Query
import { logout } from "../services/signinService"; // Logout service
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/", // Update URLs to match your routes
    icon: Home,
  },
  {
    title: "My business",
    url: "/my-business",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { token, clearToken } = useAuth(); // Access AuthContext
  const queryClient = useQueryClient(); // React Query client
  const navigate = useNavigate();

  // Logout mutation
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      clearToken(); // Clear token from AuthContext
      queryClient.invalidateQueries(["auth"]); // Invalidate auth-related queries
      console.log("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Render other menu items */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Add Logout/Login menu item */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  {token ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 rounded text-gray-700 hover:bg-gray-100"
                      disabled={logoutMutation.isLoading}
                    >
                      {logoutMutation.isLoading ? "Logging out..." : "Logout"}
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className="flex items-center gap-2 p-2 rounded text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </NavLink>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (session?.user) {
      // Map NextAuth session user to our app's user structure
      setUser({
        ...session.user,
        role: session.user.role || 'fan', // Default role if not present
        // Add other mapped properties if needed
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (username, password) => {
    try {
      // Try to login via NextAuth credentials provider
      // This will eventually call our backend API if configured in [...nextauth].js
      const result = await signIn('credentials', {
        redirect: false,
        email: username,
        password: password
      });

      if (result?.error) {
        console.error("Login failed:", result.error);
        return { success: false, error: result.error };
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: 'An unexpected error occurred during login.' };
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setUser(null);
  };

  const register = async (userData) => {
    // Registration should be handled by a separate API endpoint that creates the user in Supabase
    // For now, we'll just return a placeholder error or redirect
    console.log("Registration not yet implemented via AuthContext, use API endpoint");
    return { success: false, error: "Please use the registration page" };
  };

  const updateProfile = (profileData) => {
    // This would typically call an API endpoint to update the user profile
    console.log("Update profile:", profileData);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    isAdmin,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

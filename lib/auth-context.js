import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin'
  };

  // Mock user stats for admin dashboard
  const ADMIN_USER_DATA = {
    id: 1,
    username: 'admin',
    role: 'admin',
    stats: {
      theoriesPosted: 42,
      upvotes: 1337,
      commentsReceived: 256,
      followers: 89,
      following: 34,
      joinedDate: '2023-01-15'
    },
    profile: {
      bio: 'Administrator of Shonen Ark - Keeper of theories and master of the anime realm.',
      favoriteAnime: ['One Piece', 'Naruto', 'Attack on Titan', 'Demon Slayer'],
      badges: ['Theory Master', 'Community Leader', 'Early Adopter', 'Verified Creator']
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('shonenark_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('shonenark_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData = ADMIN_USER_DATA;
      setUser(userData);
      localStorage.setItem('shonenark_user', JSON.stringify(userData));
      setIsLoading(false);
      return { success: true, user: userData };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shonenark_user');
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, just create a basic user
    const newUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      role: 'fan',
      stats: {
        theoriesPosted: 0,
        upvotes: 0,
        commentsReceived: 0,
        followers: 0,
        following: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      },
      profile: {
        bio: '',
        favoriteAnime: [],
        badges: ['New Member']
      }
    };
    
    setUser(newUser);
    localStorage.setItem('shonenark_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true, user: newUser };
  };

  const updateProfile = (profileData) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...profileData
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('shonenark_user', JSON.stringify(updatedUser));
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

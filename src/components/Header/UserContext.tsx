import React, { createContext, useState, ReactNode } from 'react';
import UserProfileimage from '../../../src/images/user/user-03.png'
interface UserProfile {
  username: string;
  email: string;
  photo: string; // URL of the photo
}

interface UserContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    username: 'john24',
    email: 'john45@gmail.com',
    photo: 'UserProfileimage', // Default photo path
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

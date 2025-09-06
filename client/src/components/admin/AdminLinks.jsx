import { useUser } from '@clerk/clerk-react';

const AdminLinks = ({ children }) => {
  const { user } = useUser();
  
  // Admin credentials
  const ADMIN_CLERK_ID = 'user_2vLXDdBNkHqwzieoobMt4NhLqJY';
  const ADMIN_EMAIL = 'thitikorn.thanomsup@gmail.com';
  
  // Check if user is admin
  const isAdmin = user?.id === ADMIN_CLERK_ID || user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;
  
  if (!isAdmin) {
    return null;
  }
  
  return children;
};

export default AdminLinks;

import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from './store/user';

export const AuthWrapper = () => {
  const store = useStore();

  const { user, loading } = store;

  const isConfirmed = !!user?.token;

  const isNotAuthed = !loading && (!user || !isConfirmed);

  if (isNotAuthed) {
    return <Navigate to="/" />;
  }

  if (loading || isNotAuthed) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

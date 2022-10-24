import React from 'react';
import { Outlet } from 'react-router';
import { useLogin } from '../api/endpoints';
import { LoginRequest } from '../api/model';
import { clearUser, saveUser } from '../auth';
import { useStore } from '../store/user';

const users: LoginRequest[] = [
  { email: 'user@central.com', password: 'user' },
  { email: 'admin@central.com', password: 'admin' },
];

/**
 * Global layout.
 */
export default function Layout() {
  const store = useStore();

  const { user } = store;

  const login = useLogin({
    mutation: {
      onSuccess: (response) => {
        saveUser(response);
      },
    },
  });

  if (login.isLoading) {
    return <header>Loading...</header>;
  }

  const headerContent = (() => {
    if (login.isLoading) return 'Loading...';
    if (user) {
      return (
        <>
          <strong>You are now logged in</strong>
          <div className="ml-auto flex items-center space-x-2">
            <div>
              <em>email: </em>
              {user.email}
              <br />
              <em>role: </em>
              {user.role}
            </div>
            <button
              className="btn"
              onClick={() => {
                clearUser();
              }}
            >
              Logout
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <strong>You are not logged in</strong>
        <div className="space-x-3 mt-2 ml-auto">
          <span>Login as:</span>
          {users.map((user) => (
            <button
              key={user.email}
              className="btn"
              onClick={() =>
                login.mutateAsync({
                  data: user,
                })
              }
            >
              {user.email}
            </button>
          ))}
        </div>
      </>
    );
  })();

  return (
    <>
      <header>{headerContent}</header>
      <main className="m-2">
        <Outlet />
      </main>
    </>
  );
}

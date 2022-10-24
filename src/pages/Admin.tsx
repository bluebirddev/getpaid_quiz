import React from 'react';
import { Link } from 'react-router-dom';

import { useGetAllTodos } from '../api/endpoints';
import Todos from '../components/Todos';

const Admin = () => {
  const todos = useGetAllTodos();

  return (
    <div>
      {todos?.data && <Todos todos={todos.data} />}
      <div className="mt-10">
        <Link to="/" className="underline">
          Go /home
        </Link>
      </div>
    </div>
  );
};

export default Admin;

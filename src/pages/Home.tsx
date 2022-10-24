import React from 'react';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreateTodo, useGetTodos } from '../api/endpoints';
import Todos from '../components/Todos';
import { useStore } from '../store/user';

const Home = () => {
  const store = useStore();
  const [todo, setTodo] = useState('');
  const { user } = store;
  const todos = useGetTodos({
    query: {
      enabled: !!user,
    },
  });

  const createTodo = useCreateTodo({
    mutation: {
      onSuccess: () => {
        todos.refetch();
      },
    },
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!todo) return;

    createTodo.mutateAsync({
      data: {
        description: todo,
      },
    });

    setTodo('');
  }

  return (
    <div>
      {todos?.data && <Todos todos={todos.data} />}
      <div className="border border-gray-200 p-2 mb-2 rounded w-64">
        <h2>Create Todo:</h2>
        <form onSubmit={onSubmit}>
          <input value={todo} className="my-2" onChange={(event) => setTodo(event.target.value)} />
          <button type="submit" className="btn">
            Create
          </button>
        </form>
      </div>
      <div className="mt-10">
        <Link to="/admin" className="underline">
          Go to /admin
        </Link>
      </div>
    </div>
  );
};

export default Home;

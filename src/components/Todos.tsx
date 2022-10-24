import React from 'react';
import { TodoResponse } from '../api/model';

/**
 * Generic component to display "Todos"
 */
export default function Todos({ todos }: { todos: TodoResponse[] }) {
  return (
    <div className="border border-gray-200 p-2 mb-2 rounded">
      <h2>Todos:</h2>
      <ul className="list-outside list-disc ml-6">
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.description} - <span className="text-xs text-gray-700">{todo.userEmail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

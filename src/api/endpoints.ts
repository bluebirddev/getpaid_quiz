/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * central_api
 * OpenAPI spec version: 1.0.0
 */
import { useQuery, useMutation } from 'react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from 'react-query';
import type {
  LoginResponse,
  LoginRequest,
  TodoResponse,
  Todo,
  CreateTodoRequest,
  User,
} from './model';
import { customInstance } from './axios-instance';

/**
 * This is a longer description on how to login
 * @summary Login here!
 */
export const login = (loginRequest: LoginRequest) => {
  return customInstance<LoginResponse>({
    url: `/auth/login`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: loginRequest,
  });
};

export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>;
export type LoginMutationBody = LoginRequest;
export type LoginMutationError = unknown;

export const useLogin = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof login>>,
    TError,
    { data: LoginRequest },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof login>>, { data: LoginRequest }> = (
    props
  ) => {
    const { data } = props ?? {};

    return login(data);
  };

  return useMutation<Awaited<ReturnType<typeof login>>, TError, { data: LoginRequest }, TContext>(
    mutationFn,
    mutationOptions
  );
};

/**
 * Ping .. pong
 */
export const classHeartbeat = (signal?: AbortSignal) => {
  return customInstance<string>({ url: `/heartbeat`, method: 'get', signal });
};

export const getClassHeartbeatQueryKey = () => [`/heartbeat`];

export type ClassHeartbeatQueryResult = NonNullable<Awaited<ReturnType<typeof classHeartbeat>>>;
export type ClassHeartbeatQueryError = unknown;

export const useClassHeartbeat = <
  TData = Awaited<ReturnType<typeof classHeartbeat>>,
  TError = unknown
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof classHeartbeat>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getClassHeartbeatQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof classHeartbeat>>> = ({ signal }) =>
    classHeartbeat(signal);

  const query = useQuery<Awaited<ReturnType<typeof classHeartbeat>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

export const getTodos = (signal?: AbortSignal) => {
  return customInstance<TodoResponse[]>({ url: `/todo`, method: 'get', signal });
};

export const getGetTodosQueryKey = () => [`/todo`];

export type GetTodosQueryResult = NonNullable<Awaited<ReturnType<typeof getTodos>>>;
export type GetTodosQueryError = unknown;

export const useGetTodos = <
  TData = Awaited<ReturnType<typeof getTodos>>,
  TError = unknown
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTodos>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetTodosQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTodos>>> = ({ signal }) =>
    getTodos(signal);

  const query = useQuery<Awaited<ReturnType<typeof getTodos>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * Gets all todos (admin feature)
 */
export const createTodo = (createTodoRequest: CreateTodoRequest) => {
  return customInstance<Todo>({
    url: `/todo`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: createTodoRequest,
  });
};

export type CreateTodoMutationResult = NonNullable<Awaited<ReturnType<typeof createTodo>>>;
export type CreateTodoMutationBody = CreateTodoRequest;
export type CreateTodoMutationError = unknown;

export const useCreateTodo = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createTodo>>,
    TError,
    { data: CreateTodoRequest },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createTodo>>,
    { data: CreateTodoRequest }
  > = (props) => {
    const { data } = props ?? {};

    return createTodo(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof createTodo>>,
    TError,
    { data: CreateTodoRequest },
    TContext
  >(mutationFn, mutationOptions);
};

export const getUsers = (signal?: AbortSignal) => {
  return customInstance<User[]>({ url: `/todo/users`, method: 'get', signal });
};

export const getGetUsersQueryKey = () => [`/todo/users`];

export type GetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>;
export type GetUsersQueryError = unknown;

export const useGetUsers = <
  TData = Awaited<ReturnType<typeof getUsers>>,
  TError = unknown
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUsersQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({ signal }) =>
    getUsers(signal);

  const query = useQuery<Awaited<ReturnType<typeof getUsers>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * Gets all todos (admin feature)
 */
export const getAllTodos = (signal?: AbortSignal) => {
  return customInstance<TodoResponse[]>({ url: `/todo/all`, method: 'get', signal });
};

export const getGetAllTodosQueryKey = () => [`/todo/all`];

export type GetAllTodosQueryResult = NonNullable<Awaited<ReturnType<typeof getAllTodos>>>;
export type GetAllTodosQueryError = unknown;

export const useGetAllTodos = <
  TData = Awaited<ReturnType<typeof getAllTodos>>,
  TError = unknown
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAllTodos>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllTodosQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllTodos>>> = ({ signal }) =>
    getAllTodos(signal);

  const query = useQuery<Awaited<ReturnType<typeof getAllTodos>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

export function useList() {
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);

  const {
    data,
    isLoading: areTodosLoading,
    isError: hasTodosError,
  } = useTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const addTodo = (text: string) => {
    const todo = parseMedia(sanitizeText(text));
    return addTodo(todo).catch(handleApiError);
  };

  const deleteTodo = (id: number) => deleteTodo(id).catch(handleApiError);

  const completeTodo = (id: number) =>
    updateTodo({ id, completed: true }).catch(handleApiError);

  const toggleSelectedTodo = (id: number) => {
    setSelectedTodos((prevSelectedTodos) => {
      if (prevSelectedTodos.includes(id)) {
        return prevSelectedTodos.filter((selectedTodo) => selectedTodo !== id);
      }
      return [...prevSelectedTodos, id];
    });
  };

  return {
    todos: data,
    selectedTodos,
    isLoading: areTodosLoading,
    isError: hasTodosError,
    actions: {
      addTodo,
      deleteTodo,
      updateTodo,
      completeTodo,
      toggleSelectedTodo,
    },
  };
}

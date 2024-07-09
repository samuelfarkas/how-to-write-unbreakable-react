import { useState } from "react";

export function TodoList() {
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  const {
    data,
    isLoading: areTodosLoading,
    isError: hasTodosError,
  } = useTodosQuery();

  const [addTodo, { isLoading: isAddTodoLoading }] = useAddTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading }] =
    useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdateTodoLoading }] =
    useUpdateTodoMutation();

  const handleAddTodo = (text: string) => {
    const todo = parseMedia(sanitizeText(text));
    return addTodo(todo).catch(handleApiError);
  };

  const handleDeleteTodo = (id: number) => deleteTodo(id).catch(handleApiError);
  const handleCompleteTodo = (id: number) =>
    updateTodo({ id, completed: true }).catch(handleApiError);

  const handleSelectTodo = (ids: number[]) => {
    setSelectedTodos((prevSelectedTodos) => {
      if (ids.length > 1) {
        return ids;
      }
      if (
        prevSelectedTodos.some((selectedTodo) => selectedTodo.id === ids[0])
      ) {
        return prevSelectedTodos.filter(
          (selectedTodo) => selectedTodo.id !== ids[0],
        );
      }

      return [...prevSelectedTodos, ...ids];
    });
  };

  return (
    <>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <List
        data={data}
        onCompleted={handleCompleteTodo}
        onDeleted={handleDeleteTodo}
        onSelect={handleSelectTodo}
      />
    </>
  );
}

function useTodosQuery(): { data: any; isLoading: any; isError: any } {
  throw new Error("Function not implemented.");
}
function useAddTodoMutation(): [any, { isLoading: any }] {
  throw new Error("Function not implemented.");
}
function useDeleteTodoMutation(): [any, { isLoading: any }] {
  throw new Error("Function not implemented.");
}
function useUpdateTodoMutation(): [any, { isLoading: any }] {
  throw new Error("Function not implemented.");
}
function sanitizeText(text: string) {
  throw new Error("Function not implemented.");
}

function parseMedia(arg0: void) {
  throw new Error("Function not implemented.");
}

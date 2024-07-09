import { useState } from "react";

export function TodoList() {
  const { todos, selectedTodos, actions, isLoading, isError } = useList();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <AddTodoForm onAddTodo={actions.addTodo} />
      <List
        data={todos}
        selectedTodosIds={selectedTodos}
        onCompleted={actions.completeTodo}
        onDeleted={actions.deleteTodo}
        onSelect={actions.toggleSelectedTodo}
      />
    </>
  );
}

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/todos";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  const [todoInput, setTodoInput] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState<Error>();

  useEffect(() => {
    fetch(API_URL).then((response) => {
      response
        .json()
        .then((data) => {
          setTodos(data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error: {hasError.message}</div>;
  }

  const update = ({
    action,
    title,
    id,
  }: {
    action: "DELETE" | "ADD" | "COMPLETED";
    title?: string;
    id?: number;
  }) => {
    if (action === "DELETE") {
      fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 1 }),
      })
        .then(() => {
          setTodos(todos.filter((todo) => todo.completed));
        })
        .catch((e) => {
          setError(e);
        });
    } else if (action === "ADD" && title) {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.replace(/<[^>]*>?/gm, "") }),
      })
        .then(async (response) => {
          setTodos([
            ...todos,
            { id: (await response.json()).data.id, title, completed: false },
          ]);
        })
        .catch((e) => {
          setError(e);
        });
    } else if (action === "COMPLETED" && id) {
      fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed: true }),
      })
        .then(() => {
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, completed: true } : todo,
            ),
          );
        })
        .catch((e) => {
          setError(e);
        });
    }
  };

  const select = (todo: Todo | Todo[]) => {
    setSelectedTodos((prevSelectedTodos) => {
      if (Array.isArray(todo)) {
        return todo;
      }

      if (
        prevSelectedTodos.some((selectedTodo) => selectedTodo.id === todo.id)
      ) {
        return prevSelectedTodos.filter(
          (selectedTodo) => selectedTodo.id !== todo.id,
        );
      }

      return [...prevSelectedTodos, todo];
    });
  };

  return (
    <>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button
        onClick={() =>
          update({
            action: "ADD",
            title: todoInput,
          })
        }
      >
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={selectedTodos.some(
                (selectedTodo) => selectedTodo.id === todo.id,
              )}
              onChange={() => select(todo)}
            />
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                update({
                  action: "COMPLETED",
                  id: todo.id,
                })
              }
            />
            <button
              onClick={() =>
                update({
                  action: "DELETE",
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

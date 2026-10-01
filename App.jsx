import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

  const clearCompleted = () => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !todo.completed)
    );
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="app">
      <div className="todo-container">
        <header className="todo-header">
          <h1>My Todo List</h1>
          <p>Stay organized and get things done.</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <div className="todo-info">
          <span>
            {remainingTodos} {remainingTodos === 1 ? "task" : "tasks"} remaining
          </span>

          {todos.some((todo) => todo.completed) && (
            <button onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;

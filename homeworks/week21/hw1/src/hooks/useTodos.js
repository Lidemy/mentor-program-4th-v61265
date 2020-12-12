import { useState, useEffect, useRef } from "react";
import useInput from "./useInput";

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

export default function useTodos() {
  const { value, setValue, handleChange } = useInput();
  const [filter, setFilter] = useState("all");
  const id = useRef(1);

  const [todos, setTodos] = useState(() => {
    let temp = window.localStorage.getItem("todos") || [];
    const todoData = JSON.parse(temp);
    id.current = todoData[0] ? todoData[0].id + 1 : 1;

    return todoData;
  });

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = () => {
    if (!value) return alert("請輸入內容～");
    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false,
        isEditing: false,
      },
      ...todos,
    ]);
    setValue("");
    id.current++;
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const renderAll = () => setFilter("all");
  const renderDone = () => setFilter("done");
  const renderUndone = () => setFilter("undone");

  const handleUpdateTodo = (todo, e) => {
    setTodos(
      todos.map((item) => {
        if (item.id !== todo.id) return item;
        return {
          ...item,
          isEditing: !item.isEditing,
        };
      })
    );
  };

  const handleEditChange = (id, e) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          content: e.target.value,
        };
      })
    );
  };

  return {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    handleDeleteAll,
    renderAll,
    renderDone,
    renderUndone,
    handleUpdateTodo,
    handleEditChange,
    value,
    filter,
    handleChange,
  };
}

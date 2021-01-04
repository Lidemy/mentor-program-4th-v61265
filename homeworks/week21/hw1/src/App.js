import styled from "styled-components";
import "./App.css";
import TodoItem from "./compopent/TodoItem";
import useTodos from "./hooks/useTodos";
import PropTypes from "prop-types";

const Container = styled.div`
  background: rgba(246, 217, 152, 0.7);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 40px;
  border-radius: 20px;

  h1 {
    color: ${(props) => props.theme.colors.blue_1};
    text-align: center;
  }

  input {
    width: 98%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid ${(props) => props.theme.colors.blue_1};
    color: ${(props) => props.theme.colors.blue_1};
    border-radius: 5px;
  }

  button {
    padding: 5px;
    background: white;
    border: 1px solid ${(props) => props.theme.colors.blue_1};
    color: ${(props) => props.theme.colors.blue_1};
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.colors.blue_1};
      color: ${(props) => props.theme.colors.yellow_1};
    }
  }

  .addTodo {
    width: 100%;
    font-size: 16px;
    margin: 10px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  button + button {
    margin-left: 5px;
  }
`;

function App() {
  const {
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
    filter,
    handleChange,
    value,
  } = useTodos();

  return (
    <Container>
      <h1>TODO LIST</h1>
      <input
        type='text'
        placeholder='todo'
        value={value}
        onChange={handleChange}
      />
      <button className='addTodo' onClick={handleAddTodo}>
        Add todo
      </button>
      {todos
        .filter((todo) => {
          if (filter === "all") return todo;
          if (filter === "done") return todo.isDone;
          return !todo.isDone;
        })
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsDone={handleToggleIsDone}
            handleUpdateTodo={handleUpdateTodo}
            handleEditChange={handleEditChange}
          />
        ))}
      <ButtonWrapper>
        <div>
          <button onClick={renderAll}>全部</button>
          <button onClick={renderDone}>已完成</button>
          <button onClick={renderUndone}>未完成</button>
        </div>
        <div>
          <button onClick={handleDeleteAll}>清空全部</button>
        </div>
      </ButtonWrapper>
    </Container>
  );
}

App.propTypes = {
  todos: PropTypes.array,
  handleAddTodo: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
  handleDeleteAll: PropTypes.func,
  renderAll: PropTypes.func,
  renderDone: PropTypes.func,
  renderUndone: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
  handleEditChange: PropTypes.func,
  filter: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

export default App;

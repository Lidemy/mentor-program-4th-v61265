import styled from "styled-components";
import PropTypes from "prop-types";

const TodoItemWrapper = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.blue_1};
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;
const TodoButtonWrapper = styled.div`
  min-width: 150px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  height: 30px;
`;

const TodoContent = styled.div`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
  color: ${(props) => props.theme.colors.blue_1};
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const Button = styled.button`
  display: absolute;
  right: 0px;

  & + & {
    margin-left: 5px;
  }
`;

const EditTodo = styled.input`
  max-width: 400px;
  padding: 2px;
`;

function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
  handleUpdateTodo,
  handleEditChange,
}) {
  return (
    <TodoItemWrapper>
      {!todo.isEditing && (
        <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      )}
      {todo.isEditing && (
        <EditTodo
          value={todo.content}
          onChange={(e) => handleEditChange(todo.id, e)}
        />
      )}
      <TodoButtonWrapper>
        {!todo.isDone && (
          <Button onClick={() => handleUpdateTodo(todo)}>編輯</Button>
        )}
        {!todo.isEditing && (
          <Button
            onClick={() => {
              handleToggleIsDone(todo.id);
            }}
          >
            {todo.isDone ? "未完成" : "已完成"}
          </Button>
        )}
        <Button onClick={() => handleDeleteTodo(todo.id)}>刪除</Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool,
    isEditing: PropTypes.bool,
  }),
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
  handleDeleteAll: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
  handleEditChange: PropTypes.func,
};

export default TodoItem;

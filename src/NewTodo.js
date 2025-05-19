import logo from './logo.svg';
import './NewTodo.css';

function NewTodo(props) {
  return (
    <div id="addToDo">
                <p>Add ToDo</p>
                <form id="toDoForm" onSubmit={props.addToDo}>
                    <label>ToDo Description: <input type="text" id="Description"/></label>
                    <button type="submit">Submit</button>
                </form>
            </div>
  );
}

export default NewTodo;
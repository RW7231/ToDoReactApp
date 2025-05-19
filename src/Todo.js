import { useState } from 'react';
import logo from './logo.svg';
import './Todo.css';


function Todo(props) {
  return (
    <div className="ToDo" id={props.id}>
      <strong>"Complete?"</strong>
      <input type="checkbox" className="checkBox" checked={props.completed} onClick={props.completeToDo}/>
      <p>{props.text}</p>
      <input type="button" className="RemoveButton" value="Delete" onClick={props.removeToDo}/>
    </div>
  );
}

export default Todo;
import { useState } from 'react';
import logo from './logo.svg';
import './SortBy.css';


function SortBy(props) {
  return (
    <div className="SortBy">
      <p>Sort Todos by:</p>
      <div>
        <input type="button" value="Alphabetical" onClick={props.sortAlpha}/>
        <input type="button" value="Created Date" onClick={props.sortCreation}/>
        <input type="button" value="Completion" onClick={props.sortComplete}/>
      </div>
    </div>
  );
}

export default SortBy;
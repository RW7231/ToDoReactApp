import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
import SortBy from './SortBy';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const key = process.env.REACT_APP_API_KEY;

  //website uses the palette found here: https://www.canva.com/colors/color-palettes/rabbit-in-grass/

  const [todos, setTodos] = useState([]);

  //call this when the site starts
  useEffect(() => {
    //we only care when the array is empty, otherwise it will override sorting
    if(todos.length == 0){
      let xhttp = new XMLHttpRequest();
      let url = "https://cse204.work/todos"

      //call up the server and get the todos
      xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
              setTodos(JSON.parse(this.responseText));
          }
      };

      xhttp.open("GET", url, true);
      xhttp.setRequestHeader("x-api-key", key);
      xhttp.send();
    }
  });

  //add a todo to our system and display
  function addToDo(e){
    //setup url and output to API
    e.preventDefault();

    if(document.getElementById("Description").value.length == 0){
      alert("You left the input blank!");
      return;
    }

    let url = "https://cse204.work/todos"
    let description = {
        "text": document.getElementById("Description").value
    };

    var xhttp = new XMLHttpRequest();

    //put the new entry to the front of list and rebuild todos
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          let todo = JSON.parse(this.responseText);
          let newToDos = [todo, ...todos];
          setTodos(newToDos);
        } else if(this.readyState == 4){
            console.log(this.responseText);
        }
    };

    //post url
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send(JSON.stringify(description));
    e.target.reset();
  }

  //remove a todo
  function removeToDo(e){
    e.preventDefault();
    let parent = e.target.parentElement;
    let id = parent.id;

    let url = "https://cse204.work/todos/" + id;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const newToDos = todos.filter((entry) => {
              if(entry.id !== id){
                return true;
              }
              return false;
            });
            setTodos(newToDos);
        }
    };

    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send();
  }

  //mark a todo as complete
  function completeToDo(e){
    e.preventDefault();
    let parent = e.target.parentElement;
    let id = parent.id;
    let url = "https://cse204.work/todos/" + id;
    
    var completion;

    //if it was complete, mark it as incomplete, and vice versa
    for(var i = 0; i < todos.length; i++){
        if(todos[i].id == id){
            if(todos[i].completed){
                completion = {
                    "completed": false
                };
                break;
            }
            else{
                completion = {
                    "completed": true
                };
                break;
            }
        }
    }

    var xhttp = new XMLHttpRequest();

    //upload this change
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let todo = JSON.parse(this.responseText);
            let newToDos = [].concat(todos);
            for(var i = 0; i < todos.length; i++){
                if(todos[i].id == todo.id){
                    newToDos[i] = todo;                    
                    setTodos(newToDos);
                    break;
                }
            }
        } else if(this.readyState == 4){
            console.log(this.responseText);
        }
    };

    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send(JSON.stringify(completion));
  }

  //sort todos by alphabetical order
  function sortAlpha(e){
    const newToDos = [].concat(todos).sort(function (a, b){
      return a.text.localeCompare(b.text);
    });
    setTodos(newToDos);
  }

  //sort by creation time
  function sortCreation(e){
    console.log(todos);
    const newToDos = [].concat(todos).sort(function(a, b) {
      return b.created_at.localeCompare(a.created_at);
    });
    setTodos(newToDos);
  }

  //sort by creation (note considers two completes or incompletes as equal)
  function sortComplete(e){
    const newToDos = [].concat(todos).sort(function(a, b){
      if(a.completed && b.completed){
        return 0;
      }
      if(a.completed && b.completed !== true){
        return -1;
      }
      if(a.completed !== true && b.completed){
        return 1;
      }
      return 0;
    });
    setTodos(newToDos);
  }

  //main html that appears in site
  return (
        <body>
          <header>
            <h1>ToDo App</h1>
          </header>
          <section id="mainContent">
            <div className="menu">
            <NewTodo addToDo={addToDo}/>
            <SortBy sortAlpha={sortAlpha} sortCreation={sortCreation} sortComplete={sortComplete}/>
            </div>
            <div id="ToDos">
              {todos.map(item => (
                <Todo key={item.id} id={item.id} text={item.text} completed={item.completed} removeToDo={removeToDo} completeToDo={completeToDo}></Todo>
              ))}
            </div>
          </section>
          <footer>
            <p>Copyright to no one</p>
            <p>This website was made for educational purposes</p>
          </footer>
          <script src="script.js"></script>
        </body>
  );
}

export default App;

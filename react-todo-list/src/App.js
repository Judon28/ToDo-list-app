import React, {useState} from 'react';
import './App.css';
import pic from './photos/icons8-checkmark-24.png';
import pic1 from './photos/icons8-pencil-24.png';
import pic2 from './photos/icons8-trash-can-24.png';

function App() {

  //Task Outlook
  const [toDo, setToDo] = useState([
    //{"id": 1, "title": "Task 1", "status": false},
    //{"id": 2, "title": "Task 2", "status": false}
  ]);

  //Temporary state
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //Add task function
  function addTask(){
    if(newTask) {
      let index = toDo.length + 1;
      let newEntry = { id: index, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  }

  //Delete task funtion
  function deleteTask(id){
    let newTasks = toDo.filter(function(task){
      return task.id !== id
    })

    setToDo(newTasks);
  }

  //completed function
  function completed(id){
    let newTask = toDo.map(task => {
      if (task.id === id){
        return ({...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask);
  }

  //cancel update function
  function cancelUpdate(){
    setUpdateData('');
  }

  //edit function
  function editTask(e){
    let newEntry= {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false

    }
    setUpdateData(newEntry);
  }

  //update function
  function updateTask(){
    let record= [...toDo].filter(task => task.id !== updateData.id);
    let updatedRecord= [...record, updateData]
    setToDo(updatedRecord);
    setUpdateData('');
  }


  return(

    <div className="app-container">

      <div className="header">
        <h2> To Do List Application </h2>
      </div>

      {updateData && updateData ? (
        <>
          {/*update task form*/}
          
          <div className="task-form1">

          <div className= "input">
            <input className= "formI" value={updateData && updateData.title} onChange={(e) => editTask(e)}/>
          </div>

          <div className="button">
            <button className= "uButtonI" onClick={updateTask}>Update</button>
          </div>

          <div className="button1">
            <button className= "uButtonII" onClick={cancelUpdate}>Cancel</button>
          </div>

          </div>

        </>


      ) : (
        <>

          {/*Add Task Form*/}

          <div className="task-form">

            <div className= "input">
              <input className= "formI" placeholder= "Enter a Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            </div>

            <div className="button" onClick={addTask} >
              <button className= "buttonI">Add Task</button>
            </div>

          </div>


        </>
      )}



        {/*display Todo*/}

      <div className="Todo-display">

        {toDo && toDo.length ? '' : 'No Tasks Added...'}

        {toDo && toDo
          .sort((a,b) => a.id > b.id ? 1 : -1)
          .map((task, index) => {
            return(
              <React.Fragment key={task.id}>

                <div className="taskBg">
                
                  <div className={task.status ? 'done' : ''}>

                    <span className="task-index">{index + 1}</span>
                    <span className="task-txt">{task.title}</span>

                  </div>

                  <div className="icon-wrapper">

                    <span title="completed / not completed" onClick={(e) => completed(task.id)}>
                      <img src={pic}/>
                    </span>

                    {task.status ? null :(
                      
                      <span title="edit" onClick={() => setUpdateData({id: task.id, title: task.title, status: task.status ? true : false})}>
                        <img src={pic1}/>
                      </span>

                    )}


                    <span title="delete" onClick={() => deleteTask(task.id)}>
                      <img src={pic2}/>
                    </span>


                  </div>

                </div>   

              </React.Fragment>
            )
          })       
            
        }

      </div>

    </div>

    



  )
}

export default App;

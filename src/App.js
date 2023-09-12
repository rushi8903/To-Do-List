import { Completed } from './Completed';
import { Uncompleted } from './Uncompleted';
import './index.css';
import {useEffect, useState} from 'react'


// Importing the data from local storage if available 
const getUncompletedArray = () =>{
  let Array = localStorage.getItem('uncompletedArray');

  if(Array){
    return JSON.parse(Array);
  }else{
    return [];
  }
}

const getCompletedArray = () =>{
  let Array = localStorage.getItem('completedArray');

  if(Array){
    return JSON.parse(Array);
  }else{
    return [];
  }
}


function App() {

  // initialising the arrays and index for object of lists as a state
  let [uncompletedArray,setUncompletedArray]=useState(getUncompletedArray())
  let [completedArray,setCompletedArray]=useState(getCompletedArray())
  let [index,setIndex]=useState(0)

  
  // Handling inpute from the inpute box when user click on the addButton 
  const handleInpute =()=>{
    let text = document.getElementById("myInput").value;
    if(text===""){
        alert("Please Enter some task.");
        return;
    }
    let id = index
    setIndex(index + 1)
    let isEditOn=0;
    let obj = {
      id :id,
      todo : text,
      isEditOn : isEditOn
    }
    setUncompletedArray([...uncompletedArray,obj]);
    document.getElementById("myInput").value="";
  }

  // Functions for transmitting the data between completed and uncompleted array 

  // function for deleting object from array of uncompleted array 
  const handleDeleteU = (obj) =>{
    setUncompletedArray(uncompletedArray.filter((item)=>{
      return item.id!==obj.id 
    }))
  }

  // function for deleting object from array of completed array 
  const handleDeleteC = (obj) =>{
    setCompletedArray(completedArray.filter((item)=>{
      return item.id!==obj.id 
    }))
  }

  // function for transmitting  
  const handleReadU = (obj) =>{
    setCompletedArray([...completedArray,obj]);
    handleDeleteU(obj)
  }

  // function for deleting object from array of uncompleted array 
  const handleReadC = (obj) =>{
    setUncompletedArray([...uncompletedArray,obj]);
    handleDeleteC(obj)
  }
  

  const update=(event,obj)=>{
    if(obj.isEditOn){
      let buttonEle = event.target.parentNode
      buttonEle.innerHTML = `<i class="fa-solid fa-pen"></i>`
      let parentEle = buttonEle.parentNode.parentNode
      let inputEle = parentEle.firstChild
      let newspan = document.createElement("span")
      newspan.className="text-span"
      newspan.innerHTML=inputEle.value
      parentEle.removeChild(inputEle) 
      parentEle.prepend(newspan)
      obj.todo=inputEle.value
      obj.isEditOn = 0
    }else{
      let buttonEle = event.target.parentNode
      buttonEle.innerHTML = `<i class="fa-solid fa-check"></i>`
      let parentEle = buttonEle.parentNode.parentNode
      let textEle = parentEle.firstChild
      let savedTextEle = textEle.innerHTML
      parentEle.removeChild(textEle) 
      let inputeEle = document.createElement("input")
      inputeEle.type="text"
      inputeEle.value=savedTextEle
      inputeEle.className="box-inpute"
      parentEle.prepend(inputeEle)
      inputeEle.focus()
      obj.isEditOn = 1        
    }    
  }

  // Updating the local storage every time we change in the Array of completed or uncompleted objects
  useEffect(()=>{
    localStorage.setItem('uncompletedArray',JSON.stringify(uncompletedArray))
  },[uncompletedArray])

  useEffect(()=>{
    localStorage.setItem('completedArray',JSON.stringify(completedArray))
  },[completedArray])
  

  return (
    <>
    <div class="page">
        <div class="main">
            <div class="box1 title">
                <header>
                    <i class=" fa-regular fa-pen-to-square"></i> Todo-List 
                </header>
            </div>
            <div class="take-input">
                <input id="myInput" type="text" placeholder="Add task"/>
                <button id="addButton" onClick={handleInpute}><i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <div class="uncompletedBox">
                <label class="mylable">Todo's :</label>
                <Uncompleted uncompletedArray={uncompletedArray} handleDeleteU={handleDeleteU} handleReadU={handleReadU} update={update}/>                
            </div>
            <div class="completedBox">
                <label class="mylable">Done :</label>
                <Completed completedArray={completedArray} handleReadC={handleReadC} handleDeleteC={handleDeleteC} update={update}/>
            </div>          
        </div>
    </div>
    </>
  );
}

export default App;

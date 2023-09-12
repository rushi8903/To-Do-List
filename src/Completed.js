export const Completed = (props) =>{
    if(props.completedArray.length==0){
        return(
            <h2>NO TASK COMPLETED</h2>
        )
    }

    return(
        props.completedArray.map((obj)=>{  
          let text = obj.todo
            return (
              <div class="item">
                <span class="text-span">{text}</span>
                <div class="options">
                  <button onClick={(event)=>{props.update(event,obj)}}><i class="fa-solid fa-pen"></i></button>
                  <button class="completedButton" onClick={()=>{!obj.isEditOn && props.handleReadC(obj)}}><i class="fa-solid fa-arrow-up"></i></button>
                  <button class="removeButton" onClick={()=>{!obj.isEditOn && props.handleDeleteC(obj)}}><i class="fa-solid fa-xmark"></i></button>  
                </div>
              </div>
            )
        })
      
    )
} 
export const Uncompleted = (props) =>{
    if(props.uncompletedArray.length==0){
        return(
            <h2>ADD SOME TASK's</h2>
        )
    }


    return(
        props.uncompletedArray.map((obj)=>{
          let text = obj.todo  
          return (
            <div class="item">
              <span class="text-span">{text}</span>
              <div class="options">
                <button onClick={(event)=>{props.update(event,obj)}}><i class="fa-solid fa-pen"></i></button>
                <button class="completedButton" onClick={()=>{!obj.isEditOn && props.handleReadU(obj)}}><i class="fa-solid fa-check-double"></i></button>
                <button class="removeButton"  onClick={()=>{!obj.isEditOn && props.handleDeleteU(obj)}}><i class="fa-solid fa-xmark"></i></button>  
              </div>
            </div>
          )
        })
    )
}
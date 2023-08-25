import React, { useState ,useEffect} from 'react'
import './style.css'
const Todo = () => {


    const getLocalData=()=>{
        const lists=localStorage.getItem("MyToDoList");
        if(lists){
            return JSON.parse(lists);
        }
        else{
           return []
        }
    }


    const [inputdata,setInputData]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false);

    const addItem =()=>{
        if(inputdata===""){
            alert("Please fill data")
        }
        else if(inputdata&&toggleButton){
            setItems(items.map((CurElem)=>{
                if(CurElem.id===isEditItem){
                    return {...CurElem,name:inputdata}
                }
                return CurElem;
            }))
            setInputData([]);
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputdata
            }
            setItems([...items,myNewInputData])
            setInputData("");
        }
    }


    const editItem=(id)=>{
        const item_todo_edited=items.find((CurElem)=>{
            return CurElem.id===id;
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(id);
        setToggleButton(true);
    }


    const deleteItem =(id)=>{
        const updatedItem=items.filter((CurElem)=>{
            return CurElem.id!==id
        })
        setItems(updatedItem);
    }


    const removeAll=()=>{
        setItems([]);
    }

    useEffect(()=>{
        localStorage.setItem("MyToDoList",JSON.stringify(items))
    },[items])

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src='./images/todo.svg' alt="To Do Logo"/>
                <figcaption>Add Your List Here</figcaption>
            </figure>
            <div className='addItems'>
                <input type='text' placeholder='Add Items' className='form-control' value={inputdata} onChange={(event)=>setInputData(event.target.value)}></input>
                {toggleButton ? <i className='far fa-edit add-btn' onClick={addItem}></i> : <i className='fa fa-plus add-btn' onClick={addItem}></i>}
            </div>

            <div>
                <div className='showItems'>

                    {
                        items.map((CurElem,index)=>{
                            return(
                                <div className='eachItem' key={index}>
                                    <h3>{CurElem.name}</h3>
                                    <div className='todo-btn'>
                                    <i className='far fa-edit add-btn' onClick={()=>editItem(CurElem.id)}></i>
                                    <i className='far fa-trash-alt add-btn' onClick={()=>deleteItem(CurElem.id)}></i>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>




            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo

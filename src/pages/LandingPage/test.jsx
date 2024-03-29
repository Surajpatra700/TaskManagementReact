import { useEffect, useState } from "react";

const getTasks = () => {
  const data = localStorage.getItem("mytasks");
  if (data) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

const getCategories = () => {
  const data = localStorage.getItem("taskcategories");
  if (data) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

function App() {
  const [inputData, setInputData] = useState({
    name:"",
    priority:"",
    category:"",
    status:"",
    dueDate:""

  });
  const [categoryList, setCategoryList] = useState(getCategories());
  const [items, setItems] = useState(getTasks());
  const [isEditItem, setIsEditItem] = useState("");
  const [tbtn, setTbtn] = useState(false);

  useEffect(() => {
    localStorage.setItem("mytasks", JSON.stringify(items));
  }, [items])
  useEffect(() => {
    localStorage.setItem("taskcategories", JSON.stringify(categoryList));
  }, [categoryList])

  const createCategory = (name) => {
    setCategoryList(oldCategory => [...oldCategory, name])
  }

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    }
    )
  }

  const addItem = () => {
    if (!inputData) { alert("Please fill anything!") }
    else if (inputData && tbtn) {
      setItems(
        items.map((e) => {
          if (e.id === isEditItem) {
            return { ...e, inputData }
          }
          return e;
        })
      )
      setInputData({});
      setIsEditItem(null);
      setTbtn(false);
    }
    else {
      setItems([...items, inputData]);
      setInputData({});
    }
  }

  const deleteItem = (name) => {
    setItems(items.filter((e) => {
      return e.name !== name
    }))
  }

  const editItem = (name) =>{
    const eitem = items.find((e)=>{
        return e.name === name;
    })
    setInputData(eitem);
    setIsEditItem(name);
    setTbtn(true);
  }

  return (
    <>
      <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt="todo" />
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='✍️ Add Item' className='form-control' value={inputData} onChange={(e) => { onChange(e) }} />
                    {
                        tbtn?(<i className="far fa-edit add-btn" onClick={addItem} >e</i>) : (<i className="fa fa-plus add-btn" onClick={addItem} >+</i>)
                    }
                </div>
                <div className="showItems">
                    {
                        items?.map((e,index)=>{
                            return(<>
                                <div className="eachItem" key={index}>
                                <h3>{e.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={()=>{editItem(e.name)}} >e</i>
                                    <i className="far fa-trash-alt add-btn" onClick={()=>{deleteItem(e.name)}}>-</i>
                                </div>
                                </div>
                            </>)
                        })
                    }
                    
                </div>
            </div>
        </div>
    </>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  setTasks,
  setCategories,
  setInputData,
  setIsEditItem,
  addItem,
  deleteItem,
  editItem,
} from "../../redux/slice/taskSlice";

const getTasks = () => {
  const data = localStorage.getItem("mytasks");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const getCategories = () => {
  const data = localStorage.getItem("taskcategories");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const dispatch = useDispatch();
  const { tasks, categories, inputData, add } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(setTasks(getTasks()));
    dispatch(setCategories(getCategories()));
  }, [dispatch]);

  const [newcat, setNewcat] = useState("");
  const [order, setOrder] = useState(tasks);
  const [status, setStatus] = useState("all");
  const [ocat, setOcat] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("mytasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskcategories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    setOrder(tasks);
    const showTasks = async () => {
      if (status !== "all") {
        setOrder((order) => order?.filter((e) => e.status === status));
      }

      if (ocat !== "all") {
        setOrder((order) => order?.filter((e) => e.category === ocat));
      }
    };
    showTasks();
  }, [tasks, ocat, status]);

  useEffect(() => {
    const searchTasks = () => {
      setOrder(tasks);
      if (search.length !== 0) {
        setOrder(
          order.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else setOrder(tasks);
    };
    searchTasks();
  }, [tasks, search]);

  const createCategory = () => {
    if (newcat.length === 0) {
      alert("Enter a value");
      return;
    }
    dispatch(setCategories([...categories, newcat]));
    setNewcat("");
  };

  const onChange = (e) => {
    dispatch(
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleAddItem = () => {
    if (!inputData.name) {
      alert("Please fill anything!");
    } else if (inputData && !add) {
      dispatch(addItem());
      setIsEditItem(null);
    } else {
      dispatch(addItem());
    }
  };

  const handleDeleteItem = (name) => {
    dispatch(deleteItem(name));
  };

  const handleEditItem = (name) => {
    dispatch(editItem(name));
  };

  const sortorder = () => {
    let neworder = [...order];
    neworder.sort((a, b) => {
      if (a.priority === "high") return -1;
      if (a.priority === "medium" && b.priority === "low") return -1;
      if (
        a.priority === "low" &&
        (b.priority === "medium" || b.priority === "high")
      )
        return 1;
      return 0;
    });
    setOrder(neworder);
  };

  const handleDragEnd = (results) => {
    if(!results.destination){
      return;
    }
    let temporder = [...order]
    let [selected] = temporder.splice(results.source.index, 1)
    temporder.splice(results.destination.index,0,selected)
    setOrder(temporder)
  }

  return (
    // <>
    //   <div className="main-div">
    //     <div className="child-div">
    //       <figure>
    //         <img src="./images/todo.svg" alt="todo" />
    //       </figure>
    //       <div className="addItems">
    //         <input
    //           type="text"
    //           placeholder="✍️ Add Item"
    //           className="form-control"
    //           value={inputData.name}
    //           onChange={(e) => onChange(e)}
    //         />
    //         {tbtn ? (
    //           <i className="far fa-edit add-btn" onClick={handleAddItem}>
    //             e
    //           </i>
    //         ) : (
    //           <i className="fa fa-plus add-btn" onClick={handleAddItem}>
    //             +
    //           </i>
    //         )}
    //       </div>
    //       <div className="showItems">
    //         {tasks?.map((e, index) => {
    //           return (
    //             <div className="eachItem" key={index}>
    //               <h3>{e.name}</h3>
    //               <div className="todo-btn">
    //                 <i
    //                   className="far fa-edit add-btn"
    //                   onClick={() => handleEditItem(e.name)}
    //                 >
    //                   e
    //                 </i>
    //                 <i
    //                   className="far fa-trash-alt add-btn"
    //                   onClick={() => handleDeleteItem(e.name)}
    //                 >
    //                   -
    //                 </i>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div>
        <div className="form">
          <h1 className="headTitle">Add/Update task</h1>
          <label className="heading" htmlFor="name-input">
            Enter name of the task:
          </label>
          <input
            className="input-style"
            type="text"
            id="name-input"
            name="name"
            value={inputData.name}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <label className="heading" htmlFor="status-input">
            Status:
          </label>
          <select
            className="input-style"
            id="status-input"
            name="status"
            value={inputData.status}
            onChange={(e) => onChange(e)}
          >
            <option value="">-- Select --</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
          <label className="heading" htmlFor="priority-input">
            Priority:
          </label>
          <select
            className="input-style"
            id="priority-input"
            name="priority"
            value={inputData.priority}
            onChange={(e) => {
              onChange(e);
            }}
          >
            <option value="">-- Select --</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <label className="heading" htmlFor="status-input">
            Category:
          </label>
          <select
            className="input-style"
            id="status-input"
            name="category"
            value={inputData.category}
            onChange={(e) => {
              onChange(e);
            }}
          >
            <option value="">-- Select --</option>
            {categories?.map((cat, ind) => (
              <option key={ind} id={ind} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <label className="heading" htmlFor="date-input">
            Due Date:
          </label>
          <input
            className="input-style"
            type="date"
            id="date-input"
            name="dueDate"
            value={inputData.dueDate}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <div className="button" onClick={handleAddItem}>
            {add === true ? "Add" : "Update"}
          </div>
          <h1 className="headTitle">Add a Category</h1>
          <label className="heading" htmlFor="cat-input">
            Enter Category:
          </label>
          <input
            className="input-style"
            type="text"
            id="cat-input"
            name="name"
            value={newcat}
            onChange={(e) => setNewcat(e.target.value)}
          />
          <div className="button" onClick={createCategory}>
            Add
          </div>
        </div>
        <div className="cardContainer">
          <h1>List of tasks</h1>
          <div className="search-container">
            <input
              className="input-style"
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="input-style"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed Tasks</option>
              <option value="incomplete">Incomplete Tasks</option>
            </select>
            <select
              className="input-style"
              value={ocat}
              onChange={(e) => setOcat(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories?.map((cat, ind) => (
                <option key={ind} id={ind} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="button" onClick={sortorder}>
              Sort Tasks By Priority
            </div>
          </div>

          <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
            <div className="drag-drop-container">
              {order.length === 0 && <div>Tasks will be displayed here</div>}
              {order.length !== 0 && <div>Your tasks</div>}
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {order.map((item, index) => (
                      <Draggable draggableId={String(index)} index={index} key={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Card
                              name={item.name}
                              status={item.status}
                              category={item.category}
                              priority={item.priority}
                              dueDate={item.dueDate}
                              editItem={() => handleEditItem(item.name)}
                              deleteItem={() => handleDeleteItem(item.name)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default App;

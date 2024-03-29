import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  setCategories,
  setInputData,
  setIsEditItem,
  addItem,
  deleteItem,
  editItem,
  toggleTbtn
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
  const { tasks, categories, inputData, isEditItem,tbtn } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(setTasks(getTasks()));
    dispatch(setCategories(getCategories()));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("mytasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskcategories", JSON.stringify(categories));
  }, [categories]);

  const createCategory = (name) => {
    dispatch(setCategories([...categories, name]));
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
    } else if (inputData && tbtn) {
      dispatch(addItem());
      setIsEditItem(null);
      dispatch(toggleTbtn(false));
    } else {
      dispatch(addItem());
    }
  };

  const handleDeleteItem = (name) => {
    dispatch(deleteItem(name));
  };

  const handleEditItem = (name) => {
    dispatch(editItem(name));
    dispatch(toggleTbtn(true));
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo" />
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={inputData.name}
              onChange={(e) => onChange(e)}
            />
            {tbtn ? (
              <i className="far fa-edit add-btn" onClick={handleAddItem}>
                e
              </i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={handleAddItem}>
                +
              </i>
            )}
          </div>
          <div className="showItems">
            {tasks?.map((e, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{e.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => handleEditItem(e.name)}
                    >
                      e
                    </i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => handleDeleteItem(e.name)}
                    >
                      -
                    </i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

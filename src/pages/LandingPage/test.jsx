import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
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

const Home = () => {
  const [inputData, setInputData] = useState({
    name: "",
    priority: "",
    category: "",
    status: "",
    dueDate: "",
  });
  const [categoryList, setCategoryList] = useState(getCategories());
  const [items, setItems] = useState(getTasks());
  const [isEditItem, setIsEditItem] = useState("");
  const [addOrUpdate, setAddOrUpdate] = useState("Add");
  const [tbtn, setTbtn] = useState(false);
  const [newcat, setNewcat] = useState("");
  const [order, setOrder] = useState(items);
  const [status, setStatus] = useState("all");
  const [ocat, setOcat] = useState("all");
  const [search,setSearch]=useState("");

  useEffect(() => {
    localStorage.setItem("mytasks", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem("taskcategories", JSON.stringify(categoryList));
  }, [categoryList]);

  useEffect(() => {
    setOrder(items);
    const showBugs = async () => {
      // setBugsData(bugs);
      if (search.length !== 0) {
        setOrder(order.filter(item => item.name.includes(search)));
      }      
      else setOrder(items);
      if (status !== "all") {
        setOrder((order) => order?.filter((e) => e.status === status));
      }

      if (ocat !== "all") {
        setOrder((order) => order?.filter((e) => e.category === ocat));
      }
      


    };
    showBugs();
  }, [items, ocat, status, search]);

  const createCategory = () => {
    if (newcat.length === 0) {
      alert("Enter a value");
      return;
    }
    setCategoryList((oldCategory) => [...oldCategory, newcat]);
    setNewcat("");
  };

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const addItem = () => {
    if (!inputData) {
      alert("Please fill anything!");
    } else if (inputData && tbtn) {
      setItems(
        items.map((e) => {
          if (e.name === isEditItem) {
            return { ...e, ...inputData };
          }
          return e;
        })
      );
      // console.log(inputData);
      setInputData({
        name: "",
        priority: "",
        category: "",
        status: "",
        dueDate: "",
      });
      setIsEditItem(null);
      setTbtn(false);
      setAddOrUpdate("Add");
    } else {
      setItems([...items, inputData]);
      setInputData({
        name: "",
        priority: "",
        category: "",
        status: "",
        dueDate: "",
      });
    }
  };

  const deleteItem = (name) => {
    setItems(
      items.filter((e) => {
        return e.name !== name;
      })
    );
  };

  const editItem = (name) => {
    const eitem = items.find((e) => {
      return e.name === name;
    });
    setInputData(eitem);
    setIsEditItem(name);
    setTbtn(true);
    setAddOrUpdate("Update");
  };

  const handlechangecat = (e) => {
    setNewcat(e.target.value);
  };
  const onSearch=(e)=>{
    setSearch(e.target.value);
  }
  return (
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
            {categoryList?.map((cat, ind) => (
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
          <div className="button" onClick={addItem}>
            {addOrUpdate}
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
            onChange={(e) => {
              handlechangecat(e);
            }}
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
              onChange={onSearch}
            />
            {/* value={searchTerm} onChange={handleSearchChange} */}
            <select
              className="input-style"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {/* value={filter} onChange={handleFilterChange} */}
              <option value="all">All Tasks</option>
              <option value="completed">Completed Tasks</option>
              <option value="incomplete">Incomplete Tasks</option>
            </select>
            <select
              className="input-style"
              value={ocat}
              onChange={(e) => setOcat(e.target.value)}
            >
              {/* value={filter} onChange={handleFilterChange} */}
              <option value="all">All Categories</option>
              {categoryList?.map((cat, ind) => (
                <option key={ind} id={ind} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {order.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              status={item.status}
              category={item.category}
              priority={item.priority}
              dueDate={item.dueDate}
              editItem={() => editItem(item.name)}
              deleteItem={() => deleteItem(item.name)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  categories: [],
  inputData: {
    name: "",
    priority: "",
    category: "",
    status: "",
    dueDate: ""
  },
  isEditItem: null,
  isEdit: false,
  add: true
};

const handleAddItem = (state) => {
  if (!state.inputData.name) { 
    alert("Please fill anything!");
  } else if (state.inputData && state.isEdit) {
    state.tasks = state.tasks.map((e) => {
      if (e.name === state.isEditItem) {
        return { ...e, ...state.inputData }
      }
      return e;
    });
    state.inputData = initialState.inputData;
    state.isEditItem = null;
    state.isEdit = false;
    state.add = true;
  } else {
    state.tasks.push(state.inputData);
    state.inputData = initialState.inputData;
  }
};

const handleDeleteItem = (state, action) => {
  state.tasks = state.tasks.filter((e) => e.name !== action.payload);
};

const handleEditItem = (state, action) => {
  const eitem = state.tasks.find((e) => e.name === action.payload);
  state.inputData = eitem;
  state.isEditItem = action.payload;
  state.isEdit = true;
  state.add = false
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setInputData: (state, action) => {
      state.inputData = action.payload;
    },
    setIsEditItem: (state, action) => {
      state.isEditItem = action.payload;
    },
    addItem: handleAddItem,
    deleteItem: handleDeleteItem,
    editItem: handleEditItem
  },
});

export const {
  setTasks,
  setCategories,
  setInputData,
  setIsEditItem,
  addItem,
  deleteItem,
  editItem
} = taskSlice.actions;

export default taskSlice.reducer;

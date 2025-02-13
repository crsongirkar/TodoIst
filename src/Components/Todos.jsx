import { useContext, useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { GlobalContext } from "../Context/GlobalState";
import { toast, ToastContainer } from "react-toastify";

const Todos = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [newTask, setNewTask] = useState("");
  const [descp, setDescp] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Load todos from localStorage only once on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos.length > 0) {
      dispatch({ type: "SET_TODOS", payload: savedTodos });
    }
  }, [dispatch]);

  // Update localStorage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      toast.error("Error while creating task");
      return;
    }

    const newTodo = {
      id: Date.now(),
      task: newTask,
      completed: false,
      important: false,
      description: descp,
      date: selectedDate ? selectedDate.toLocaleDateString() : "No Date",
    };

    dispatch({ type: "ADD_TODO", payload: newTodo });
    toast.success("Task added");
    setNewTask("");
    setDescp("");
    setSelectedDate(null);
  };

  const toggleComplete = (id) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const removeCompletedTask = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const toggleImportant = (id) => {
    dispatch({ type: "TOGGLE_IMPORTANT", payload: id });
  };

  return (
    <div className="p-6 w-full mt-10">
      <br />
      <div
        className={`${
          state.theme === "dark" ? "bg-[#000000FF]" : "bg-[#FBFDFC]"
        } p-4 rounded-md shadow-md mb-6`}
      >
        <h2>Make Note Today 📝</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Write your task here"
            className="w-full p-1 border-none bg-transparent rounded-md focus:outline-none focus:border-[#000000FF]"
          />
          <div className="flex justify-between items-center px-8">
            <input
              type="text"
              value={descp}
              onChange={(e) => setDescp(e.target.value)}
              placeholder="Description"
              className="w-full p-3 border-none bg-transparent rounded-md focus:outline-none focus:border-[#000000FF]"
            />
            <button
              onClick={handleAddTask}
              className={`${
                state.theme === "dark" ? "bg-[#0CEB10C5]" : "bg-[#067EFFFF]"
              } p-1 rounded-md shadow-md mb-2`}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          state.theme === "dark" ? "bg-[#000000FF]" : "bg-[#FBFDFC]"
        } p-4 rounded-md shadow-md mb-1`}
      >
        <h2 className="text-xl font-semibold mb-4">Ongoing</h2>
        <ul className="flex flex-col gap-3">
          {state.todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-transparent p-2 border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="cursor-pointer"
                  />
                  <span>{todo.task}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{todo.description}</p>
                </div>
                <button
                  onClick={() => toggleImportant(todo.id)}
                  className={`text-lg ${
                    todo.important ? "text-[#F00D0DFF]" : "text-gray-300"
                  }`}
                >
                  {!todo.important && <FaRegStar className="text-2xl" />}
                  {todo.important && <FaStar className="text-2xl" />}
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div
        className={`${
          state.theme === "dark" ? "bg-[#000000FF]" : "bg-[#FBFDFC]"
        } p-4 rounded-md shadow-md mb-6`}
      >
        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        <ul className="flex flex-col gap-3">
          {state.todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-transparent p-2 border rounded-md"
              >
                <div>
                  <span className="line-through">{todo.task}</span>
                  <span className="text-sm text-gray-500">{todo.description}</span>
                </div>
                <button
                  onClick={() => removeCompletedTask(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Todos;

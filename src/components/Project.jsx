import { useRef } from "react";
export default function Project({
  title,
  dueDate,
  description,
  todos,
  handleDelete,
  id,
  handleTodos,
  handleDeleteTodo,
}) {
  const todoItem = useRef();
  const currentId = id;
  const updateDate = new Date(dueDate).toDateString();

  return (
    <div className="p-8 mt-12 w-[60%] bg-slate-200 rounded ">
      <menu className="flex  justify-between items-center">
        <h1 className="text-4xl  capitalize ">{title}</h1>
        <button
          className="bg-slate-300 px-4 py-2 rounded "
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </menu>
      <p className="py-4 font-semibold text-slate-400">{updateDate}</p>
      <p className="py-4 ">{description}</p>
      <span className="block h-[2px] w-full bg-slate-400 "></span>
      <h1 className="text-2xl font-semibold py-7">Tasks</h1>
      <p>
        <input
          ref={todoItem}
          type="text"
          className=" w-60 h-10 outline-slate-400 rounded mr-8 bg-slate-300 px-1 "
        />
        <button onClick={() => { 
          if(todoItem.current.value.trim().length === 0) {
            alert('Please Enter a valid Input')
          } else {
            handleTodos(todoItem.current.value, currentId);
            todoItem.current.value = '';
          }
           }}>
          Add Task
        </button>
      </p>
      <div className="w-[60%] p-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex justify-between py-4">
            <p>{todo.content}</p>
            <button onClick={() =>handleDeleteTodo(id, todo.id)} >Clear</button>
          </div>
        ))}
      </div>
    </div>
  );
}

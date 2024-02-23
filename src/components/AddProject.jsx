import { useRef } from "react";

export default function AddProject({ projectDispatch }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const handleSave = () => {
    // if(title.trim().length === 0 ||
    // description.trim().length === 0 ||
    // dueDate.trim().length === 0) {
    //   alert('please fill all the field.');
    // } else{
      projectDispatch({type:'SAVE_PROJECT', payload: {title:title.current.value, description:description.current.value, dueDate:dueDate.current.value}})

    
    // let uniqueId = Math.random().toLocaleString();
    // console.log(uniqueId);
    // if (title.current.value && description.current.value) {
    //   if (dueDate.current.value) {
    //     setData((preData) => {
    //       return {
    //         ...preData,
    //         selectedProjectId: uniqueId,
    //         projects: [
    //           ...preData.projects,
    //           {
    //             id: uniqueId,
    //             title: title.current.value,
    //             description: description.current.value,
    //             dueDate: dueDate.current.value,
    //             todos: [],
    //           },
    //         ],
    //       };
    //     });
    //   }
    // } else {
    //   alert("Please fill all the details");
    // }
  };

  return (
    <div className="mt-20 w-2/3 bg-slate-200 p-4">
      <p className="flex   justify-end !items-center ">
        <button
          className="  px-4 py-2 "
          onClick={() =>
            projectDispatch({ type: "CHANGE_SCREEN", payload: undefined })
          }
        >
          Close
        </button>
        <button
          className=" ml-4 rounded px-4 py-2 bg-gray-800  hover:bg-gray-600 text-white"
          onClick={handleSave}
        >
          Save
        </button>
      </p>
      <p>
        <label htmlFor="title" className="uppercase">
          Title
        </label>
      </p>
      <input ref={title} type="text" className="w-full p-2" name="title" />
      <p>
        <label className="uppercase">Description</label>
      </p>
      <textarea ref={description} className="w-full p-2" />
      <p>
        <label className="uppercase">Due Date</label>
      </p>
      <input ref={dueDate} type="date" />
    </div>
  );
}

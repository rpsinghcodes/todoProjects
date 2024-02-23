import NoProjectImg from "../assets/no-projects.png";

export default function NoProject({ projectDispatch }) {
  return (
    <div className=" my-20 flex  items-center flex-col">
      <img
        className=" my-2 h-20 w-20"
        src={NoProjectImg}
        alt="No project img"
      />
      <h1 className=" mt-4 text-4xl text-gray-600 font-bold">
        No Project Selected
      </h1>
      <p className=" my-4 text-lg font-medium text-gray-500">
        Select a project or get started with a new one
      </p>
      <button
        className="rounded px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white"
        onClick={() =>
          projectDispatch({ type: "CHANGE_SCREEN", payload: null })
        }
      >
        Create new project
      </button>
    </div>
  );
}

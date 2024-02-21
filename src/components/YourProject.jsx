

export default function YourProject({  projects, children, setData }) {
  return (
    <div className="bg-gray-900 h-screen mt-[10%] rounded-tr-3xl  p-14">
      <h1 className="text-3xl text-yellow-50">Your project</h1>
      <button
        className="rounded px-4 py-2 bg-gray-500 mt-10 hover:bg-gray-600"
        onClick={() => setData(prevData => ({
          ...prevData,
          selectedProjectId: null
        }))}
      >
        {" "}
        + Add Project{" "}
      </button>
      {children}
      {projects.map((item) => (
        <button
          key={item.id}
          className="text-white mt-4 bg-gray-600 block rounded hover:bg-gray-700 py-2 px-4"
          onClick={() => setData(prevData =>({
            ...prevData,
            selectedProjectId: item.id
          }))}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}

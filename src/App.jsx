import AddProject from "./components/AddProject";
import NoProject from "./components/NoProject";
import YourProject from "./components/YourProject";
import Project from "./components/Project";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  const handleDelete = (toDelete) => {
    const updatedProject = data.projects.filter(
      (project) => project.id !== toDelete
    );
    setData({
      ...data,
      selectedProjectId: undefined,
      projects: updatedProject,
    });
  };

  const handleDeleteTodo = (id, todoId) => {
    console.log('DeleteThis:', todoId)
    const projectIndex = data.projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) { 
      const updatedTodos = data.projects[projectIndex].todos.filter(todo => todo.id !== todoId);

      const updatedProjects = [...data.projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      todos: updatedTodos
    };

    setData(prevState => ({
      ...prevState,
      projects: updatedProjects
    }));

     }
   }

  const handleTodos = (newTodo, id) => {
    let uniqueId = Math.random().toLocaleString();
    const updatedProject = data.projects.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          todos: [...project.todos, { id:uniqueId, content: newTodo }],
        };
      }
      return project;
    });
    setData({
      ...data,
      projects: updatedProject,
    });
    console.log('data: ', data);
  };

 

  return (
    <div className="flex ">
      <div className="w-[20%]">
        <YourProject
          projects={data.projects}
          setData={setData}
        />
      </div>
      <div className="w-[80%]">
        {data.selectedProjectId === undefined && (
          <NoProject setData={setData} />
        )}
        {data.selectedProjectId === null && (
          <AddProject setData={setData} />
        )}
        {data.selectedProjectId && (
          <Project
            {...data.projects.find(
              (project) => project.id === data.selectedProjectId
            )}
            handleDeleteTodo={handleDeleteTodo}
            handleDelete={handleDelete}
            handleTodos={handleTodos}
          />
        )}
      </div>
    </div>
  );
}

export default App;

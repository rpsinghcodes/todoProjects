import { createContext, useState } from "react";

export let ProjectContext = createContext({
  projects: {},
  updateScreen: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  deleteProject: () => {},
  addProject: () => {},
});

// const projectReducer =(state, action) => {
//   return state
// }

export default function ProjectContextProvider({ children }) {
  const [data, setData] = useState({
    selectedProjectId: "addProject",
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
    console.log("DeleteThis:", todoId);
    const projectIndex = data.projects.findIndex(
      (project) => project.id === id
    );
    if (projectIndex !== -1) {
      const updatedTodos = data.projects[projectIndex].todos.filter(
        (todo) => todo.id !== todoId
      );

      const updatedProjects = [...data.projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        todos: updatedTodos,
      };

      setData((prevState) => ({
        ...prevState,
        projects: updatedProjects,
      }));
    }
  };

  const handleTodos = (newTodo, id) => {
    let uniqueId = Math.random().toLocaleString();
    const updatedProject = data.projects.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          todos: [...project.todos, { id: uniqueId, content: newTodo }],
        };
      }
      return project;
    });
    setData({
      ...data,
      projects: updatedProject,
    });
    console.log("data: ", data);
  };

  const handleSave = ({ title, description, dueDate }) => {
    let uniqueId = Math.random().toLocaleString();
    console.log(uniqueId);
    if (title && description) {
      if (dueDate) {
        setData((preData) => {
          return {
            ...preData,
            selectedProjectId: uniqueId,
            projects: [
              ...preData.projects,
              {
                id: uniqueId,
                title: title,
                description: description,
                dueDate: dueDate,
                todos: [],
              },
            ],
          };
        });
      }
    } else {
      alert("Please fill all the details");
    }
  };

  const updateScreen = (screenName) => {
    setData((prevData) => {
      return {
        ...prevData,
        selectedProjectId: screenName,
      };
    });
  };
  const cntxValue = {
    projects: data,
    updateScreen: updateScreen,
    deleteTodo: handleDeleteTodo,
    updateTodo: handleTodos,
    deleteProject: handleDelete,
    addProject: handleSave,
  };
  return (
    <ProjectContext.Provider value={cntxValue}>
      {children}
    </ProjectContext.Provider>
  );
}

import AddProject from "./components/AddProject";
import NoProject from "./components/NoProject";
import YourProject from "./components/YourProject";
import Project from "./components/Project";
import ProjectContextProvider from "./store/project-context";
import { useState, useReducer } from "react";

const dataReducer = (state, action) => {
  if (action.type === "CHANGE_SCREEN") {
    console.log("selectedProjectID");
    return { ...state, selectedProjectId: action.payload };
  } else if (action.type === "SAVE_PROJECT") {
    const uniqueId = Math.random().toLocaleString();
    console.log(uniqueId);
    console.log("newSavedProject(now the state is ): ", {
      ...state,
      selectedProjectId: uniqueId,
      projects: [
        ...state.projects,
        {
          id: uniqueId,
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.dueDate,
          todos: [],
        },
      ],
    });
    return {
      ...state,
      selectedProjectId: uniqueId,
      projects: [
        ...state.projects,
        {
          id: uniqueId,
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.dueDate,
          todos: [],
        },
      ],
    };
  } else if (action.type === "DELETE_PROJECT") {
    const updatedProject = state.projects.filter(
      (project) => project.id !== action.payload.id
    );
    console.log("updatedProject: ", updatedProject);
    return {
      ...state,

      selectedProjectId: undefined,
      projects:  updatedProject ,
    };
  } else if (action.type === "ADD_TODO") {
    let uniqueId = Math.random().toLocaleString();
    const updatedProjects = state.projects.map((project) => {
      if (project.id === action.payload.id) {
        return {
          ...project,
          todos: [
            ...project.todos,
            { id: uniqueId, content: action.payload.newTodo },
          ],
        };
      }
      return project; // return unchanged project if ID doesn't match
    });
    return {
      ...state,
      projects: updatedProjects,
    };
  } else if (action.type === "DELETE_TODO") {
    console.log("DeleteThis:", action.payload.todoId);
    const projectIndex = state.projects.findIndex(
      (project) => project.id === action.payload.id
    );
    if (projectIndex !== -1) {
      const updatedTodos = state.projects[projectIndex].todos.filter(
        (todo) => todo.id !== action.payload.todoId
      );

      const updatedProjects = [...state.projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        todos: updatedTodos,
      };
      return {
        ...state,
        projects: updatedProjects,
      };
      // setData((prevState) => ({
      //   ...prevState,
      //   projects: updatedProjects,
      // }));
    }
  }

  return state;
};

function App() {
  const [projectState, projectDispatch] = useReducer(dataReducer, {
    selectedProjectId: undefined,
    projects: [],
  });
  

  return (
    <ProjectContextProvider>
      <div className="flex ">
        <div className="w-[20%]">
          <YourProject
            projectState={projectState.projects}
            projectDispatch={projectDispatch}
          />
        </div>
        <div className="w-[80%]">
          {projectState.selectedProjectId === undefined && (
            <NoProject projectDispatch={projectDispatch} />
          )}
          {projectState.selectedProjectId === null && (
            <AddProject projectDispatch={projectDispatch} />
          )}
          {projectState.selectedProjectId && (
            <Project
              {...projectState.projects.find(
                (project) => project.id === projectState.selectedProjectId
              )}
              projectDispatch={projectDispatch}
              projectState={projectState}
            />
          )}
        </div>
      </div>
    </ProjectContextProvider>
  );
}

export default App;

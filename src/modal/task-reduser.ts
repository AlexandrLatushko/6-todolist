import { v1 } from "uuid";
import { TasksStateType} from "../App/AppWithRedux";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

const initialState:TasksStateType = {}

export const taskReduser = (state:TasksStateType = initialState, action:ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId] : state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            };
        }
        case 'ADD-TASK':{
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            // const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
            // setTasks(newTodolistTasks)
            console.log(action.payload.todolistId)
            return {...state,
                [action.payload.todolistId]:[newTask, ...state[action.payload.todolistId]]
                
            }
        }
        case'CHANGE-TASK-STATUS':{
            // const newTodolistTasks = {
            //     ...tasks,
            //     [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
            // }
            // setTasks(newTodolistTasks)
            return {...state,
                [action.payload.todolistId]: 
                    state[action.payload.todolistId].map(el=>el.id === action.payload.taskId ? {...el, isDone:action.payload.taskStatus} : el)
            }
        }
        case'UPDATE-TASK-TITLE': {
            return {...state,
                [action.payload.todolistId]: 
                    state[action.payload.todolistId].map(el=>el.id===action.payload.taskId ? {...el,title:action.payload.newTitle} :el)
            }
        }
        case 'ADD-TODOLIST': {
            console.log(action.payload.id)
    return {
        ...state,
        [action.payload.id]: [] // Инициализируем пустой массив задач для нового тудулиста
    };
}
        case 'REMOVE-TODOLIST': { 
            const newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        }
        
        default: return state;
    }
}

export const removeTaskAC = (payload:{todolistId:string,taskId:string}) =>{
    return {type: 'REMOVE-TASK',payload} as const 
}

export const addTaskAC = (payload:{todolistId:string, title:string}) => {
    return {type: 'ADD-TASK', payload} as const 
}

export const changeTaskStatusAC = ( payload:{todolistId:string, taskId:string, taskStatus: boolean}) => {
    return {type: 'CHANGE-TASK-STATUS', payload} as const 
}

export const updateTaskTitleAC = (payload:{todolistId:string, taskId:string, newTitle:string}) => {
    return {type: 'UPDATE-TASK-TITLE', payload} as const 
}

type ActionsType = RemoveTaskType 
| AddTaskType 
| ChangeTaskStatusType 
| UpdateTaskTitleType 
| AddTodolistActionType 
| RemoveTodolistActionType

export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export type AddTaskType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskTitleType = ReturnType<typeof updateTaskTitleAC > 

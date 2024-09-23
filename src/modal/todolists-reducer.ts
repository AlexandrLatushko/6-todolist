import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App/AppWithRedux"


const initialState: TodolistType[] = []

export const todolistReduser = (state:TodolistType[] = initialState, action:ActionsType):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl=>tl.id!==action.payload.id ) 
        }    
        case 'ADD-TODOLIST': {   
            const newTodolists:TodolistType = {id:action.payload.id, title: action.payload.title, filter: 'all'}
		    return [...state, newTodolists]     
        }  
        case 'CHANGE-TODOLIST-TITLE': {
            // setTodolists(todolists.map(el=>el.id===todolistId ? {...el,title:updetedTitle} : el))
            return state.map(el=>el.id === action.payload.id ? {...el, title:action.payload.title} :el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            // const newTodolists = todolists.map(tl => {
            //     return tl.id === todolistId ? {...tl, filter} : tl
            // })
            // setTodolists(newTodolists)
            return state.map(el=>el.id === action.payload.id ? {...el,filter:action.payload.filter} :el)
        }        
        default: return state  
    }
} 

export const removeTodolistAC = (id:string) => {
    return {
        type: 'REMOVE-TODOLIST' ,
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (title:string) =>{
    return {
        type: 'ADD-TODOLIST' ,
        payload: {
            title,
            id:v1()
        }
    } as const
}

export const chengeTodolistTitleAC = (payload:{id: string,title: string}) =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload
    }as const
}

export  const changeTodolistFilterAC = (payload:{id:string, filter:FilterValuesType}) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload
    }as const
    
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC >
export type AddTodolistActionType = ReturnType< typeof addTodolistAC >
export type ChangeTodolistTitleActionType = ReturnType< typeof chengeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType< typeof changeTodolistFilterAC>

type ActionsType =
| RemoveTodolistActionType
| AddTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType  

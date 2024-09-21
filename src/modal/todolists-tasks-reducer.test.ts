import { TasksStateType, TodolistType } from "../App/AppWithRedux"
import { taskReduser } from "./task-reduser"
import { addTodolistAC, todolistReduser } from "./todolists-reducer"

test('ids should be equals', () => {
    const startTasksState: TasksStateType= {}
    const startTodolistsState: TodolistType[] = []
   
    const action = addTodolistAC('new todolist')
   
    const endTasksState = taskReduser(startTasksState, action)
    const endTodolistsState = todolistReduser(startTodolistsState, action)
   
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id
   
    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
  })
import { addTaskAC, changeTaskStatusAC, removeTaskAC, taskReduser, updateTaskTitleAC } from './task-reduser'
import { TasksStateType } from '../App/AppWithRedux'
import { addTodolistAC,removeTodolistAC } from './todolists-reducer'



let startState: TasksStateType = {}

beforeEach(() => {
  
  startState = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  

  const endState = taskReduser(startState, removeTaskAC({taskId:'2' ,todolistId:'todolistId2'}))

  expect(endState).toEqual({
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '3', title: 'tea', isDone: false },
    ],
  })
})


test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }

  const endState = taskReduser(startState, addTaskAC({todolistId: 'todolistId2', title: 'juce' }))

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})



test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }

  const endState = taskReduser( startState, changeTaskStatusAC({taskId: '2', taskStatus: false, todolistId:'todolistId2',}))

  expect(endState['todolistId1'][1].isDone).toBe(true)
  expect(endState['todolistId2'][1].isDone).toBe(false)
})


test('title of specified task should be changed', () => {
  
  const endState = taskReduser(startState,updateTaskTitleAC({taskId: '2',newTitle: 'New Title',todolistId: 'todolistId2',}))

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('New Title')
})


test('new array should be added when new todolist is added', () => { 

  const endState = taskReduser(startState, addTodolistAC('new todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  
  const action = removeTodolistAC('todolistId2'); // Используйте правильное действие

  const endState = taskReduser(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).not.toBeDefined();
});
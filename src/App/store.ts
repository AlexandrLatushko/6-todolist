import { combineReducers, legacy_createStore as createStore } from 'redux'
import { taskReduser } from '../modal/task-reduser'
import { todolistReduser } from '../modal/todolists-reducer'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: taskReduser,
    todolists: todolistReduser,
})
// непосредственно создаём store
export const store = createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

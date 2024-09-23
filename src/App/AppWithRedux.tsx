import { AddItemForm } from '../AddItemForm';
import './App.css';
import ButtonAppBar from "../ButtonAppBar";
import {Todolist} from "../Todolist";
import {useState} from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { addTodolistAC, changeTodolistFilterAC, chengeTodolistTitleAC, removeTodolistAC } from '../modal/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from '../modal/task-reduser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}
 
function AppWichRedux() {
	

    // хук useSelector достает данные их стейта (принемает колбек у которого на входе текущий стейт, а на выходе стейт выбранный) 
    // если мы хотим домтать таски или тудулисты из стейта, то пользуемся именно этим хуком ()
    // его нужно протипизировать следующим образом(на первое место ставим типизацию стейта RootState из стора)
    // а вторым пораметром передается типизация того, что мы ходим домтать таски или тудулисты 
    const tasks = useSelector<RootState, TasksStateType >((state) => state.tasks)
    const todolists = useSelector<RootState, TodolistType[] >((state) => state.todolists)

    // для того, чтобы поменять состояние в редаксе нам нужно применить хук useDispatch   когда мы вызываем этот хук он нам возвращает функцию диспатча
    // у нее такая же функция как и того диспатча токорый отпровлял наши экшены в редьюсеры, только отправляет он наши экшены в наш комбаин редьюсеров
    // в руторый rootReducer
    const dispatch = useDispatch()

	
	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC({ todolistId, taskId }));
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({todolistId,title}))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC({todolistId,taskId,taskStatus}))
	}

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle:string ) => {
		dispatch(updateTaskTitleAC({todolistId,taskId,newTitle}))
	}

	const changeFilter = (filter: FilterValuesType, id: string) => {
		dispatch(changeTodolistFilterAC({id, filter}))
	}

	const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
	}

	const addTodolist = (newTitle: string) => {
		dispatch(addTodolistAC(newTitle));
	};

	function updateTodoTitle(id: string, title: string) {
		dispatch(chengeTodolistTitleAC({id, title}))
	}

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({ 
		palette: { 
			mode: themeMode,  
			primary: {  
				main: '#8c7aa7',    
				}, 
			},})

			const changeModeHandler = () => {setThemeMode(themeMode === 'light' ? 'dark' : 'light')}

	return (

		<ThemeProvider theme={theme}>
            <Container fixed>
				<ButtonAppBar onChange={changeModeHandler}/>
				<Grid container >
					<AddItemForm addItem={addTodolist}/>
				</Grid>
				<Grid container >
					{todolists.map((tl) => {

						return ( <Grid key={tl.id} item sx={{m:'30px'}}>
									<Paper elevation={5} sx={{p:'30px'}}>
										<Todolist
												todolistId={tl.id}
												title={tl.title}
												tasks={tasks[tl.id]}
												removeTask={removeTask}
												changeFilter={changeFilter}
												addTask={addTask}
												changeTaskStatus={changeTaskStatus}
												filter={tl.filter}
												removeTodolist={removeTodolist}
												updateTaskTitle={updateTaskTitle}
												updateTodoTitle={updateTodoTitle}
											/>
									</Paper >
										
								</Grid>
							
						) 
					})}
				</Grid>
			</Container>
			<CssBaseline />
		</ThemeProvider>
	);
}

export default AppWichRedux;

import {FilterValuesType, TaskType} from "./App/AppWithRedux";
import {ChangeEvent } from "react";
// import {Button} from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import  Box  from "@mui/material/Box";
import { filterButtonContanerSx, getListItemSx } from "./Todolist.styles";

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	updateTaskTitle:(todolistId: string, taskId: string, updetedTitile:string)=>void
	updateTodoTitle:(todolistId: string, updetedTitle:string)=>void
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		updateTaskTitle,
		updateTodoTitle
	} = props

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}
	const addTaskHandler = (title:string) => {
		addTask( title, todolistId)
	}
	const updateTaskTitleHendler = (taskId:string, updateTitle:string) =>{
		updateTaskTitle(todolistId,taskId,updateTitle)
	}
	const updadtTodoTitleHandler = (updateTitle:string)=>{
		updateTodoTitle(todolistId, updateTitle)
	}

	const allTodolistTasks = tasks
	let tasksForTodolist = allTodolistTasks

	if (filter === 'active') {
		tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3>
					<EditableSpan onClick={(updateTitle:string)=>updadtTodoTitleHandler(updateTitle)} oldTitle={title}/>
					<IconButton onClick={removeTodolistHandler}  aria-label="delete">
						<DeleteIcon  />
					</IconButton>
				</h3>
				{/* <Button title={'x'} onClick={removeTodolistHandler}/> */}
			</div>
			<AddItemForm addItem={addTaskHandler} />
			{
				tasksForTodolist.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasksForTodolist.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							
							return <ListItem 
										key={task.id} 
										sx = {getListItemSx(task.isDone)}
									>
										<div>
											<Checkbox defaultChecked  onChange={changeTaskStatusHandler} checked={task.isDone}/> 
											{/* <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/> */}
											<EditableSpan onClick={(updateTitle:string)=>updateTaskTitleHendler(task.id,updateTitle)} oldTitle={task.title}/>
										</div>
											{/* <Button onClick={removeTaskHandler} title={'x'}/> */}
											<IconButton onClick={removeTaskHandler}  aria-label="delete">
												<DeleteIcon  />
											</IconButton>

									</ListItem>
						})}
					</List>
			}
			<Box sx = {filterButtonContanerSx}>
				<Button variant={filter === 'all' ? 'outlined' : 'contained'} onClick={() => changeFilterTasksHandler('all')} color="secondary">all</Button>
				<Button variant={filter === 'active' ? 'outlined' : 'contained'} onClick={() => changeFilterTasksHandler('active')} color="error">active</Button>
				<Button variant={filter === 'completed' ? 'outlined' : 'contained'} onClick={() => changeFilterTasksHandler('completed')} color="success">completed</Button>
			</Box>
		</div>
	)
}

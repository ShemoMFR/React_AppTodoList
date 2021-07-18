import React, { useState } from 'react';
import moment from 'moment';
import TodoList from './TodoList';

function TodoForm() {
	const [todo, setTodo] = useState('');
	const [todoList, setTodoList] = useState(
		() => JSON.parse(localStorage.getItem('todoList')) || [],
	);
	const [title, setTitle] = useState('');

	function handleChangeTitle(e) {
		setTitle(e.target.value);
	}

	function handleChangeNote(e) {
		setTodo(e.target.value);
	}

	function addTask() {
		if (todo !== '') {
			const taskDetails = {
				id: Math.floor(Math.random() * 1000),
				title: title,
				task: todo,
				isCompleted: false,
				dateCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
			};

			const newTodoList = [...todoList, taskDetails];
			setTodoList(newTodoList);
			localStorage.setItem('todoList', JSON.stringify(newTodoList));
			setTitle('');
			setTodo('');
		}
	}

	function deleteTask(e, id) {
		e.stopPropagation();

		if (window.confirm('Are you sure you want to delete your note?')) {
			const newTodoList = todoList.filter((task) => task.id !== id);
			setTodoList(newTodoList);
		}
	}

	function editTask(task) {
		const index = todoList.findIndex((item) => item.id === task.id);
		const newTodoList = [...todoList];
		newTodoList[index] = task;
		setTodoList(newTodoList);
		
	}

	return (
		<div className='form'>
			<div className='input-container'>
				<div className='title'>Todo List</div>
				<input
					type='text'
					onChange={(e) => handleChangeTitle(e)}
					placeholder='Enter title'
					value={title}
				/>
				<textarea
					rows='10'
					name='text'
					id='text'
					placeholder='Enter task...'
					onChange={(e) => handleChangeNote(e)}
					value={todo}
				/>

				<button className='add-btn' onClick={addTask}>
					Add
				</button>
			</div>
			<br />

			<TodoList todoList={todoList} deleteTask={deleteTask} editTask={editTask} />
		</div>
	);
}

export default TodoForm;
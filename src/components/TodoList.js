import React, { useState } from 'react';
import '../styles/TodoList.css';
import Modal from 'react-modal';
import moment from 'moment';

function TodoList(props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [taskSave, setTaskSave] = useState({
		id: '',
		title: '',
		task: '',
		isCompleted: '',
		dateCreated: '',
		dateUpdated: ''
	});

	function handleSubmit(e) {
	    e.preventDefault();
        props.editTask({ ...taskSave, dateUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')});
        setModalIsOpen(false);
	}

	function openNote(task) {
		setTaskSave(task);
	}

	return (
		<div className='grid-wrapper'>
			{props.todoList !== [] ? (
				<ul>
					{props.todoList.map((task) => (
						<li className='grid-item' key={task.id} onClick={() => openNote(task)}>
							<div className='note-wrapper' onClick={() => setModalIsOpen(true)}>
								<span className='note-date'>{task.dateCreated} <i>(Initial date)</i></span>
								<span className='note-date'>{task.dateUpdated} <i>(date updated)</i></span>
								<span className='note-title'>{' '}<strong><u>Title</u> : {task.title}</strong></span>
								<span className='note-text'>{' '}<b><u>Text</u></b>{' '}: {task.task}</span>
							</div>
							<div className='btn-wrapper'>
								<button className='btn-red' onClick={(e) => props.deleteTask(e, task.id)}>Delete</button>					
							</div>
						</li>
					))}
				</ul>
			) : null}

			<Modal
				isOpen={modalIsOpen}
				shouldCloseOnOverlayClick={false}
				onRequestClose={() => setModalIsOpen(false)}>
				<div className='modal'>
					<div className='note-date'>{taskSave.dateCreated}</div>
					<br />
					<div className='note-title'><strong>
						Title : <input type='text' value={taskSave.title} 
						onChange={(e) => setTaskSave({ ...taskSave, title: e.target.value })}	/>			
						</strong></div>
					<form onSubmit={handleSubmit}>
						<textarea
							cols='100'
							rows='10'
							value={taskSave.task}
							onChange={(e) => setTaskSave({ ...taskSave, task: e.target.value })} >
						</textarea>
						<div>
							<button className='btn-modal' onClick={() => setModalIsOpen(false)}>
								Close
							</button>
							<button type="submit" className='btn-modal'>Edit</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
}

export default TodoList;
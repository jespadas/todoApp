import React, { useState, useContext, useCallback, useEffect } from 'react';
import ThemeContext from '../context/theme-context';
import classes from './Todo.module.css';

const ToDoMobile = (props) => {
	const { theme } = useContext(ThemeContext);
	// captures input
	const [input, setInput] = useState('');
	// stores list items
	const [toDoList, setToDoList] = useState([]);
	// track the current filter
	const [filter, setFilter] = useState('all');
	// track the drag item
	const [draggedItem, setDraggedItem] = useState(null);
	// add the css class based on selection
	const [selectedFilter, setSelectedFilter] = useState('all');
	// this is used to track the number of items not complete
	const [incompleteCount, setIncompleteCount] = useState(0);

	// update the incomplete count whenever the list changes
	useEffect(() => {
		setIncompleteCount(toDoList.filter((item) => !item.complete).length);
	}, [toDoList]);

	// we prevent default to stop the default behaviour
	// if the index of todolist is not equal to the dragged item, we set the prev list to be updated to the new list
	// then we add new list at position 0
	// we use useCallback to cache the function as it isnt necessary every render
	const handleDragOver = useCallback(
		(e, index) => {
			e.preventDefault();
			if (toDoList[index] !== draggedItem) {
				setToDoList((prevList) => {
					const newList = [...prevList];
					newList.splice(
						index,
						0,
						newList.splice(newList.indexOf(draggedItem), 1)[0]
					);
					return newList;
				});
			}
		},
		[draggedItem, toDoList]
	);

	// we add the dragOver class
	// we use useCallback to cache the function as it isnt necessary every render
	const handleDragEnter = useCallback((e) => {
		e.preventDefault();
		e.target.classList.add(classes.dragOver);
	}, []);

	// we remove the dragOver class
	// we use useCallback to cache the function as it isnt necessary every render
	const handleDragLeave = useCallback((e) => {
		e.preventDefault();
		e.target.classList.remove(classes.dragOver);
	}, []);

	// we remove the dragOver class
	// we use useCallback to cache the function as it isnt necessary every render
	const handleDrop = useCallback((e) => {
		e.preventDefault();
		e.target.classList.remove(classes.dragOver);
	}, []);

	// captures input for the list
	const handleInput = (e) => {
		setInput(e.target.value);
	};

	// also reacts to enter key
	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			addItem();
		}
	};

	// if input is blank, it will alert you
	const addItem = () => {
		if (!input) {
			alert('Enter a task!');
			return;
		}

		// this is to try what is added to the list
		const item = {
			id: Math.floor(Math.random() * 5000000),
			input: input,
			complete: false,
		};

		// will update the array snapshot accordingly
		setToDoList((prevList) => [...prevList, item]);
		// resets the input
		setInput('');
		console.log(toDoList);
	};

	// this is for the tick click
	// it looks at the previous list and makes a new array on it
	// it checks if task.id is true and makes a new array of task
	// to mark it as complete
	const handleCompletion = (id) => {
		setToDoList((prevList) =>
			prevList.map((task) =>
				task.id === id ? { ...task, complete: !task.complete } : task
			)
		);
	};

	// this will filter the list based on whether a task is complete
	const handleClearCompleted = () => {
		setToDoList((prevList) => prevList.filter((task) => !task.complete));
	};

	// this will set the filter state to the selected filter based on click
	const filterHandler = (type) => {
		setSelectedFilter(type);
		setFilter(type);
	};

	return (
		<>
			<div>
				<label htmlFor='to-do-input'>
					<span className={classes.circle} onClick={addItem}></span>
					<input
						className={`${classes.input} ${
							theme === 'light' ? '' : classes.containerDark
						}`}
						type='text'
						id='to-do-input'
						name='text'
						autoComplete='off'
						placeholder='Create a new to do...'
						value={input}
						onChange={handleInput}
						onKeyDown={handleEnter}
					/>
				</label>
			</div>
			<div className={classes.listHolder}>
				<div className={classes.tasksContainer}>
					<ul>
						{toDoList
							.filter((entry) => {
								if (filter === 'completed') {
									return entry.complete;
								} else if (filter === 'active') {
									return !entry.complete;
								} else {
									return true;
								}
							})
							.map((entry, index) => (
								<div
									key={index}
									className={`${classes.toDoItem} ${
										theme === 'light' ? '' : classes.containerDark
									}`}
									draggable={true}
									onDragStart={() => setDraggedItem(entry)}
									onDragOver={(e) => handleDragOver(e, index)}
									onDragEnter={(e) => handleDragEnter(e)}
									onDragLeave={(e) => handleDragLeave(e)}
									onDrop={(e) => handleDrop(e)}
								>
									<button
										className={`${classes.TodoItemButton} ${
											entry.complete ? classes.completeBackground : ''
										} ${theme === 'dark' ? classes.darkButton : ''}`}
										onClick={() => handleCompletion(entry.id)}
									/>
									<li className={entry.complete ? classes.completedTask : ''}>
										{entry.input}
									</li>
								</div>
							))}
					</ul>
					<div
						className={`${classes.listLength} ${
							theme === 'light' ? '' : classes.containerDark
						}`}
					>
						<p>{incompleteCount} items left</p>
						<button
							className={classes.clearButton}
							onClick={handleClearCompleted}
						>
							Clear Completed
						</button>
					</div>
				</div>
			</div>
			<div
				className={`${classes.filterContainer} ${
					theme === 'light' ? '' : classes.containerDark
				}`}
			>
				<button
					className={`${classes.filterButton} ${
						selectedFilter === 'all' ? classes.selected : ''
					}`}
					onClick={() => filterHandler('all')}
				>
					All
				</button>
				<button
					className={`${classes.filterButton} ${
						selectedFilter === 'active' ? classes.selected : ''
					}`}
					onClick={() => filterHandler('active')}
				>
					Active
				</button>
				<button
					className={`${classes.filterButton} ${
						selectedFilter === 'completed' ? classes.selected : ''
					}`}
					onClick={() => filterHandler('completed')}
				>
					Completed
				</button>
			</div>
			<p className={classes.dragNDrop}>Drag and drop to re-order the list</p>
		</>
	);
};

export default ToDoMobile;

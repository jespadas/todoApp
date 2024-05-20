import React, { useState, useEffect } from 'react';
import ThemeContext from './context/theme-context';
import Moon from './components/Moon';
import Sun from './components/Sun';
import lightBg from './images/bg-desktop-light.jpg';
import darkBg from './images/bg-desktop-dark.jpg';
import mobileLightBg from './images/bg-mobile-light.jpg';
import mobileDarkBg from './images/bg-mobile-dark.jpg';
import './App.css';
import Todo from './components/Todo';
import ToDoMobile from './components/ToDoMobile';
import { FaArrowLeft } from 'react-icons/fa6';

function App(props) {
	const [theme, setTheme] = useState('light');
	const toggleThemeHandler = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};
	const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

	const updateWidth = () => {
		setDesktop(window.innerWidth > 1000);
	};
	useEffect(() => {
		window.addEventListener('resize', updateWidth);
		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	}, []);

	return (
		<ThemeContext.Provider
			value={{ theme, setTheme, toggle: toggleThemeHandler }}
		>
			<div className={theme === 'light' ? 'App' : 'darkTheme'}>
				{isDesktop ? (
					<img src={theme === 'light' ? lightBg : darkBg} alt='theme bg' />
				) : (
					<img
						src={theme === 'light' ? mobileLightBg : mobileDarkBg}
						alt='theme bg'
						className='mobileBg'
						height={20}
					/>
				)}
				<div className='toDoContainer'>
					<div className={theme === 'light' ? 'titleWhite' : 'title'}>
						<h1>TO DO APP</h1>
						{theme === 'light' ? (
							<Moon onClick={toggleThemeHandler} />
						) : (
							<Sun onClick={toggleThemeHandler} />
						)}
					</div>
					<div>
						<button
							className={`back-button ${
								theme === 'dark' ? 'back-button-dark' : ''
							}`}
						>
							<a href='https://v2.julioespadas.com'>
								<FaArrowLeft /> Back to Portfolio
							</a>
						</button>
					</div>
					<div className='toDoItems'>
						{isDesktop ? <Todo isDesktop={isDesktop} /> : <ToDoMobile />}
					</div>
				</div>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;

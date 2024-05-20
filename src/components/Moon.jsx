import React from 'react';
import { BsMoon } from 'react-icons/bs';

const Moon = ({ onClick }) => {
	return (
		<button className='moon-icon' onClick={onClick}>
			<BsMoon size={'large'} color={'black'} />
		</button>
	);
};

export default Moon;

import React from 'react';
import { BsMoon } from 'react-icons/bs';

const Moon = ({ onClick }) => {
	return (
		<button onClick={onClick} className='moon-icon'>
			<BsMoon size={'large'} color={'black'} />
		</button>
	);
};

export default Moon;

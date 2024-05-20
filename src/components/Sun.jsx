import React from 'react';
import { BsSun } from 'react-icons/bs';

const Sun = ({ onClick }) => {
	return (
		<button onClick={onClick} className='sun-icon'>
			<BsSun size={'large'} />
		</button>
	);
};

export default Sun;

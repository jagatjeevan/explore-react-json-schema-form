import React from 'react';

const Input = props => {
	const { value, error, onChange, onFocus, onBlur } = props;
	return (
		<div>
			<input type='text' value={value} onChange={e => onChange(e.target.value)} />
			{error && <div className='error'>{error}</div>}
		</div>
	);
};

export default Input;

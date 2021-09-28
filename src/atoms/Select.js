import React from 'react';

const Select = props => {
	const { options, onChange, onBlur } = props;
	return (
		<div>
			<select onChange={e => onChange(e.target.value)} onBlur={e => onBlur(e.target.value)}>
				{options?.enumOptions?.map(option => (
					<option value={option.value}>{option.label}</option>
				))}
			</select>
		</div>
	);
};

export default Select;

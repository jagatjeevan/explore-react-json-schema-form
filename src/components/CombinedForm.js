import Form from '@rjsf/core';
import React from 'react';
import widgets from '../utils/widgetMapper';
import schema from '../schema/combinedForm.json';

const CombinedForm = () => {
	const [formData, setFormData] = React.useState(null);

	const changeHandler = data => {
        console.log('inside change handler', data.formData)
		setFormData(data.formData);
	};

    const onBlurHandler = () => {
        console.log('inside blur handler', formData)
    }

	const formProps = {
		formData,
		widgets,
		schema,
		onBlur: onBlurHandler,
		onChange: changeHandler,
	};

	return (
		<>
			<Form {...formProps} />
		</>
	);
};

export default CombinedForm;

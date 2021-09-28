import Form from '@rjsf/core';
import React from 'react';
import widgets from '../utils/widgetMapper';
import schema from '../schema/combinedForm.json';

const CombinedForm = () => {
	const [formData, setFormData] = React.useState(null);

	const changeHandler = data => {
		setFormData(data.formData);
	};

	const formProps = {
		formData,
		liveValidation: true,
		widgets,
		showErrorList: false,
		schema,
		onSubmit: () => {},
		onBlur: () => {},
		onFocus: () => {},
		onChange: changeHandler,
	};

	return (
		<>
			<Form {...formProps} />
		</>
	);
};

export default CombinedForm;

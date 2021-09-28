import Form from "@rjsf/core";
import React from "react";
import widgets from "../utils/widgetMapper";
import schema from "../schema/combinedForm.json";

const CombinedForm = () => {
  const [formData, setFormData] = React.useState(null);

  const changeHandler = (data) => {
    console.log("inside change handler", data.formData);
    setFormData(data.formData);
  };

  const onBlurHandler = () => {
    console.log("inside blur handler", formData);
  };

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
      <h2>Issue to reproduce</h2>
      <ol>
        <li>Open the console</li>
        <li>Focus on the input box</li>
        <li>Type in something</li>
        <li>Have enough space at the end</li>
        <li>Now click outside the textbox</li>
        <li>
          Ideally the change should call first and then the blur. Refer file :
          src/atoms/Input.js
        </li>
        <li>
          But change is called first and then the blur. The data sent in blur is
          stale, while data is updated later by onchange.
        </li>
      </ol>
    </>
  );
};

export default CombinedForm;

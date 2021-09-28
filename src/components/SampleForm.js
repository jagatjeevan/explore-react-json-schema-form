import Form from "@rjsf/core";
import { useEffect, useState } from "react";

const schema = {
  title: "Sample form with multiple fields",
  description: "Form with multiple fields",
  type: "object",
  properties: {
    fname: {
      type: "string",
    },
    mname: {
      type: "string",
    },
    lname: {
      type: "string",
    },
    age: {
      type: "number",
    },
  },
  required: ["fname", "lname", "age"],
};

function SampleForm() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [focusElem, setFocusElem] = useState(null);

  useEffect(() => {
    if (formData.fname === "Jagat" && formData.age < 12) {
      setError("age should be more than 12");
    } else {
      setError(null);
    }
  }, [formData]);

  const onSubmit = (e) => {
    console.log(formData);
  };

  const onChange = (data) => {
    setFormData(data.formData.fname.trim());
    console.log("change");
  };

  const uiSchema = {
    "ui:order": ["age", "fname", "mname", "*"],
  };

  const onFocus = (e) => {
    setFocusElem(e);
  };

  const onBlur = (elem) => {
    if (focusElem === elem) setFocusElem(null);
    console.log("blur");
  };

  return (
    <>
      <h2>Sample form</h2>
      {error && <>{error}</>}
      {focusElem && <>Focus element : {focusElem}</>}
      <Form
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        onFocus={onFocus}
        onChange={(e) => onChange(e)}
        onSubmit={onSubmit}
        onBlur={onBlur}
      />
    </>
  );
}

export default SampleForm;

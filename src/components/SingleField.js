import Form from "@rjsf/core";
import { useState } from "react";

const schema = {
  title: "Test form",
  description: "Exploring React json schema form",
  type: "string",
  enum: ["one", "two", "three"],
};

const uiSchema = {
  classNames: "custom-css-class",
};

function SingleField() {
  const [formData, setFormData] = useState("one");

  const onSubmit = (e) => {
    console.log(e);
  };

  const onError = (e) => {
    console.log(e);
  };

  return (
    <div className="App">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={(e) => setFormData(e.formData)}
        onSubmit={onSubmit}
        onError={onError}
      />
    </div>
  );
}

export default SingleField;

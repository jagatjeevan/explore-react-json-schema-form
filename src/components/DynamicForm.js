import Form from "@rjsf/core";
import { useState } from "react";
import "./../css/array-field-item.css";

const schema = {
  title: "Family Details",
  type: "object",
  required: ["familyDisease"],
  properties: {
    familyDisease: {
      type: "boolean",
      title:
        "Has any of your family member (parent & sibling) ever been diagnosed before the age of 60 with Diabetes, Hypertension, Kidney failure, Cancer, Heart attack or any hereditary disorder?",
      default: false,
    },
  },
  dependencies: {
    familyDisease: {
      oneOf: [
        {
          properties: {
            familyDisease: {
              enum: [true],
            },
            addMoreFamilyMembers: {
              title: "",
              type: "array",
              items: {
                type: "object",
                required: ["familyMember", "age", "currentStatus"],
                properties: {
                  familyMember: {
                    type: "string",
                    title: "Family Member",
                    enum: ["Father", "Mother", "Brother", "Sister"],
                    default: "Brother",
                  },
                  age: {
                    type: "number",
                    title: "Age",
                    maximum: 120,
                  },
                  currentStatus: {
                    type: "string",
                    title: "Current Status",
                    enum: ["Alive", "Passed Away"],
                    default: "Alive",
                  },
                },
                dependencies: {
                  currentStatus: {
                    oneOf: [
                      {
                        properties: {
                          currentStatus: {
                            enum: ["Passed Away"],
                          },
                          causeOfDeath: {
                            title: "Cause of Death",
                            type: "string",
                            enum: [
                              "High Blood Pressure",
                              "Heart Attack",
                              "Diabetes",
                              "Cancer",
                              "Kidney Failure",
                            ],
                            default: "Cancer",
                          },
                        },
                        required: ["causeOfDeath"],
                      },
                      {
                        properties: {
                          currentStatus: {
                            enum: ["Alive"],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
          required: ["addMoreFamilyMembers"],
        },
        {
          properties: {
            familyDisease: {
              enum: [false],
            },
          },
        },
      ],
    },
  },
};

const uiSchema = {
  familyDisease: {
    "ui:widget": "radio",
  },
  addMoreFamilyMembers: {
    "ui:options": {
      orderable: false,
      addable: true,
    },
  },
};

function transformErrors(errors) {
  return errors.map((error) => {
    if (error.name === "required") {
      console.log(error);
      error.message = `${error.params.missingProperty} is a required field`;
    }
    if (error.name === "maximum") {
      error.message = `Maximum allowed age is ${error.params.limit}`;
    }
    return error;
  });
}

function ErrorListTemplate(props) {
  //const { errors } = props;
  return <></>;
}

function validate(formData, errors) {
  if (formData.familyDisease && formData.addMoreFamilyMembers?.length === 0) {
    errors.addMoreFamilyMembers.addError(
      "Minimum one family member should be added."
    );
  }
  return errors;
}

const DynamicForm = () => {
  const [formData, setFormData] = useState();

  const onSubmit = (e) => {
    console.log(e);
  };

  const onError = (e) => {
    console.log(e);
  };
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={onSubmit}
      onError={onError}
      noHtml5Validate
      transformErrors={transformErrors}
      ErrorList={ErrorListTemplate}
      validate={validate}
    />
  );
};

export default DynamicForm;

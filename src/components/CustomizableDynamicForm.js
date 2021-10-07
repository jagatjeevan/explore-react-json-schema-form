import Form from "@rjsf/core";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "./../icons/add.svg";
import { ReactComponent as RemoveIcon } from "./../icons/remove.svg";

function ArrayFieldTemplate(props) {
  return (
    <div className={props.className}>
      {props.items &&
        props.items.map((element) => (
          <div key={element.key} className={element.className}>
            <div>{element.children}</div>

            {/* below commented code is for handling of move up and down if orderable:true */}
            {/* {element.hasMoveDown && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index  1
                )}
              >
                Down
              </button>
            )} */}
            {/* {element.hasMoveUp && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}
              >
                Up
              </button>
            )} */}
            <Button onClick={element.onDropIndexClick(element.index)}>
              <StyledRemoveIcon />
              Remove Member
            </Button>
            <hr />
          </div>
        ))}

      {props.canAdd && (
        <Button onClick={props.onAddClick} type="button">
          <StyledAddIcon />
          Add Member
        </Button>
      )}
    </div>
  );
}

const schema = {
  type: "object",
  title: "Family Details",
  properties: {
    question: {
      type: "boolean",
      title:
        "Has any of your family member (parent & sibling) ever been diagnosed before the age of 60 with Diabetes, Hypertension, Kidney failure, Cancer, Heart attack or any hereditary disorder?",
      default: false,
    },
  },
  dependencies: {
    question: {
      oneOf: [
        {
          properties: {
            question: {
              enum: [true],
            },
            addMembers: {
              title: "Add another Member",
              type: "array",
              items: {
                type: "object",
                required: ["familyMember", "healthStatus"],
                properties: {
                  familyMember: {
                    type: "string",
                    title: "Select Family Member",
                    enum: ["Father", "Mother", "Brother", "Sister"],
                    default: "Brother",
                  },

                  healthStatus: {
                    type: "string",
                    title: "Health Status",
                    enum: ["Good", "Bad", "Average", "Not Alive"],
                    default: "Good",
                  },
                },
                dependencies: {
                  healthStatus: {
                    oneOf: [
                      {
                        properties: {
                          healthStatus: {
                            enum: ["Not Alive"],
                          },
                          causeOfDeath: {
                            title: "Cause Of Death",
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
                          ageWhenDied: {
                            title: "Age When Died",
                            type: "string",
                          },
                        },
                        required: ["causeOfDeath", "ageWhenDied"],
                      },
                      {
                        properties: {
                          healthStatus: {
                            enum: ["Good"],
                          },
                          currentAge: {
                            title: "Current Age",
                            type: "string",
                          },
                        },
                        required: ["currentAge"],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          properties: {
            question: {
              enum: [false],
            },
          },
        },
      ],
    },
  },
};

const uiSchema = {
  addMembers: {
    "ui:options": {
      orderable: false,
      addable: true,
    },
  },
  question: {
    "ui:widget": "radio",
  },
};

const CustomizableDynamicForm = () => {
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
      ArrayFieldTemplate={ArrayFieldTemplate}
    />
  );
};

export default CustomizableDynamicForm;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  color: #ed1164;
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  margin-right: 8px;
`;

const StyledAddIcon = styled(AddIcon)`
  margin-right: 8px;
`;

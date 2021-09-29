import React from "react";

const Input = (props) => {
  const { value } = props;

  const onChange = (event) => {
    props.onChange(event.target.value);
  };

  const onBlur = async () => {
    const trimmedValue = value.trim();
    await props.onChange(trimmedValue);
    props.onBlur();
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  );
};

export default Input;

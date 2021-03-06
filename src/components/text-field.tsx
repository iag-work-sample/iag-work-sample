import React from "react";

import styled from "styled-components";
import { PRIMARY_COLOR } from "../constants";

type CommonProps = {
  placeholder?: string;
  className?: string;
  name: string;
};

type TextProps = CommonProps & {
  value?: string | null;
  onChange: (newValue: string | null) => void;
  type: "text" | "date";
};

type NumberProps = CommonProps & {
  value?: number | null;
  onChange: (newValue: number | null) => void;
  type: "number";
};

type Props = TextProps | NumberProps;

const Root = styled.div`
  background: #f8f8f8;
  position: relative;

  border-bottom: 1px solid #ccc;

  &:focus-within {
    background: #dddddd;
  }

  transition: all 200ms ease;
`;

const Input = styled.input`
  border: none;
  background: none;
  height: 100%;
  width: 100%;
  margin: 1.5rem 1rem 0.75rem 1rem;
  outline: none;
`;

const Ripple = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 2px solid ${PRIMARY_COLOR};
  transform: scale(0);

  ${Root}:focus-within & {
    transform: scale(1);
  }

  transition: all 200ms ease;
`;

interface PlaceholderProps {
  inputValue?: string;
  for?: string;
}

const selectedPlaceholderCss = `
  transform: scale(0.5) translateY(-100%);
`;

const Placeholder = styled.label<PlaceholderProps>`
  position: absolute;
  left: 1rem;
  top: 1.25rem;
  font-size: 1.1rem;
  color: #555;
  transform-origin: top left;
  pointer-events: none;

  ${(props) =>
    props.inputValue && props.inputValue !== "" && selectedPlaceholderCss}

  ${Root}:focus-within & {
    ${selectedPlaceholderCss}
    color: ${PRIMARY_COLOR}
  }

  transition: all 200ms ease;
`;

/**
 * A material-ui-styled text field.
 */
export default React.forwardRef(function TextField(
  props: Props,
  ref: React.Ref<HTMLInputElement>
) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const value = rawValue && rawValue !== "" ? rawValue : null;

    if (props.type === "text" || props.type === "date" || value === null) {
      (props as TextProps).onChange(value);
    } else if (props.type === "number") {
      props.onChange(Number.parseInt(value));
    }
  };

  return (
    <Root className={props.className}>
      <Input
        ref={ref}
        type="text"
        value={props.value || ""}
        name={props.name}
        id={props.name}
        onChange={onChange}
        data-testid={props.name}
      />
      {props.placeholder && (
        <Placeholder inputValue={props.value?.toString()} for={props.name}>
          {props.placeholder}
        </Placeholder>
      )}
      <Ripple />
    </Root>
  );
});

import React from "react";

type TextProps = {
  value?: string | null;
  onChange: (newValue: string | null) => void;
  type: "text" | "date";
};

type NumberProps = {
  value?: number | null;
  onChange: (newValue: number | null) => void;
  type: "number";
};

type Props = TextProps | NumberProps;

export default function TextField(props: Props) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const value = rawValue && rawValue != "" ? rawValue : null;

    if (props.type === "text" || props.type === "date" || value === null) {
      (props as TextProps).onChange(value);
    } else if (props.type === "number") {
      props.onChange(Number.parseInt(value));
    }
  };

  return (
    <input
      type={props.type || "text"}
      value={props.value || ""}
      onChange={onChange}
    />
  );
}

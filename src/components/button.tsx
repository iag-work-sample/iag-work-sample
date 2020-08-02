import React from "react";
import styled from "styled-components";
import { PRIMARY_COLOR, PRIMARY_COLOR_HIGHLIGHT } from "../constants";

const StyledButton = styled.button`
  border: 0;
  padding: 0.8rem 1.3rem;
  border-radius: 5px;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  background: ${PRIMARY_COLOR};
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px;
  cursor: pointer;
  font-size: 1.05rem;

  &:hover,
  &:focus {
    background: ${PRIMARY_COLOR_HIGHLIGHT};
  }
`;

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  className?: string;
}

export default function Button({
  children,
  type = "submit",
  className,
}: Props) {
  return (
    <StyledButton type={type} className={className}>
      {children}
    </StyledButton>
  );
}

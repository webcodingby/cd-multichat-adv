import { HTMLProps } from "react";

interface IWrapper extends HTMLProps<HTMLDivElement>{
  isError?: boolean,
  errorMessage?: string
}

interface IInput extends HTMLProps<HTMLInputElement> {
    
}

interface I {
  wrapperProps?: IWrapper
  inputProps?: IInput
}

export default I;
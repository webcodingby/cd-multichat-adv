import { HTMLProps } from "react";

export type buttonVariantType = 'default' | 'green' | 'danger' | 'dark' | 'yellow';

interface I extends HTMLProps<HTMLButtonElement> {
    type?: 'submit' | 'button' | 'reset' | undefined,
    children?: React.ReactNode
    variant?: buttonVariantType,
    isFill?: boolean,
    isLoading?: boolean,
    indicator?: number | string
}

export default I;
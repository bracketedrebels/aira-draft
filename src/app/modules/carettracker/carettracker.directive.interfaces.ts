export interface CaretOffset {
    top: number;
    left: number;
}

export interface Configuration {
    debounce: number;
    track?: string | {
        printables?: boolean;
        keyboardmove?: boolean;
        mousemove?: boolean;
        backspace?: boolean;
    };
}

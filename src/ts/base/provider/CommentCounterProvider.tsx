import React from "react";

interface ICommentCounterContext {
    count: number;
    setCount: (count: number | ((prev: number) => number)) => void;
}

export const CommentCounterContext = React.createContext<ICommentCounterContext>({
    count: 0,
    setCount: () => {},
});


const CommentCounterProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = React.useState(0);

    return (
        <CommentCounterContext.Provider value={{ count: count, setCount: setCount }}>
            {children}
        </CommentCounterContext.Provider>
    )
}

export default CommentCounterProvider;
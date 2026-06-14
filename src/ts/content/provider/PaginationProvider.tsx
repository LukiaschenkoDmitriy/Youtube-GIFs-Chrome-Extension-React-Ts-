import { createContext, useState } from "react";

interface IPaginationContext {
    nextCursor: number;
    setNextCursor: (nextCursor: number) => void;
    hasCursor: boolean;
    setHasCursor: (hasCursor: boolean) => void;
}

export const PaginationContext = createContext<IPaginationContext>({
    nextCursor: 0,
    setNextCursor: () => {},
    hasCursor: true,
    setHasCursor: () => {}
});

const PaginationProvider = ({children}: {children: React.ReactNode}) => {
    const [nextCursor, setNextCursor] = useState<number>(0);
    const [hasCursor, setHasCursor] = useState<boolean>(true);

    return (
        <PaginationContext.Provider value={{nextCursor, setNextCursor, hasCursor, setHasCursor}}>
            { children }
        </PaginationContext.Provider>
    )
}

export default PaginationProvider;
import {useContext} from "react";
import {DIServices} from "@Base/di";
import {DIContext} from "@Base/context/DIContext";

const useDIGet = <T>(alias: DIServices): T => {
    const { container } = useContext(DIContext);
    return container.get<T>(alias);
}

export default useDIGet;
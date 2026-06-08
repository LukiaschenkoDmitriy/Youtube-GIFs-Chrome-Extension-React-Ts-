import {useContext} from "react";
import {DIContext} from "@Base/context/DIContext";

const useDI = () => {
    return useContext(DIContext)
}

export default useDI;
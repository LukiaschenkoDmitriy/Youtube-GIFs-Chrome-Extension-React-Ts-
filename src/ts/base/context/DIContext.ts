import {createContext} from "react";
import DependencyInjection from "@Base/service/DI";

export const DIContext = createContext<{container: DependencyInjection}>({
    container: new DependencyInjection()
});
import {createContext} from "react";

import DependencyInjection from "@Base/di/DependencyInjection";

export const DIContext = createContext<{container: DependencyInjection}>({
    container: new DependencyInjection()
});
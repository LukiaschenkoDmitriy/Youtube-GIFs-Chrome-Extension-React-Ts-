import useDI from "@Base/hook/useDI";
import {SERVICE} from "@Base/di";

const useDIGet = <T>(alias: SERVICE): T => {
    const { container } = useDI();
    return container.get<T>(alias);
}

export default useDIGet;
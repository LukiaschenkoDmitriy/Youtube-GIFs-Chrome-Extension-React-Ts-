import EventEmitter from "@Base/event/EventEmitter";
import RuntimeProvider from "@Base/service/RuntimeProvider";
import DependencyInjection from "@Base/di/DependencyInjection";
import { SERVER_URL } from "@Base/variables";
import BaseGCClient from "@Base/service/client/BaseGCClient";

const di = new DependencyInjection();

export enum DIServices {
    BaseGCClient = "BaseGCClient",
    RuntimeProvider =  "RuntimeProvider",
    EventEmitter = "EventEmitter"
}

di.add(DIServices.BaseGCClient, new BaseGCClient(SERVER_URL));
di.add(DIServices.RuntimeProvider, new RuntimeProvider(SERVER_URL));
di.add(DIServices.EventEmitter, new EventEmitter());

export default di;
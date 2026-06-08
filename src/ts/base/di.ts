import DependencyInjection from "@Base/service/DI";
import ChromeService from "@Base/service/chrome";
import BaseGCClient from "@Base/service/client";
import EventEmitter from "@Base/event/EventEmitter";

const SERVER_URL = "http://localhost:8080";

const di = new DependencyInjection();

export enum SERVICE {
    BaseGCClient = "BaseGCClient",
    ChromeService =  "ChromeService",
    EventEmitter = "EventEmitter"
}

di.add(SERVICE.BaseGCClient, new BaseGCClient(SERVER_URL));
di.add(SERVICE.ChromeService, new ChromeService(SERVER_URL));
di.add(SERVICE.EventEmitter, new EventEmitter());

export default di;
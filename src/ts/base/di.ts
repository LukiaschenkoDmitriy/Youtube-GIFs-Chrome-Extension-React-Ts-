import EventEmitter from '@Base/event/EventEmitter';
import DependencyInjection from '@Base/di/DependencyInjection';
import { SERVER_URL } from '@Base/variables';
import BaseGCClient, { GCClientData } from '@Base/service/client/BaseGCClient';
import { EndpointType } from '@Client/endpoints';
import ClientMiddleware from '@Base/service/client/ClientMiddleware';

const di = new DependencyInjection();

export enum DIServices {
	BaseGCClient = 'BaseGCClient',
	EventEmitter = 'EventEmitter',
}

export const middleware = new ClientMiddleware();

if (process.env.NODE_ENV !== 'production') {
	middleware.add('REQUEST', ({ endpoint, data }: { endpoint: EndpointType; data: GCClientData }) => {
		console.group('%c[REQUEST]', 'color: green');
		console.log('Method  :', endpoint.method);
		console.log('URL     :', endpoint.url);
		console.log('Data    :', data);
		console.groupCollapsed('Stack Trace:');
		console.trace();
		console.groupEnd();
		console.groupEnd();
	});
	// eslint-disable-next-line
	middleware.add('RESPONSE', ({ endpoint, json }: { endpoint: EndpointType; json: any }) => {
		console.group('%c[RESPONSE]', 'color: red');
		console.log('Method  :', endpoint.method);
		console.log('URL     :', endpoint.url);
		console.log('Response :', json);
		console.groupCollapsed('Stack Trace:');
		console.trace();
		console.groupEnd();
		console.groupEnd();
	});
}

di.add(DIServices.BaseGCClient, new BaseGCClient(SERVER_URL));
di.add(DIServices.EventEmitter, new EventEmitter());

export default di;

import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export type MockBackendHandlerFunction = (request: HttpRequest) => Observable<HttpResponse<{}>>;

export interface MockBackendHandlers {
	[url: string]: {
		get?: MockBackendHandlerFunction,
		put?: MockBackendHandlerFunction,
		post?: MockBackendHandlerFunction,
		patch?: MockBackendHandlerFunction,
		delete?: MockBackendHandlerFunction
	}
}

export interface MockBackendDatabase {
	[table: string]: any[];
}

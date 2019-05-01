import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';

import { database } from './mock-backend.database';
import { MockBackendHandlers } from './mock-backend.interface';

export const handlers: MockBackendHandlers = {
	entries: {
		get: (request: HttpRequest<any>) => {
			return of(new HttpResponse({ status: 200, body: {auth_link: 'https://developers.monzo.com/'} }));
		},
		post: (request: HttpRequest<any>) => {
			return of(new HttpResponse({ status: 200, body: {auth_link: 'https://developers.monzo.com/'} }));
		}
	}
}

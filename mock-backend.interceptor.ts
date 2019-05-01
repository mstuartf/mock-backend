import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { handlers } from './mock-backend.handlers';
 
@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            
            // need to assert type as Observable<HttpEvent<any>> when accessing the functions this way
            if (handlers.hasOwnProperty(request.url) && handlers[request.url].hasOwnProperty(request.method))
                return handlers[request.url][request.method](request) as Observable<HttpEvent<any>>;
            
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown
        .pipe(materialize())
        .pipe(delay(1000))
        .pipe(dematerialize());
    }
}

export let MockBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: MockBackendInterceptor,
    multi: true
}

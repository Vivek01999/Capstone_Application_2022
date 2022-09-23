import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Http Trigger")
        console.log(req.url)
        let baseUrl = "http:localhost:3000";
        const apiReq = req.clone({ url: `${baseUrl}${req.url.replace('4200','3000')}` });
        console.log(apiReq)
        return next.handle(req);
    }
}
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private cache = new Map<string, Observable<HttpEvent<any>>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders:{
        'x-rapidapi-host': 'v3.football.api-sports.io',
		    'x-rapidapi-key': environment.apiKey 
      }
    })
    if (modifiedReq.method === 'GET') {
      const cachedResponse = this.cache.get(modifiedReq.url+modifiedReq.params.get('league')+modifiedReq.params.get('season')+modifiedReq.params.get('team'));
      if (cachedResponse) {
        return cachedResponse;
      }

      const response = next.handle(modifiedReq);
      this.cache.set(modifiedReq.url+modifiedReq.params.get('league')+modifiedReq.params.get('season')+modifiedReq.params.get('team'), response);
      return response;
    }

    return next.handle(modifiedReq);
  }

  clearCache(url: string) {
    this.cache.delete(url);
  }
}

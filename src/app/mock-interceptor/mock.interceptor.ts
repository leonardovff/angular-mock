import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { MockInterface } from './mock.interface';
import { MockRegister } from './mock-register';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor(@Inject(MockRegister) private mockResolves) { }
  
  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const mockRequest = this.findMock(request, this.mockResolves);
    if(!mockRequest){
      return next.handle(request);
    }
    return mockRequest
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }
  findMock(request: HttpRequest<any>, mockResolves: MockInterface[]){
    const { url, method } = request;
    const mock = mockResolves.find(mock => 
      mock.requestCheck(url, method)
    );
    if(!mock){
      return null;
    }
    return mock.response(request);
  }
}
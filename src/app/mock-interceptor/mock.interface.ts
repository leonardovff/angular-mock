import { HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface MockInterface {
    requestCheck(url: string, method: string): boolean,
    response(request: HttpRequest<any>): Observable<HttpResponse<any>>,
}
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-mock';
  httpRequest$: Observable<any>;

  constructor(http: HttpClient) {
    const url = 'https://apis.lopes.com.br/portal-home/v2/search/sale//br/rj/rio-de-janeiro?productTypes=real_estate,real_estate_parent&score.boost.product.address.city=Rio%20de%20Janeiro&placeId=ChIJW6AIkVXemwARTtIvZ2xC3FA&isGeolocation=true&page=0&linesPerPage=23&fieldScore=old';
    this.httpRequest$ = http.get(url);
  }
}

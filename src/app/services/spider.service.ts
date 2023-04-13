import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderStatus } from '../enums/common.enum';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  SpiderEndpoint = '';

  constructor(private http: HttpClient) {
    this.SpiderEndpoint = window.location.origin;
    if (window.location.origin.indexOf('http://localhost:') != -1) {
        this.SpiderEndpoint = 'http://localhost:10171';
    }

  }

  getOrderStatus(orderId: string) {
    let params = new HttpParams();

    params = params.append('orderId', orderId);

    return this.http.get<OrderStatus>(`${this.SpiderEndpoint}/api/orders/GetOrderStatus`, {
      observe: 'response',
      params,
    });
  }

  getHmlrSupplierRef(orderId: string) {
    let params = new HttpParams();

    params = params.append('orderId', orderId);

    return this.http.get<string>(
      `${this.SpiderEndpoint}/api/orders/getHmlrSupplierRef`,
      {
        observe: 'response',
        params,
      }
    );
  }

  getRegistrationDocuments(orderId: string) {
    let params = new HttpParams();

    params = params.append('orderId', orderId);

    return this.http.get<Array<string>>(
      `${this.SpiderEndpoint}/api/orders/getCompletedRegistrationDocuments`,
      {
        observe: 'response',
        params,
      }
    );
  }

  resolveRequisitions(orderId: string) {
    let params = new HttpParams();

    params = params.append('orderId', orderId);

    //shouldn't really be a get but post isn't working...
    return this.http.get<any>(
      `${this.SpiderEndpoint}/api/orders/resolveRequisitions`,
      {
        observe: 'response',
        params,
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class EnvironmentService {
  constructor(private http: HttpClient) {}

  getDrsServiceUrl() {
    const url =
      window.location.origin == 'http://localhost:4200'
        ? 'http://localhost:10171'
        : window.location.origin;

    return this.http.get<string>(`${url}/api/orders/getDrsServiceUrl`, {
      observe: 'response',
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MainService {
  private data: any;

  constructor(private http: HttpClient) {}

  postRequest(url: string, data: any): any {
    const body = { data: data };
    this.http.post<any>(url, body).subscribe((data: any) => {
      this.data = data;
      return this.data;
    });
  }
}

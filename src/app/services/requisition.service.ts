import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderStatus } from '../enums/common.enum';
import {
  AdditionalDocumentsRequestModel,
  GetRequisitionsResponseModel,
  ReplyToRequisitionRequestModel,
  GetDocumentsResponseModel,
  SwapDocumentsRequestModel,
} from '../features/pages/requisition/requisition.interfaces';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  //could make these subjects and subscribe
  public HmlrSupplierRef: string = '';
  public OrderId: string = '';
  public OrderStatus: OrderStatus | null = null;

  //Should probably be in a seperate service
  ServicesEndpoint: string = '';

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    environmentService.getDrsServiceUrl().subscribe((result) => {
      this.ServicesEndpoint = result.body ? result.body : '';
    });
  }

  getRequisition() {
    let params = new HttpParams();

    params = params.append('orderId', this.OrderId);
    params = params.append('hmlrSubmissionId', this.HmlrSupplierRef);

    return this.http.get<GetRequisitionsResponseModel>(
      this.ServicesEndpoint + '/GetRequisitions',
      {
        observe: 'response',
        params,
      }
    );
  }

  getApplicationDocuments() {
    let params = new HttpParams();

    params = params.append('orderId', this.OrderId);
    params = params.append('hmlrSubmissionId', this.HmlrSupplierRef);

    return this.http.get<GetDocumentsResponseModel>(
      this.ServicesEndpoint + '/GetDocuments',
      {
        observe: 'response',
        params,
      }
    );
  }

  replyToRequisition(
    replyToRequisitionRequestModel: ReplyToRequisitionRequestModel
  ) {
    return this.http.post<any>(
      `${this.ServicesEndpoint}/ReplyToRequisition`,
      replyToRequisitionRequestModel
    );
  }

  additionalDocuments(
    additionalDocumentsRequestModel: AdditionalDocumentsRequestModel
  ) {
    return this.http.post<any>(
      `${this.ServicesEndpoint}/AdditionalDocuments`,
      additionalDocumentsRequestModel
    );
  }

  swapDocuments(
    swapDocumentsRequestModel: SwapDocumentsRequestModel
  ) {
    return this.http.post<any>(
      `${this.ServicesEndpoint}/SwapSubmittedAttachmentHMLR`,
      swapDocumentsRequestModel
    );
  }
}

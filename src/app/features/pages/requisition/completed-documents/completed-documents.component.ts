import { Component, OnInit } from '@angular/core';
import { RequisitionService } from '../../../../services/requisition.service';
import { SpiderService } from '../../../../services/spider.service';

@Component({
  selector: 'app-completed-documents',
  templateUrl: './completed-documents.component.html',
  styleUrls: ['./completed-documents.component.scss']
})
export class CompletedDocumentsComponent implements OnInit {

  constructor(
    private requisitionService: RequisitionService,
    private spiderService: SpiderService
  ) { }

  completedDocuments: any;
  orderId: string = this.requisitionService.OrderId;
  isShowDocuments: boolean = false;

  ngOnInit(): void {
    this.getDocuments();
    this.getCompletedRegDocuments();
  }

  // gets all documents in the order blob
  getDocuments() {
    this.spiderService
      .getRegistrationDocuments(this.orderId)
      .subscribe(
        (res) => {
          this.completedDocuments = res.body;
          this.isShowDocuments = true;
        }
      );
  }

  // after DRSSubmissionAcceptedEventData is fired,
  // gets completed registration documents
  // (Completion of Registration & Office Copy of Register)
  getCompletedRegDocuments() {
    this.spiderService
      .getRegistrationDocuments(this.orderId)
      .subscribe(
        (res) => {
          console.log(res);
          this.completedDocuments = res.body;
          this.isShowDocuments = true;
        }
      );
  }

}

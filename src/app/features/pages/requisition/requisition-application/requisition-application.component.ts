import {
  Attachment,
  GetDocumentsResponseModel,
} from './../requisition.interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReplyComponent } from '../reply/reply.component';
import { SupportingDocumentTypeText } from '../requisition.enums';
import { RequisitionService } from '../../../../services/requisition.service';
import { SpiderService } from '../../../../services/spider.service';

@Component({
  selector: 'app-requisition-application',
  templateUrl: './requisition-application.component.html',
  styleUrls: ['./requisition-application.component.scss'],
})
export class RequisitionApplicationComponent implements OnInit {
  data: Attachment[] = [];
  collapsed: boolean = true;
  appResponse$!: GetDocumentsResponseModel | null;
  attachments: Attachment[] = [];
  isShowApplication: boolean = false;

  @ViewChild('ReplyComponent') ReplyComponent!: ReplyComponent;
  constructor(
    private requisitionService: RequisitionService,
    private spiderService: SpiderService
  ) {
       
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.attachments = [];
    this.isShowApplication = false;

    this.spiderService
      .getHmlrSupplierRef(this.requisitionService.OrderId)
      .subscribe(
        (res) => {
          if (res.body && res.body != '') {
            this.requisitionService.HmlrSupplierRef = res.body;
            this.requisitionService.getApplicationDocuments().subscribe(
              (res) => {
                this.appResponse$ = res.body;
                if (this.appResponse$) {
                  this.appResponse$?.Attachments?.forEach(
                    (attachment: Attachment) => {
                      this.attachments.push({ ...attachment });
                    }
                  );
                }
              },
              (error: any) => {
                this.isShowApplication = true;
                console.log(error);
              }
            );
          }
          this.isShowApplication = true;
        },
        (error: any) => {
          console.log(error);
          this.isShowApplication = true;
        }
      );
  }

  OnActivate() {
    this.ReplyComponent!.additionalDocsFlag = true;
    this.ReplyComponent!.openPopup();
  }

  SupportingDocumentTypeText(id: number): string {
    const text = SupportingDocumentTypeText.get(id);
    return text ?? '';
  }

  triggerRefresh(event: boolean) {
    if (event) {
      this.getDocuments();
    }
  }
}

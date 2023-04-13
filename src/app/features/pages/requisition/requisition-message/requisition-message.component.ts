import { Component, OnInit, ViewChild } from '@angular/core';
import { RequisitionService } from 'src/app/services/requisition.service';
import { SpiderService } from 'src/app/services/spider.service';
import { OrderStatus } from '../../../../enums/common.enum';
import { ReplyComponent } from '../reply/reply.component';
import { SupportingDocumentTypeText } from '../requisition.enums';
import {
  RequisitionsModel,
  GetRequisitionsResponseModel,
  Requisition,
} from '../requisition.interfaces';

@Component({
  selector: 'app-requisition-message',
  templateUrl: './requisition-message.component.html',
  styleUrls: ['./requisition-message.component.scss'],
})
export class RequisitionMessageComponent implements OnInit {
  response$!: GetRequisitionsResponseModel | null;
  requisitions: RequisitionsModel[] = [];
  isShowRequesitionMessage: boolean = false;
  selectedRequisition: any;

  @ViewChild('ReplyComponent') ReplyComponent!: ReplyComponent;
  constructor(
    private requisitionService: RequisitionService,
    private spiderService: SpiderService
  ) {}

  ngOnInit(): void {
    this.getRequisitions();
  }

  getRequisitions() {
    this.requisitions = []; //reset

    this.spiderService
      .getHmlrSupplierRef(this.requisitionService.OrderId)
      .subscribe(
        (res) => {
          if (res.body && res.body != '') {
            this.requisitionService.HmlrSupplierRef = res.body;
            this.requisitionService.getRequisition().subscribe(
              (res) => {
                this.response$ = res.body;
                this.response$?.requisitions?.forEach(
                  (_requisition: Requisition) => {
                    const requisition = {
                      isExpanded: false,
                      isReplied:
                        _requisition.repliedToHmlr == null
                          ? false
                          : _requisition.repliedToHmlr,
                      fileName:
                        _requisition.requisitions != null
                          ? _requisition.requisitions[0].filename != null
                            ? _requisition.requisitions[0].filename
                            : ''
                          : '',
                      blobUrl:
                        _requisition.requisitions != null
                          ? _requisition.requisitions[0].blobUrl != null
                            ? _requisition.requisitions[0].blobUrl
                            : ''
                          : '',
                      ..._requisition,
                    };
                    this.requisitions.push(requisition);
                  }
                );

                if (this.requisitions.length > 0) {
                  this.checkOrderStatus();
                }
              },
              (error: any) => {
                this.isShowRequesitionMessage = true;
                console.log(error);
              }
            );
          }
          this.isShowRequesitionMessage = true;
        },
        (error: any) => {
          console.log(error);
          this.isShowRequesitionMessage = true;
        }
      );
  }

  checkOrderStatus() {
    let requisitionsOutstanding = this.requisitions.filter(
      (x) => x.isReplied == false
    ).length;

    console.log('requisitions outstanding:' + requisitionsOutstanding);
    console.log('Order Status:' + this.requisitionService.OrderStatus);

    if (requisitionsOutstanding == 0 && this.requisitionService.OrderStatus == OrderStatus.ActionRequired) {
      this.spiderService
        .resolveRequisitions(this.requisitionService.OrderId)
        .subscribe((res) => {
        });
    }
  }

  onReplyRequisition(repliedRequisition: Requisition) {
    this.selectedRequisition = repliedRequisition;
    this.ReplyComponent!.additionalDocsFlag = false;
    this.ReplyComponent!.swapflag = false;
    this.ReplyComponent!.openPopup();
  }

  SupportingDocumentTypeText(id: number): string {
    const text = SupportingDocumentTypeText.get(id);
    return text ?? '';
  }

  triggerRefresh(event: boolean) {
    if (event) {
      this.getRequisitions();
    }
  }
}

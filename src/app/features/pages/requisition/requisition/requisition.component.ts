import { Component, OnInit } from '@angular/core';
import { RequisitionService } from '../../../../services/requisition.service';
import { SpiderService } from '../../../../services/spider.service';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss'],
})
export class RequisitionComponent implements OnInit {

  constructor(private requisitionService: RequisitionService, private spiderService: SpiderService) {

    this.requisitionService.OrderId =
      window.location.href.split('/')[
        window.location.href.split('/').length - 1
      ];
  }

  ngOnInit(): void {
    this.spiderService.getOrderStatus(this.requisitionService.OrderId).subscribe((res) => {
      if (res.body) {
        this.requisitionService.OrderStatus = res.body;
      }
    })
  }
}

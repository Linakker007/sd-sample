import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  Attachment,
  Requisition,
  AdditionalDocumentsRequestModel,
  ReplyToRequisitionRequestModel,
  SwapDocumentsRequestModel,
  GetDocumentsResponseModel,
  SwapAttachment
} from '../requisition.interfaces';
import { HttpClient } from '@angular/common/http';
import { SpiderService } from '../../../../services/spider.service';
import {
  SupportingDocumentType,
  SupportingDocumentCopyType,
  SupportingDocumentTypeText,
  SupportingDocumentCopyTypeText,
} from '../requisition.enums';
import { RequisitionService } from '../../../../services/requisition.service';
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  additionalDcouments = this.fb.group({
    doctype: ['', Validators.required],
    copytype: ['', Validators.required],
    filetype: ['', Validators.required],
    swapdocument:[''],
    comments: [''],
  });

  @Output() responseFromChild: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() requisition: Requisition | null = null;
 
  closeResult = '';
  filesize: boolean = true;
  displayStyle = 'none';
  styleClass = '';
  additionalDocsFlag: boolean = false;
  documentKeys: { text: string; value: number }[] = [];
  copyTypes: { text: string; value: number }[] = [];
  attachmentBase64Data: string | null | ArrayBuffer = null;
  fileType = '';
  fileName = '';
  copyType = '';
  documentType = '';
  swapdocumentType = '';
  errors = '';
  posting: boolean = false;
  swapflag: boolean = false;
  appResponse$!: GetDocumentsResponseModel | null;
  supportingDocumentIdUniqueKey: any;
  postErrorMessage = 'Something went wrong. Please try again.';
  attachments: Attachment[] = [];

  fileTypeError: boolean = false;
  hmlrValidFileTypes = [
    'application/pdf',
    'image/jpg',
    'image/jpeg',
    'image/JPG',
    'image/gif',
    'image/GIF',
    'image/tiff',
  ];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private http: HttpClient,
    private spiderService: SpiderService,
    private requisitionService: RequisitionService
  ) {
    for (var item in SupportingDocumentType) {
      if (!isNaN(Number(item))) {
        const text = this.SupportingDocumentTypeText(Number(item));
        this.documentKeys.push({ text: text, value: Number(item) });
      }
    }

    for (var item in SupportingDocumentCopyType) {
      if (!isNaN(Number(item))) {
        const text = this.SupportingDocumentCopyTypeText(Number(item));
        this.copyTypes.push({ text: text, value: Number(item) });
      }
    }
    this.getDocuments();
  }

  ngOnInit(): void {
    this.attachmentBase64Data = '';
  }

  getDocuments() {
    this.attachments = [];
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
                
              }
            );
          }
         
        },
        (error: any) => {
          console.log(error);
        }
      );
  }


  onPosting() {
    this.errors = '';
    if (this.additionalDcouments.valid) {
      this.posting = true;
      if (this.additionalDocsFlag) {
        this.postAdditionalDocument();
      } else {
        this.postRequisitionReply();
      }
    }
  }

  returnAttachmentLogic(): Attachment[] {
    let attachments: Attachment[] = [];
    let attachment = <Attachment>{}; //type assertion

    (attachment.copyType = Number(this.copyType)),
      (attachment.docType = Number(this.documentType)),
      (attachment.filename = this.fileName),
      (attachment.data = this.attachmentBase64Data);

    attachments.push(attachment);

    return attachments;
  }

  returnSwapdocumentLogic(): SwapAttachment {
   
    let attachment = <SwapAttachment>{}; //type assertion

    (attachment.supportingDocumentCopyType = Number(this.copyType)),
      (attachment.documentType = Number(this.documentType)),
      (attachment.filename = this.fileName),
      (attachment.filePath = this.attachmentBase64Data);
    (attachment.supportingDocumentId = this.supportingDocumentIdUniqueKey);
      
    return attachment;
  }

  

  postAdditionalDocument() {
    let _attachments = this.returnAttachmentLogic();

    const additionalDocumentsRequestModel: AdditionalDocumentsRequestModel = {
      attachments: _attachments,
      orderId: parseInt(this.requisitionService.OrderId),
      hmlrSubmissionId: this.requisitionService.HmlrSupplierRef,
    };

    this.requisitionService
      .additionalDocuments(additionalDocumentsRequestModel)
      .subscribe({
        next: (data) => {
          //success
          this.responseFromChild.emit(true);
          this.closePopup();
          this.posting = false;
        },
        error: (error) => {
          this.errors = this.postErrorMessage;
          this.posting = false;
        },
      });
  }


  postSwaprequisitionReply() {

    let _attachments = this.returnSwapdocumentLogic();

    const swapDocumentsRequestModel: SwapDocumentsRequestModel = {
      hmlrSubmissionId: this.requisitionService.HmlrSupplierRef,
      orderId: parseInt(this.requisitionService.OrderId),
      supportingDocument: _attachments,
    };
  
  this.requisitionService
      .swapDocuments(swapDocumentsRequestModel)
      .subscribe({
        next: (data) => {
          //success
          this.responseFromChild.emit(true);
          this.closePopup();
        },
        error: (error) => {
          this.errors = this.postErrorMessage;
        },
      });
  }


  postRequisitionReply() {
    let _attachments = this.returnAttachmentLogic();

    if (this.requisition != null) {
      this.requisition.requisitionReplies = _attachments;
      this.requisition.requisitions = [];
      let replyToRequisitionRequestModel: ReplyToRequisitionRequestModel = {
        requisition: this.requisition,
        orderId: this.requisitionService.OrderId,
        hmlrSubmissionId: this.requisitionService.HmlrSupplierRef,
      };

      this.requisitionService
        .replyToRequisition(replyToRequisitionRequestModel)
        .subscribe({
          next: (data) => {
            //success
            this.responseFromChild.emit(true);
            this.closePopup();
            this.posting = false;
          },
          error: (error) => {
            this.errors = this.postErrorMessage;
            this.posting = false;
          },
        });
    } else {
      this.errors = this.postErrorMessage;
    }
  }

  openPopup() {
    this.displayStyle = 'block';
    this.styleClass = 'show';
    this.additionalDcouments.reset();
    this.filesize = true;
  }

  closePopup() {
    this.displayStyle = 'none';
    this.styleClass = '';
    this.errors = '';
    this.fileName = '';
    this.fileTypeError = false;
  }

  readfile($event: any) {
    this.fileName = '';
    this.fileTypeError = false;
    this.filesize = true;

    if (!this.hmlrValidFileTypes.includes($event.target.files[0].type)) {
      this.fileTypeError = true;
      this.additionalDcouments.get('filetype')?.setValue('');
    } else if ($event.target.files[0].size > 20000000) {
      this.filesize = false;
      this.additionalDcouments.get('filetype')?.setValue('');
    } else {
      this.filesize = true;
      const file = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.fileName = $event.target.files[0].name;
      //reader.onload = () => {
      //  this.fileName = $event.target.files[0].name;
      //  this.attachmentBase64Data = reader?.result;
      //};
      reader.onload = (e: any) => {
        this.attachmentBase64Data = e.target.result.split('base64,')[1];
      };
    }
  }

  swapdocuments(e:any) {
    if (e.target.selectedOptions[0].innerText !== 'Select') {
      this.supportingDocumentIdUniqueKey = e.target.value;
      this.swapflag = true;
      let document = e.target.selectedOptions[0].dataset.document;
      let Copytp = e.target.selectedOptions[0].dataset.copy;
      this.documentType = document.toString();
      this.copyType = Copytp.toString();

    }
    else {
      this.swapflag = false;
    }

  }

  swapEnable() {
    this.swapflag = true;
  }


  SupportingDocumentTypeText(id: number): string {
    const text = SupportingDocumentTypeText.get(id);
    return text ?? '';
  }

  SupportingDocumentCopyTypeText(id: number): string {
    const text = SupportingDocumentCopyTypeText.get(id);
    return text ?? '';
  }
}

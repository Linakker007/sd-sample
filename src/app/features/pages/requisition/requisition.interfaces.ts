export interface GetRequisitionsResponseModel extends ConsumerCommonBase {
  requisitions: Requisition[] | null;
}

export interface ConsumerCommonBase extends HMLREventBase {
  orderId: number;
}

export interface HMLREventBase extends EventSchemaBase {
  serviceType: number;
  submissionStatus: number;
  hmlrUserId: string | null;
  hmlrPassword: string | null;
  hmlrSubmissionId: string | null;
}

export interface EventSchemaBase extends EventAuditBase {
  clientKey: string | null;
  error: Error | null;
}

export interface Requisition {
  requisitionId: string | null;
  dateReceived: string | null;
  repliedToHmlr: boolean | null;
  requisitions: Attachment[] | null;
  dateReplied: string | null;
  requisitionReplies: Attachment[] | null;
}

export interface Attachment {
  attachmentId: string | null;
  copyType: number;
  docType: number;
  filename: string | null;
  blobUrl: string | null;
  format: number;
  data: string | null | ArrayBuffer;
  sentToHmlr: boolean | null;
  sentToHmlrDate: string | null;
  acceptedHmlr: boolean;
  acceptedOrRejectedDate: string | null;
  supportingDocumentIdUniqueKey: string | null;
}


export interface SwapAttachment {
  supportingDocumentId: number;
  supportingDocumentCopyType: number;
  documentType: number;
  filename: string | null;
  filePath: string | null | ArrayBuffer;
}

export interface Error {
  code: string | null;
  description: string | null;
}

export interface EventAuditBase extends EventDataBase {
  audit: Audit;
}

export interface Audit {
  username: string | null;
  name: string | null;
  userId: string | null;
  applicationId: string | null;
  applicationName: string | null;
  operation: string | null;
  dateRequested: string | null;
}

export interface EventDataBase {
  id: string | null;
  partitionKey: string | null;
}
export interface HMLRValidFileTypes {
  Pdf: 1;
  Gif: 2;
  Jpg: 3;
  tiff: 4;
}

export interface HMLRValidFileTypes {
  Pdf: 1;
  Gif: 2;
  Jpg: 3;
  tiff: 4;
}

export interface GetDocumentsResponseModel extends ConsumerCommonBase {
  Attachments: Attachment[];
}
export interface AdditionalDocumentsRequestModel {
  attachments: Attachment[];
  orderId: number;
  hmlrSubmissionId: string;
}
export interface SwapDocumentsRequestModel {
  hmlrSubmissionId: string;
  orderId: number;
  supportingDocument: SwapAttachment;
}


export interface ReplyToRequisitionRequestModel {
  orderId: string;
  hmlrSubmissionId: string;
  requisition: Requisition;
}

export interface RequisitionsModel {
  isExpanded: boolean;
  isReplied: boolean;
  fileName: string;
  blobUrl: string;
  requisitionId: string | null;
  dateReceived: string | null;
  repliedToHmlr: boolean | null;
  requisitions: Attachment[] | null;
  dateReplied: string | null;
  requisitionReplies: Attachment[] | null;
}

export interface RequisitionsResponse extends ConsumerCommonBase {
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
  attachments: Attachment[] | null;
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

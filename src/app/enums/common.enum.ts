export enum OrderStatus {
  PreAddress,             //0 - No address selected 
  Incomplete,             //1 - address selected, and possibly products also selected and questions aanswered
  PendingPayment,         //2 - (cases that are saved but not yet had the payment method added)
  FundsToCollect,         //3 - (cases that have been marked as pie to collect but not yet had funds collected)
  AwaitingClearedFunds,   //4 - (a case that has had payment collected by pie, but not yet “cleared” and pushed into open)
  Open,                   //5 - (case that has been ordered, marked as paid/cleared funds so that products can be ordered but not yet had all products returned)
  Completed,              //6 - (case where all products have been returned)
  Cancelled,              //7
  CancellationRequested,  //8
  ExportFailed,           //9
  FundsReceived,          //10
  Deleted,                //11
  PendingReview,          //12
  QuoteRequested,         //13
  Quoted,                 //14
  ConvertQuote,           //15
  Draft,                  //16
  Archived,             //17
  SubmissionError,  //18
  ActionRequired,   //19
  Submitted,  //20
  AwaitingResponse // 21
}

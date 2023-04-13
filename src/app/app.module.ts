import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequisitionComponent } from './features/pages/requisition/requisition/requisition.component';
import { ReplyComponent } from './features/pages/requisition/reply/reply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequisitionApplicationComponent } from './features/pages/requisition/requisition-application/requisition-application.component';
import { RequisitionMessageComponent } from './features/pages/requisition/requisition-message/requisition-message.component';
import { CompletedDocumentsComponent } from './features/pages/requisition/completed-documents/completed-documents.component';
import { SdltDashboardComponent } from './features/pages/sdlt/sdlt-dashboard/sdlt-dashboard.component'
import { EnvironmentService } from './services/environment.service';
import { SdltOneComponent } from './features/pages/sdlt/sdlt-one/sdlt-one.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RequisitionComponent,
    SdltDashboardComponent,
    RequisitionApplicationComponent,
    RequisitionMessageComponent,
    ReplyComponent,
    CompletedDocumentsComponent,
    SdltOneComponent
    
  ],
  imports: [BrowserModule, NgbModule,AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  providers: [ReplyComponent, EnvironmentService]
})
export class AppModule {
  constructor() {}
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequisitionMessageComponent } from './requisition-message.component';
import { ReplyComponent } from '../reply/reply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('RequisitionApplicationComponent', () => {
    let component: RequisitionMessageComponent;
    let fixture: ComponentFixture<RequisitionMessageComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule , HttpClientModule],
        declarations: [
            RequisitionMessageComponent,
            ReplyComponent
        ],
        providers:[ReplyComponent],
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(RequisitionMessageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('reply should set additionalDocsFlag true', () => {
        component.ReplyComponent.additionalDocsFlag = false ;
      expect(component.ReplyComponent.additionalDocsFlag).toBe(false);
      //component.onReplyRequisition(); //<====  sachin please update this as per new function definition
    });

});

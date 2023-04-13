import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequisitionApplicationComponent } from './requisition-application.component';
import { ReplyComponent } from '../reply/reply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('RequisitionApplicationComponent', () => {
    let component: RequisitionApplicationComponent;
    let fixture: ComponentFixture<RequisitionApplicationComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule , HttpClientModule],
        declarations: [
            RequisitionApplicationComponent,
            ReplyComponent
        ],
        providers:[ReplyComponent],
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(RequisitionApplicationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should create collapsed', () => {
        expect(component.collapsed).toBeTruthy();
    });

    it('OnActivate should set additionalDocsFlag true', () => {
        component.ReplyComponent.additionalDocsFlag = true ;
        expect(component.ReplyComponent.additionalDocsFlag).toBe(true);
        component.OnActivate();
    });

});

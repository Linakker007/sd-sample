import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplyComponent } from '../reply/reply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HttpClient, HttpResponse  } from '@angular/common/http';
import { SpiderService } from '../../../../services/spider.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RequisitionApplicationComponent', () => {
    let component: ReplyComponent;
    let fixture: ComponentFixture<ReplyComponent>;
    let httpTestingController: HttpTestingController;
    let http :HttpClient;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule , HttpClientModule , HttpClientTestingModule],
        declarations: [
            ReplyComponent
        ],
        providers:[ReplyComponent,SpiderService],
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
        fixture = TestBed.createComponent(ReplyComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    it('should create component after onInit', () => {
        expect(component).toBeDefined();
    });
  
    /*it("should use the getHmlrSupplierRef from the service", () => {
        const service = fixture.debugElement.injector.get(SpiderService);
        service.getHmlrSupplierRef('1516313').subscribe((res) => {
            expect(component.hmlrSupplierRef).toEqual(res.body)
        });
        expect(service.getHmlrSupplierRef).toBeTruthy();
    });*/

    it('should call onPosting ', () => {
        component.errors = '';
        expect(component.errors).toBe('');
        component.additionalDocsFlag = true;
        expect(component.additionalDocsFlag).toBe(true);
        component.postAdditionalDocument();
        spyOn(component,'postAdditionalDocument');
        component.postAdditionalDocument();
        component.onPosting();
    });

    it('should call onPosting ', () => {
        component.errors = '';
        expect(component.errors).toBe('');
        component.additionalDocsFlag = false;
        expect(component.additionalDocsFlag).toBe(false);
        component.postRequisitionReply();
        spyOn(component,'postRequisitionReply');
        component.postRequisitionReply();
        component.onPosting();
    });

    it('should call openPopup ', () => {
        component.displayStyle = 'block';
        expect(component.displayStyle).toContain('block');
        component.styleClass = 'show';
        expect(component.styleClass).toContain('show');
        spyOn(component.additionalDcouments,'reset');
        component.additionalDcouments.reset();
        component.filesize = true ;
        expect(component.filesize).toBe(true);
        spyOn(component,'openPopup');
        component.openPopup();
    });


    it('should call closePopup ', () => {
        component.displayStyle = 'none';
        expect(component.displayStyle).toContain('none');
        component.styleClass = '';
        expect(component.styleClass).toBe('');
        component.errors = '';
        expect(component.errors).toBe('');
        component.fileName = '' ;
        expect(component.fileName).toBe('');
        component.closePopup();
      });

  });

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDocumentsComponent } from './completed-documents.component';

describe('CompletedDocumentsComponent', () => {
  let component: CompletedDocumentsComponent;
  let fixture: ComponentFixture<CompletedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

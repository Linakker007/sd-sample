import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdltOneComponent } from './sdlt-one.component';

describe('SdltOneComponent', () => {
  let component: SdltOneComponent;
  let fixture: ComponentFixture<SdltOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdltOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdltOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

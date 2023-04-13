import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdltDashboardComponent } from './sdlt-dashboard.component';

describe('SdltDashboardComponent', () => {
  let component: SdltDashboardComponent;
  let fixture: ComponentFixture<SdltDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdltDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdltDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

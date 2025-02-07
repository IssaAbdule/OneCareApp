import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffActivityChartComponent } from './staff-activity-chart.component';

describe('StaffActivityChartComponent', () => {
  let component: StaffActivityChartComponent;
  let fixture: ComponentFixture<StaffActivityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffActivityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffActivityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

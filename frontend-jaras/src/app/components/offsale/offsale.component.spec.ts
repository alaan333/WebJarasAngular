import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsaleComponent } from './offsale.component';

describe('OffsaleComponent', () => {
  let component: OffsaleComponent;
  let fixture: ComponentFixture<OffsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffsaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

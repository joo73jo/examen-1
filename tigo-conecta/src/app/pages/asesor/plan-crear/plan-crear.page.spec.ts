import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanCrearPage } from './plan-crear.page';

describe('PlanCrearPage', () => {
  let component: PlanCrearPage;
  let fixture: ComponentFixture<PlanCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

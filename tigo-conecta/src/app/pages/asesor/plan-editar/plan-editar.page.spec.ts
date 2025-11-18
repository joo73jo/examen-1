import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanEditarPage } from './plan-editar.page';

describe('PlanEditarPage', () => {
  let component: PlanEditarPage;
  let fixture: ComponentFixture<PlanEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

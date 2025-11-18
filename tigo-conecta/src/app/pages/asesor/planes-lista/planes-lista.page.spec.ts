import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesListaPage } from './planes-lista.page';

describe('PlanesListaPage', () => {
  let component: PlanesListaPage;
  let fixture: ComponentFixture<PlanesListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContratacionesListaPage } from './contrataciones-lista.page';

describe('ContratacionesListaPage', () => {
  let component: ContratacionesListaPage;
  let fixture: ComponentFixture<ContratacionesListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratacionesListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContratacionesService } from '../../../core/contrataciones.service';

@Component({
  standalone: true,
  selector: 'app-contrataciones-lista',
  templateUrl: './contrataciones-lista.page.html',
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class ContratacionesListaPage {

  private contratacionesService = inject(ContratacionesService);

  contrataciones: any[] = [];
  cargando = true;

  async ionViewWillEnter() {
    this.cargando = true;

    try {
      this.contrataciones = await this.contratacionesService.obtenerTodasLasContrataciones();
    } catch (err) {
      console.error('ERROR AL CARGAR CONTRATACIONES:', err);
    } finally {
      this.cargando = false;
    }
  }
}

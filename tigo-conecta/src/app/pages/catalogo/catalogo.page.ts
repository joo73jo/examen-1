import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PlanesService } from '../../core/planes.service';

@Component({
  standalone: true,
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  imports: [
    IonicModule,
    CommonModule,
    RouterModule // necesario para routerLink en el HTML
  ],
})
export class CatalogoPage {

  private planesService = inject(PlanesService);
  private router = inject(Router);

  planes: any[] = [];
  cargando = true;

  // si es true → estamos en /usuario/catalogo (usuario registrado)
  // si es false → estamos en /catalogo (invitado)
  esUsuarioRegistrado = false;

  async ionViewWillEnter() {
    // Detectar contexto según la URL actual
    this.esUsuarioRegistrado = this.router.url.startsWith('/usuario');

    try {
      this.planes = await this.planesService.obtenerPlanesActivos();
    } catch (err) {
      console.error('ERROR AL CARGAR PLANES:', err);
      this.planes = [];
    } finally {
      this.cargando = false;
    }
  }

  verDetalle(id: number) {
    // Invitado → detalle público
    // Usuario registrado → detalle de usuario
    if (this.esUsuarioRegistrado) {
      this.router.navigate(['/usuario/detalle', id]);
    } else {
      this.router.navigate(['/detalle', id]);
    }
  }
}

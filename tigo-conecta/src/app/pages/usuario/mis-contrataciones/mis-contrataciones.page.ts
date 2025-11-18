import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ContratacionesService } from '../../../core/contrataciones.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './mis-contrataciones.page.html',
  imports: [IonicModule, CommonModule]
})
export class MisContratacionesPage {
  contrataciones: any[] = [];

  private service = inject(ContratacionesService);
  private router = inject(Router);

  async ionViewWillEnter() {
    this.contrataciones = await this.service.obtenerMisContrataciones();
  }

  abrirChat(id: number) {
    this.router.navigateByUrl('/usuario/chat/' + id);
  }
}

import { Component, inject } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PlanesService } from '../../../core/planes.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './planes-lista.page.html'
})
export class PlanesListaPage {
  planes: any[] = [];

  private planesService = inject(PlanesService);
  private router = inject(Router);
  private alert = inject(AlertController);
  private toast = inject(ToastController);

  async ionViewWillEnter() {
    this.planes = await this.planesService.obtenerPlanesAsesor();
  }

  editar(id: number) {
    this.router.navigateByUrl('/asesor/planes/editar/' + id);
  }

  crear() {
    this.router.navigateByUrl('/asesor/planes/crear');
  }

  async eliminar(id: number) {
    const al = await this.alert.create({
      header: 'Confirmar',
      message: '¿Eliminar este plan?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.planesService.eliminarPlan(id);
            this.planes = await this.planesService.obtenerPlanesAsesor();
            const t = await this.toast.create({ message: 'Eliminado', duration: 1000 });
            t.present();
          }
        }
      ]
    });

    await al.present();
  }
}

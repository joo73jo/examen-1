import { Component, inject } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlanesService } from '../../core/planes.service';
import { ContratacionesService } from '../../core/contrataciones.service';

@Component({
  standalone: true,
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.page.html',
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class DetallePlanPage {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private planesService = inject(PlanesService);
  private contratacionesService = inject(ContratacionesService);
  private toastCtrl = inject(ToastController);

  plan: any = null;
  cargando = true;
  esUsuarioRegistrado = false; // true si vino desde /usuario/detalle/:id

  async ionViewWillEnter() {
    this.cargando = true;
    this.esUsuarioRegistrado = this.router.url.startsWith('/usuario');

    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id) {
      this.cargando = false;
      const t = await this.toastCtrl.create({
        message: 'Plan no encontrado',
        duration: 1500
      });
      await t.present();
      this.router.navigateByUrl('/catalogo');
      return;
    }

    try {
      this.plan = await this.planesService.obtenerPlanPorId(id);
    } catch (err) {
      console.error('ERROR AL CARGAR PLAN:', err);
      const t = await this.toastCtrl.create({
        message: 'Error al cargar el plan',
        duration: 1500
      });
      await t.present();
      this.router.navigateByUrl('/catalogo');
    } finally {
      this.cargando = false;
    }
  }

  async contratar() {
    if (!this.plan) return;

    try {
      await this.contratacionesService.contratarPlan(this.plan.id);

      const t = await this.toastCtrl.create({
        message: 'Solicitud de contratación enviada',
        duration: 1500
      });
      await t.present();

      // después de contratar, llevar a mis contrataciones
      this.router.navigateByUrl('/usuario/mis-contrataciones');

    } catch (err: any) {
      console.error('ERROR CONTRATACIÓN:', err);
      const t = await this.toastCtrl.create({
        message: err.message || 'No se pudo contratar el plan',
        duration: 2000
      });
      await t.present();
    }
  }
}

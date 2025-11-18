import { Component, inject } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanesService } from '../../../core/planes.service';

@Component({
  standalone: true,
  selector: 'app-plan-editar',
  templateUrl: './plan-editar.page.html',
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PlanEditarPage {

  private route = inject(ActivatedRoute);
  private planes = inject(PlanesService);
  private router = inject(Router);
  private toast = inject(ToastController);

  plan: any = null;
  archivo?: File;

  async ionViewWillEnter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const todos = await this.planes.obtenerPlanesAsesor();
    this.plan = todos.find(p => p.id === id);
  }

  onFile(event: any) {
    this.archivo = event.target.files?.[0];
  }

  async guardar() {
    try {
      await this.planes.editarPlan(
        this.plan.id,
        {
          nombre_comercial: this.plan.nombre_comercial,
          precio_mensual: this.plan.precio_mensual,
          datos_gb: this.plan.datos_gb
        },
        this.archivo
      );
      this.router.navigateByUrl('/asesor/planes');
    } catch (err: any) {
      const t = await this.toast.create({ message: err.message, duration: 1500 });
      t.present();
    }
  }
}

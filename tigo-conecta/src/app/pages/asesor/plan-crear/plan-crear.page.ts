import { Component, inject } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanesService } from '../../../core/planes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './plan-crear.page.html'
})
export class PlanCrearPage {
  nombre = '';
  precio = 0;
  datos = '';
  archivo: File | null = null;

  private planes = inject(PlanesService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastController);

  onFile(event: any) {
    this.archivo = event.target.files[0];
  }

  async crear() {
    try {
      const perfil = await this.auth.getProfile();

      await this.planes.crearPlan({
        nombre_comercial: this.nombre,
        precio_mensual: this.precio,
        datos_gb: this.datos,
        created_by: perfil.id
      }, this.archivo);

      this.router.navigateByUrl('/asesor/planes');
    } catch (err: any) {
      const t = await this.toast.create({ message: err.message, duration: 1500 });
      t.present();
    }
  }
}

import { Component, inject } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RegistroPage {

  nombre = '';
  apellido = '';
  email = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastController);

  async registrar() {
    try {

      await this.auth.signUp({
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        password: this.password
      });

      const t = await this.toast.create({
        message: 'Cuenta creada correctamente',
        duration: 1500
      });

      await t.present();
      this.router.navigateByUrl('/login');

    } catch (err: any) {

      const t = await this.toast.create({
        message: err.message,
        duration: 2000
      });

      t.present();
    }
  }
}

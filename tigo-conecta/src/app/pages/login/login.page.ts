import { Component, inject } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ← IMPORTANTE
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule    // ← NECESARIO PARA routerLink
  ]
})
export class LoginPage {

  email = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastController);

  async login() {
    try {
      await this.auth.signIn(this.email, this.password);

      const perfil = await this.auth.getProfile();

      if (perfil?.rol === 'asesor_comercial') {
        this.router.navigateByUrl('/asesor/dashboard');
      } else {
        this.router.navigateByUrl('/usuario/catalogo');
      }

    } catch (err: any) {
      const t = await this.toast.create({
        message: err.message,
        duration: 1500
      });
      await t.present();
    }
  }
}

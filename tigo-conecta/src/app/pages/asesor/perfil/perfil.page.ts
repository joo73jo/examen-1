import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './perfil.page.html'
})
export class PerfilAsesorPage {
  perfil: any = null;

  private auth = inject(AuthService);
  private router = inject(Router);

  async ionViewWillEnter() {
    this.perfil = await this.auth.getProfile();
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}

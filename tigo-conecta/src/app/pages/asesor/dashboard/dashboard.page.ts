import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './dashboard.page.html'
})
export class DashboardPage {
  private router = inject(Router);

  irPlanes() { this.router.navigateByUrl('/asesor/planes'); }
  irContrataciones() { this.router.navigateByUrl('/asesor/contrataciones'); }
  irPerfil() { this.router.navigateByUrl('/asesor/perfil'); }
}

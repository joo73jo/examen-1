import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './home.page.html',
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  private router = inject(Router);

  irCatalogo() { this.router.navigateByUrl('/'); }
  irContrataciones() { this.router.navigateByUrl('/usuario/mis-contrataciones'); }
  irPerfil() { this.router.navigateByUrl('/usuario/perfil'); }
}

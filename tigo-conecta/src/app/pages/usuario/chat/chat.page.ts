import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../core/chat.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-chat-usuario',
  templateUrl: './chat.page.html',
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatPage {

  private route = inject(ActivatedRoute);
  private chatService = inject(ChatService);
  private auth = inject(AuthService);

  mensajes: any[] = [];
  nuevo = '';
  contratacionId = 0;
  esAsesor = false;
  suscripcion: any;

  async ionViewWillEnter() {
    this.contratacionId = Number(this.route.snapshot.paramMap.get('id'));

    const perfil = await this.auth.getProfile();
    this.esAsesor = perfil?.rol === 'asesor_comercial';

    this.mensajes = await this.chatService.obtenerMensajes(this.contratacionId);

    this.suscripcion = this.chatService.suscribirAlChat(
      this.contratacionId,
      (m: any) => this.mensajes.push(m)
    );
  }

  ionViewWillLeave() {
    if (this.suscripcion && this.suscripcion.unsubscribe) {
      this.suscripcion.unsubscribe();
    }
  }

  async enviar() {
    if (!this.nuevo.trim()) return;
    await this.chatService.enviarMensaje(this.contratacionId, this.nuevo, this.esAsesor);
    this.nuevo = '';
  }
}

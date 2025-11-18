import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private supa: SupabaseService) {}

  async obtenerMensajes(contratacionId: number) {
    const { data, error } = await this.supa.client
      .from('mensajes_chat')
      .select('*')
      .eq('contratacion_id', contratacionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async enviarMensaje(contratacionId: number, mensaje: string, esAsesor: boolean) {
    const { data: { user } } = await this.supa.client.auth.getUser();
    if (!user) throw new Error('No autenticado');

    const { error } = await this.supa.client.from('mensajes_chat').insert({
      contratacion_id: contratacionId,
      remitente_id: user.id,
      mensaje,
      es_asesor: esAsesor
    });

    if (error) throw error;
  }

  suscribirAlChat(contratacionId: number, callback: (msg: any) => void) {
    return this.supa.client
      .channel(`chat-${contratacionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes_chat',
          filter: `contratacion_id=eq.${contratacionId}`
        },
        payload => callback(payload.new)
      )
      .subscribe();
  }
}

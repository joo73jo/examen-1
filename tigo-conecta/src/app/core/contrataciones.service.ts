import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ContratacionesService {

  constructor(private supa: SupabaseService) {}

  /**
   * Crear una contratación para el usuario autenticado
   */
  async contratarPlan(planId: number, notaUsuario: string = '') {

    // 1. Obtener sesión actual (auth.users)
    const sessionResp = await this.supa.client.auth.getSession();
    const session = sessionResp.data.session;

    if (!session) {
      throw new Error('Debe iniciar sesión para contratar un plan');
    }

    // UUID del usuario autenticado en auth.users
    const authUserId = session.user.id;

    // 2. Obtener el perfil cuyo usuario_id == authUserId
    const { data: perfilData, error: perfilErr } = await this.supa.client
      .from('perfiles')
      .select('id')
      .eq('usuario_id', authUserId)
      .single();

    if (perfilErr || !perfilData) {
      console.error('ERROR PERFIL:', perfilErr);
      throw new Error('No se encontró el perfil del usuario.');
    }

    // ESTE es el UUID que exige tu foreign key
    const perfilId = perfilData.id;

    // 3. Insertar contratación usando perfiles.id (NO session.user.id)
    const { error } = await this.supa.client
      .from('contrataciones')
      .insert({
        usuario_id: perfilId,               // ← CORRECTO
        plan_id: planId,
        estado: 'pendiente',
        fecha_solicitud: new Date().toISOString(),
        nota_usuario: notaUsuario
      });

    if (error) {
      console.error('ERROR INSERT:', error);
      throw error;
    }

    return true;
  }

  /**
   * Obtener contrataciones del usuario autenticado
   */
  async obtenerMisContrataciones() {
    const sessionResp = await this.supa.client.auth.getSession();
    const session = sessionResp.data.session;

    if (!session) {
      throw new Error('Debe iniciar sesión');
    }

    const authUserId = session.user.id;

    // Obtener el id de perfil REAL
    const { data: perfilData, error: perfilErr } = await this.supa.client
      .from('perfiles')
      .select('id')
      .eq('usuario_id', authUserId)
      .single();

    if (perfilErr || !perfilData) throw new Error('Perfil no encontrado.');

    const perfilId = perfilData.id;

    const { data, error } = await this.supa.client
      .from('contrataciones')
      .select(`
        id,
        estado,
        fecha_solicitud,
        nota_usuario,
        planes_moviles ( id, nombre_comercial, precio_mensual )
      `)
      .eq('usuario_id', perfilId)
      .order('fecha_solicitud', { ascending: false });

    if (error) throw error;

    return data || [];
  }

  /**
   * Obtener TODAS las contrataciones (asesor)
   */
  async obtenerTodasLasContrataciones() {

    const { data, error } = await this.supa.client
      .from('contrataciones')
      .select(`
        id,
        estado,
        fecha_solicitud,
        nota_usuario,
        usuario_id,
        planes_moviles ( id, nombre_comercial, precio_mensual )
      `)
      .order('fecha_solicitud', { ascending: false });

    if (error) throw error;

    return data || [];
  }
}

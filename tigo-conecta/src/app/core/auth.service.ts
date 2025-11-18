import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private supa: SupabaseService) {}

  /**
   * Registro con creación de perfil completo
   */
  async signUp(data: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
  }) {

    // 1. Crear usuario en auth
    const { data: authData, error: authError } = await this.supa.client.auth.signUp({
      email: data.email,
      password: data.password
    });

    if (authError) throw authError;

    const user = authData.user;
    if (!user) throw new Error('Error creando usuario.');

    // 2. Crear perfil en tabla perfiles
    const { error: perfilError } = await this.supa.client
      .from('perfiles')
      .insert({
        usuario_id: user.id,     // FK a auth.users
        email: data.email,
        nombre: data.nombre,
        apellido: data.apellido,
        rol: 'usuario_registrado'
      });

    if (perfilError) throw new Error('No se pudo crear el perfil.');

    return true;
  }

  /**
   * Login
   */
  async signIn(email: string, password: string) {
    const { error } = await this.supa.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile() {
    const sessionResp = await this.supa.client.auth.getSession();
    const session = sessionResp.data.session;

    if (!session) return null;

    const authUserId = session.user.id;

    const { data, error } = await this.supa.client
      .from('perfiles')
      .select('*')
      .eq('usuario_id', authUserId)
      .single();

    if (error) return null;

    return data;
  }

  /**
   * Cerrar sesión
   */
  async signOut() {
    await this.supa.client.auth.signOut();
  }
}

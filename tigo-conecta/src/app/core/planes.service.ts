import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  constructor(private supa: SupabaseService) {}

  async obtenerPlanesActivos() {
    const tabla = 'planes_moviles';

    const { data, error } = await this.supa.client
      .from(tabla)
      .select('*')
      // .eq('activo', true) // si no tienes este campo, déjalo comentado
      .order('id', { ascending: true });

    if (error) {
      console.error('ERROR SUPABASE:', error);
      return [];
    }

    return data || [];
  }

  async obtenerPlanesAsesor() {
    const { data, error } = await this.supa.client
      .from('planes_moviles')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data;
  }

  async obtenerPlanPorId(id: number) {
    const { data, error } = await this.supa.client
      .from('planes_moviles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async crearPlan(plan: any, archivo: File | null) {
    const { data, error } = await this.supa.client
      .from('planes_moviles')
      .insert(plan)
      .select()
      .single();

    if (error) throw error;

    if (archivo) {
      const ext = archivo.name.split('.').pop();
      const filePath = `plan-${data.id}-${Date.now()}.${ext}`;

      const upload = await this.supa.client.storage
        .from('planes-imagenes')
        .upload(filePath, archivo);

      if (upload.error) throw upload.error;

      const { data: pub } = this.supa.client.storage
        .from('planes-imagenes')
        .getPublicUrl(filePath);

      await this.supa.client
        .from('planes_moviles')
        .update({ imagen_url: pub.publicUrl })
        .eq('id', data.id);
    }

    return true;
  }

  async editarPlan(id: number, plan: any, archivo?: File) {
    const { error } = await this.supa.client
      .from('planes_moviles')
      .update(plan)
      .eq('id', id);

    if (error) throw error;

    if (archivo) {
      const ext = archivo.name.split('.').pop();
      const filePath = `plan-${id}-${Date.now()}.${ext}`;

      const upload = await this.supa.client.storage
        .from('planes-imagenes')
        .upload(filePath, archivo);

      if (upload.error) throw upload.error;

      const { data: pub } = this.supa.client.storage
        .from('planes-imagenes')
        .getPublicUrl(filePath);

      await this.supa.client
        .from('planes_moviles')
        .update({ imagen_url: pub.publicUrl })
        .eq('id', id);
    }

    return true;
  }

  async eliminarPlan(id: number) {
    const { error } = await this.supa.client
      .from('planes_moviles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
}

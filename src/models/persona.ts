export interface Persona {
  id: number;
  nombre: string;
  segundoNombre?: string;
  apellido: string;
  segundoApellido?: string;
  cedula: string;
  fechaNacimiento: Date;
  fechaExpedicion: Date;
}

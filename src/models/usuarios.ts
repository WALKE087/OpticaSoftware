export interface Usuario {
  id?: number;
  nombre: string;
  segundoNombre?: string;
  apellido: string;
  segundoApellido?: string;
  cedula: string;
  fechaNacimiento: Date;
  fechaExpedicion: Date;
  correo: string;
  contraseña: string;
  rolId: number;
}

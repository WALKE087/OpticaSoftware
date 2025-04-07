export interface Pacientes {
  id: number;
  nombre_completo: string;
  fecha_nacimiento: string;
  sexo: "M" | "F";
  documento_identidad: string;
  telefono_contacto: string;
  correo_electronico: string;
}

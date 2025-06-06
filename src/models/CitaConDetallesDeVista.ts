export interface CitaConDetallesDeVista {
  cita_id: number;
  id_paciente: number;
  paciente_nombre_completo: string;
  paciente_documento_identidad: string;
  paciente_sexo: "M" | "F" | "O" | null;
  paciente_fecha_nacimiento: string;
  paciente_telefono_contacto: string;
  paciente_correo_electronico: string | null;
  fecha_hora_cita: string;
  tipo_cita: string | null;
  estado_cita:
    | "Programada"
    | "Confirmada"
    | "Cancelada_Paciente"
    | "Cancelada_Clinica"
    | "Completada"
    | "No_Asistio"
    | "Reprogramada"
    | null;
  cita_notas: string | null;
  fecha_registro_cita: string;
}

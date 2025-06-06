export interface CitaData {
  id_paciente: number;
  fecha_hora_cita: string;
  tipo_cita?: string;
  estado_cita?:
    | "Programada"
    | "Confirmada"
    | "Cancelada_Paciente"
    | "Cancelada_Clinica"
    | "Completada"
    | "No_Asistio"
    | "Reprogramada";
  notas?: string;
}

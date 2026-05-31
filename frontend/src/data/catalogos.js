export const estados = [
  "Registrado",
  "En revisión",
  "Observado",
  "Aprobado",
  "Rechazado",
  "Finalizado",
];

export const prioridades = ["Alta", "Media", "Baja"];

export const tiposTramite = [
  "Licencia de funcionamiento",
  "Permiso de construcción",
  "Trámite de catastro",
  "Reclamo ciudadano",
  "Constancia municipal",
  "Solicitud de acceso a información",
];

export const areas = [
  "Mesa de partes",
  "Desarrollo urbano",
  "Catastro",
  "Licencias",
  "Atención ciudadana",
  "Secretaría general",
];

export const initialForm = {
  ciudadano: "",
  dni: "",
  tipo_tramite: "Licencia de funcionamiento",
  area: "Mesa de partes",
  urgencia: "Media",
  documentos_completos: true,
  descripcion: "",
};

export const initialFeedback = {
  tramite_id: "",
  ciudadano: "",
  calificacion: 5,
  comentario: "",
};
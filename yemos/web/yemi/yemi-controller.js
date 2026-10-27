import responses from "./responses.json" assert { type: "json" };
import { keywords } from "./keywords.js";

export function yemiReply(message, user) {
  const msg = message.toLowerCase();
  const role = user.role || "usuario";

  // 1. Respuestas generales (saludo, etc.)
  for (const [key, triggers] of Object.entries(keywords.general)) {
    if (triggers.some(t => msg.includes(t))) {
      return responses.general[key];
    }
  }

  // 2. Respuestas específicas por rol (finanzas, it, usuario)
  if (keywords[role]) {
    for (const [key, triggers] of Object.entries(keywords[role])) {
      if (triggers.some(t => msg.includes(t))) {
        return responses[role][key];
      }
    }
  }

  // 3. Si el rol no tiene respuesta propia, buscar en usuario
  for (const [key, triggers] of Object.entries(keywords.usuario)) {
    if (triggers.some(t => msg.includes(t))) {
      return responses.usuario[key];
    }
  }

  // 4. Si no se encuentra ninguna coincidencia
  return responses.general.no_entendido;
}

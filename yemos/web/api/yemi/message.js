import { yemiReply } from "../web/yemi/yemi-controller.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { message, user } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Falta el mensaje" });
  }

  const reply = yemiReply(message, user);

  res.status(200).json({ reply });
}

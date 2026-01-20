import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { fetchJogosPorData } from "../lib/scraper";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function handler(req, res) {
  try {
    // Data de hoje no fuso do Brasil
    const hoje = dayjs()
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD");

    const jogos = await fetchJogosPorData(hoje);

    // Garantia absoluta de retorno válido
    if (!Array.isArray(jogos)) {
      return res.status(200).json({
        date: hoje,
        total: 0,
        jogos: []
      });
    }

    return res.status(200).json({
      date: hoje,
      total: jogos.length,
      jogos
    });

  } catch (error) {
    console.error("Erro /api/today:", error);

    return res.status(500).json({
      date: null,
      total: 0,
      jogos: [],
      error: "Erro interno ao buscar jogos de hoje"
    });
  }
}

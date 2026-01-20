import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { fetchJogosPorData } from "../../lib/scraper"; // ajuste o path conforme o seu projeto

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function handler(req, res) {
  try {
    const hoje = dayjs().tz("America/Sao_Paulo").format("YYYY-MM-DD");
    
    // chama a função que faz scraping por data
    const jogos = await fetchJogosPorData(hoje);

    // validação de retorno
    if (!Array.isArray(jogos) || jogos.length === 0) {
      return res.status(200).json({ jogos: [], message: "Nenhum jogo encontrado" });
    }

    return res.status(200).json({ jogos });
  } catch (error) {
    console.error("Erro na API /today:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

import { fetchJogosLive } from "../lib/scraper";

export default async function handler(req, res) {
  try {
    const jogos = await fetchJogosLive();

    // Garantia absoluta de retorno válido
    if (!Array.isArray(jogos)) {
      return res.status(200).json({
        live: true,
        total: 0,
        jogos: []
      });
    }

    return res.status(200).json({
      live: true,
      total: jogos.length,
      jogos
    });

  } catch (error) {
    console.error("Erro /api/live:", error);

    return res.status(500).json({
      live: true,
      total: 0,
      jogos: [],
      error: "Erro interno ao buscar jogos ao vivo"
    });
  }
}

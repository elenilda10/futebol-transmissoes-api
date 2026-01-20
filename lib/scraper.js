import cheerio from "cheerio";

export async function fetchHTML(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
    });

    if (!response.ok) return null;
    return await response.text();
  } catch (err) {
    console.error("Erro no fetchHTML:", err);
    return null;
  }
}

export function safeText(el, selector) {
  try {
    const found = el.find(selector);
    return found && found.length ? found.text().trim() : "";
  } catch {
    return "";
  }
}

export async function fetchJogosPorData(date) {
  const url = `https://SITE-ORIGEM-AQUI?date=${date}`;

  const html = await fetchHTML(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const jogos = [];

  $(".match-card").each((_, card) => {
    const el = $(card);

    jogos.push({
      home: safeText(el, ".team-home"),
      away: safeText(el, ".team-away"),
      time: safeText(el, ".match-time"),
      campeonato: safeText(el, ".competition-name"),
    });
  });

  return jogos;
}

export async function fetchJogosLive() {
  const url = `https://SITE-ORIGEM-AQUI/live`;

  const html = await fetchHTML(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const jogos = [];

  $(".match-live").each((_, card) => {
    const el = $(card);

    jogos.push({
      home: safeText(el, ".team-home"),
      away: safeText(el, ".team-away"),
      minuto: safeText(el, ".live-minute"),
      campeonato: safeText(el, ".competition-name"),
    });
  });

  return jogos;
}

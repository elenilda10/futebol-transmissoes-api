import data from "../../data/games.json";

export default function handler(req, res) {
  const liveGames = data.games.filter(
    g => g.status === "live"
  );

  res.status(200).json({
    ok: true,
    games: liveGames
  });
}

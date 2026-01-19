import data from "../../data/games.json";

export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    updated_at: data.updated_at,
    games: data.games
  });
}

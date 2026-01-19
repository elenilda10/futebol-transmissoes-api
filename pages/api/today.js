import data from "../../data/games.json";

export default function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);

  const gamesToday = data.games.filter(
    g => g.schedule.date === today
  );

  res.status(200).json({
    ok: true,
    date: today,
    games: gamesToday
  });
}

import data from "../../data/games.json";

const GAME_DURATION_MINUTES = 120;

export default function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();

  const gamesToday = data.games
    .filter(g => g.schedule.date === today)
    .map(game => {
      const start = new Date(
        `${game.schedule.date}T${game.schedule.time}:00`
      );
      const end = new Date(
        start.getTime() + GAME_DURATION_MINUTES * 60000
      );

      let status = "scheduled";
      if (now >= start && now <= end) status = "live";
      else if (now > end) status = "finished";

      return { ...game, status };
    });

  res.status(200).json({
    ok: true,
    date: today,
    games: gamesToday
  });
}

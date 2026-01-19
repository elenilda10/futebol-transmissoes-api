export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    status: "online",
    time: new Date().toISOString()
  });
}

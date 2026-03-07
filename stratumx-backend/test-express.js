import express from "express";
const app = express();
app.get("/", (req, res) => res.json({ ok: true }));
app.listen(5001, () => {
  console.log("Minimal server listening on 5001");
});

const express = require("express");
const app = express();

const pastes = require("./data/pastes-data");

// TODO: Follow instructions in the checkpoint to implement ths API.

app.use("/pastes/:pasteId", (req, res, nxt) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    nxt(`Paste id not found: ${pasteId}`);
  }
});

app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
});

let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);
app.post("/pastes", (req, res) => {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
    req.body;
  const newPaste = {
    id: ++lastPasteId,
    name,
    syntax,
    exposure,
    expiration,
    text,
    user_id,
  };
  pastes.push(newPaste);
  res.json({ data: newPaste });
});

// Not found handler
app.use((req, res, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  response.send(err);
});

module.exports = app;

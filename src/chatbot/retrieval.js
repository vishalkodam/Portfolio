function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  const t = normalize(text);
  if (!t) return [];
  const raw = t.split(" ");
  // tiny stopword list to reduce noise
  const stop = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "but",
    "by",
    "for",
    "from",
    "has",
    "have",
    "he",
    "her",
    "his",
    "i",
    "in",
    "is",
    "it",
    "me",
    "my",
    "of",
    "on",
    "or",
    "our",
    "she",
    "that",
    "the",
    "their",
    "they",
    "this",
    "to",
    "was",
    "were",
    "what",
    "when",
    "where",
    "who",
    "with",
    "you",
    "your",
  ]);
  return raw.filter((w) => w && w.length >= 2 && !stop.has(w));
}

export function chunkKnowledge(markdown) {
  const lines = (markdown || "").split(/\r?\n/);
  const chunks = [];

  let current = { title: "General", level: 0, text: "" };

  function pushCurrent() {
    const text = current.text.trim();
    if (!text) return;
    chunks.push({
      title: current.title,
      level: current.level,
      text,
    });
  }

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)\s*$/);
    const h3 = line.match(/^###\s+(.*)\s*$/);

    if (h2) {
      pushCurrent();
      current = { title: h2[1].trim(), level: 2, text: "" };
      continue;
    }
    if (h3) {
      // keep H3 as a separate sub-chunk
      pushCurrent();
      current = { title: h3[1].trim(), level: 3, text: "" };
      continue;
    }

    current.text += `${line}\n`;
  }

  pushCurrent();
  return chunks;
}

function scoreChunk(queryTokens, chunk) {
  const hay = `${chunk.title}\n${chunk.text}`;
  const hayTokens = tokenize(hay);
  if (!queryTokens.length || !hayTokens.length) return 0;

  const haySet = new Set(hayTokens);
  let hits = 0;
  for (const t of queryTokens) if (haySet.has(t)) hits++;

  // small boost if tokens appear in title words
  const titleTokens = new Set(tokenize(chunk.title));
  let titleHits = 0;
  for (const t of queryTokens) if (titleTokens.has(t)) titleHits++;

  const base = hits / Math.sqrt(hayTokens.length);
  const titleBoost = titleHits * 0.6;
  const levelBoost = chunk.level === 2 ? 0.15 : chunk.level === 3 ? 0.1 : 0;
  return base + titleBoost + levelBoost;
}

export function retrieveTopChunks({ question, knowledgeMarkdown, maxChunks = 5 }) {
  const chunks = chunkKnowledge(knowledgeMarkdown);
  const queryTokens = tokenize(question);

  const scored = chunks
    .map((c) => ({ ...c, score: scoreChunk(queryTokens, c) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks);

  return scored.map(({ title, text }) => ({ title, text }));
}


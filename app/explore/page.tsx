"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface CardItem {
  emoji: string;
  question: string;
  tag: string;
}

interface AnswerSection {
  title: string;
  content: string;
}

interface AIResponse {
  tldr: string;
  sections: AnswerSection[];
  concepts: string[];
  funFact: string;
  experiment: string;
  quiz: { question: string; options: string[]; answer: number };
}

// ── Data ───────────────────────────────────────────────────────────────────
const TAGS = ["All", "Physics", "Biology", "Chemistry", "Electronics", "Optics", "Earth"];

const CARDS: CardItem[] = [
  { emoji: "🧅", question: "Why do onions make us cry?", tag: "Biology" },
  { emoji: "🧊", question: "Why does ice float on water?", tag: "Physics" },
  { emoji: "📱", question: "Why do phone batteries get hot?", tag: "Electronics" },
  { emoji: "🌧️", question: "Why does rain have a smell?", tag: "Chemistry" },
  { emoji: "💨", question: "Why does a fan cool you down?", tag: "Physics" },
  { emoji: "🪞", question: "Why do mirrors flip left and right?", tag: "Optics" },
  { emoji: "🕯️", question: "Why does a candle flicker?", tag: "Physics" },
  { emoji: "🌈", question: "Why do rainbows appear after rain?", tag: "Optics" },
  { emoji: "🔥", question: "Why didn't the paper burn with water inside?", tag: "Chemistry" },
  { emoji: "🧲", question: "Why do magnets attract?", tag: "Physics" },
  { emoji: "🌊", question: "Why does the ocean appear blue?", tag: "Earth" },
  { emoji: "🫧", question: "Why are bubbles always round?", tag: "Physics" },
  { emoji: "🧂", question: "Why does salt melt ice?", tag: "Chemistry" },
  { emoji: "🌙", question: "Why does the moon look bigger near the horizon?", tag: "Optics" },
  { emoji: "🦟", question: "Why do mosquito bites itch?", tag: "Biology" },
  { emoji: "⚡", question: "Why do we get static shocks?", tag: "Physics" },
  { emoji: "🍞", question: "Why does bread rise when baked?", tag: "Biology" },
  { emoji: "🌡️", question: "Why does metal feel colder than wood?", tag: "Physics" },
];

// ── Gemini API call ────────────────────────────────────────────────────────
async function askGemini(question: string): Promise<AIResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are DailyWhy, a STEM learning AI for curious students aged 10–16.
Answer this question: "${question}"

Respond ONLY with a valid JSON object in this exact shape:
{
  "tldr": "One punchy sentence answer (max 20 words)",
  "sections": [
    { "title": "What's actually happening", "content": "2–3 sentence explanation, plain language" },
    { "title": "The science behind it", "content": "2–3 sentences on the core STEM concept" }
  ],
  "concepts": ["concept1", "concept2", "concept3"],
  "funFact": "One surprising related fact",
  "experiment": "One safe, simple at-home experiment in 2 sentences",
  "quiz": {
    "question": "A short multiple-choice question about this topic",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0
  }
}
Return only JSON, no markdown, no backticks.`,
              },
            ],
          },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    }
  );
  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const clean = raw.replace(/```json|```/g, "").trim();
  console.log("RAW:", clean);
  return JSON.parse(clean) as AIResponse;
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function ExplorePage() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = CARDS.filter((c) => {
    const matchTag = activeTag === "All" || c.tag === activeTag;
    const matchSearch = c.question.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  async function handleAsk(question: string) {
    if (loading) return;
    setActiveQuestion(question);
    setAnswer(null);
    setSelectedOption(null);
    setError(null);
    setLoading(true);
    try {
      const result = await askGemini(question);
      setAnswer(result);
    } catch {
      setError("Couldn't get an answer. Check your API key or try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) handleAsk(query.trim());
  }

  return (
    <div className="flex flex-col h-screen bg-[#0A0E1A] text-[#F0F4FF] overflow-hidden">
      {/* ── TOP BAR ── */}
      <header className="flex-none flex items-center gap-4 px-5 py-3 border-b border-white/8 bg-[#0A0E1A]">
        <Link href="/" className="font-syne font-bold text-lg shrink-0">
          Daily<span className="text-[#4F9EFF]">Why</span>
        </Link>

        <form onSubmit={handleSearch} className="flex flex-1 max-w-xl items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899BB] text-sm">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your own why question…"
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/6 border border-white/10 text-sm font-inter text-white placeholder-[#8899BB] focus:outline-none focus:border-[#4F9EFF]/60 focus:bg-white/8 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="px-4 py-2 rounded-lg bg-[#4F9EFF] text-[#0A0E1A] font-syne font-bold text-sm disabled:opacity-40 hover:bg-[#7DB8FF] transition-colors shrink-0"
          >
            Ask
          </button>
        </form>
      </header>

      {/* ── BODY: sidebar + panel ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT: Cards ── */}
        <aside className="w-80 shrink-0 flex flex-col border-r border-white/8 overflow-hidden">
          {/* Tag filter */}
          <div className="flex-none px-3 py-2.5 border-b border-white/6 flex gap-1.5 overflow-x-auto no-scrollbar">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-inter font-medium transition-all ${
                  activeTag === t
                    ? "bg-[#4F9EFF] text-[#0A0E1A]"
                    : "bg-white/6 text-[#8899BB] hover:bg-white/10 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search filter */}
          <div className="flex-none px-3 py-2 border-b border-white/6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter cards…"
              className="w-full px-3 py-1.5 rounded-md bg-white/5 border border-white/8 text-xs font-inter text-white placeholder-[#8899BB] focus:outline-none focus:border-[#4F9EFF]/40 transition-all"
            />
          </div>

          {/* Card list */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {filtered.length === 0 && (
              <p className="text-xs text-[#8899BB] text-center pt-8 font-inter">No cards match</p>
            )}
            {filtered.map((card) => (
              <button
                key={card.question}
                onClick={() => handleAsk(card.question)}
                className={`w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl border transition-all duration-200 group ${
                  activeQuestion === card.question
                    ? "bg-[#4F9EFF]/12 border-[#4F9EFF]/50"
                    : "bg-white/3 border-white/6 hover:bg-white/6 hover:border-white/15"
                }`}
              >
                <span className="text-xl shrink-0 mt-0.5">{card.emoji}</span>
                <div className="min-w-0">
                  <p
                    className={`font-syne font-semibold text-xs leading-snug mb-1 ${
                      activeQuestion === card.question ? "text-[#4F9EFF]" : "text-white"
                    }`}
                  >
                    {card.question}
                  </p>
                  <span className="inline-block text-[9px] font-inter uppercase tracking-wide text-[#2DD4BF] bg-[#2DD4BF]/10 px-1.5 py-0.5 rounded-full">
                    {card.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ── RIGHT: Answer Panel ── */}
        <main className="flex-1 overflow-y-auto">
          {/* Empty state */}
          {!activeQuestion && !loading && (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <span className="text-6xl">🤔</span>
              <h2 className="font-syne font-bold text-2xl text-white">Pick a question</h2>
              <p className="font-inter text-sm text-[#8899BB] max-w-xs">
                Tap any curiosity card on the left, or type your own question above.
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-8 h-8 border-2 border-[#4F9EFF] border-t-transparent rounded-full animate-spin" />
              <p className="font-inter text-sm text-[#8899BB]">Thinking…</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-8">
              <span className="text-4xl">⚠️</span>
              <p className="font-inter text-sm text-[#F59E0B] text-center">{error}</p>
            </div>
          )}

          {/* Answer */}
          {answer && !loading && (
            <div className="px-8 py-8 max-w-2xl space-y-6">
              {/* Question heading */}
              <div>
                <p className="font-inter text-xs text-[#4F9EFF] uppercase tracking-widest mb-1">You asked</p>
                <h1 className="font-syne font-bold text-2xl text-white leading-tight">{activeQuestion}</h1>
              </div>

              {/* TL;DR */}
              <div className="px-5 py-4 rounded-xl bg-[#4F9EFF]/10 border border-[#4F9EFF]/25">
                <p className="font-syne font-semibold text-[#4F9EFF] text-sm mb-0.5 uppercase tracking-wide">
                  Short answer
                </p>
                <p className="font-inter text-white text-base leading-relaxed">{answer.tldr}</p>
              </div>

              {/* Sections */}
              {answer.sections.map((s) => (
                <div key={s.title}>
                  <h3 className="font-syne font-semibold text-white text-sm mb-2">{s.title}</h3>
                  <p className="font-inter text-[#C4D0E8] text-sm leading-relaxed">{s.content}</p>
                </div>
              ))}

              {/* Concepts */}
              <div>
                <p className="font-inter text-xs text-[#8899BB] uppercase tracking-widest mb-2">
                  STEM concepts
                </p>
                <div className="flex flex-wrap gap-2">
                  {answer.concepts.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs font-inter text-white"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fun fact */}
              <div className="flex gap-3 px-5 py-4 rounded-xl bg-[#F59E0B]/8 border border-[#F59E0B]/20">
                <span className="text-xl shrink-0">✨</span>
                <div>
                  <p className="font-syne font-semibold text-[#F59E0B] text-xs uppercase tracking-wide mb-1">
                    Fun fact
                  </p>
                  <p className="font-inter text-[#C4D0E8] text-sm leading-relaxed">{answer.funFact}</p>
                </div>
              </div>

              {/* Experiment */}
              <div className="flex gap-3 px-5 py-4 rounded-xl bg-[#2DD4BF]/8 border border-[#2DD4BF]/20">
                <span className="text-xl shrink-0">🧪</span>
                <div>
                  <p className="font-syne font-semibold text-[#2DD4BF] text-xs uppercase tracking-wide mb-1">
                    Try it yourself
                  </p>
                  <p className="font-inter text-[#C4D0E8] text-sm leading-relaxed">{answer.experiment}</p>
                </div>
              </div>

              {/* Quiz */}
              <div className="px-5 py-5 rounded-xl bg-white/4 border border-white/10">
                <p className="font-syne font-semibold text-white text-xs uppercase tracking-wide mb-3">
                  Quick quiz
                </p>
                <p className="font-inter text-white text-sm mb-4 leading-snug">{answer.quiz.question}</p>
                <div className="space-y-2">
                  {answer.quiz.options.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === answer.quiz.answer;
                    const revealed = selectedOption !== null;
                    let style = "bg-white/5 border-white/10 text-[#C4D0E8]";
                    if (revealed && isCorrect) style = "bg-[#2DD4BF]/15 border-[#2DD4BF]/50 text-[#2DD4BF]";
                    else if (revealed && isSelected) style = "bg-red-500/15 border-red-500/40 text-red-400";
                    return (
                      <button
                        key={i}
                        disabled={revealed}
                        onClick={() => setSelectedOption(i)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs font-inter transition-all ${style} ${
                          !revealed ? "hover:bg-white/10 hover:border-white/20" : ""
                        }`}
                      >
                        <span className="font-semibold mr-2 opacity-50">{["A", "B", "C", "D"][i]}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selectedOption !== null && (
                  <p className="mt-3 text-xs font-inter text-[#8899BB]">
                    {selectedOption === answer.quiz.answer
                      ? "✅ Correct! Great thinking."
                      : `❌ Not quite — the answer was ${["A", "B", "C", "D"][answer.quiz.answer]}.`}
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
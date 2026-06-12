"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const cyclingQuestions = [
  { emoji: "🧅", text: "Why do onions make us cry?" },
  { emoji: "🧊", text: "Why does ice float on water?" },
  { emoji: "📱", text: "Why do phone batteries get hot?" },
  { emoji: "🌧️", text: "Why does rain have a smell?" },
  { emoji: "🔥", text: "Why didn't the paper burn?" },
  { emoji: "💨", text: "Why does a fan cool you down?" },
];

const features = [
  {
    icon: "🔍",
    label: "Ask Anything",
    desc: "Type any why question and get a real science answer",
  },
  {
    icon: "🎴",
    label: "Curiosity Cards",
    desc: "Hundreds of questions to explore — no typing needed",
  },
  {
    icon: "📸",
    label: "Snap & Learn",
    desc: "Photo of anything → the science behind it",
  },
  {
    icon: "🧪",
    label: "Try It Yourself",
    desc: "Safe experiments you can do at home today",
  },
  {
    icon: "🌅",
    label: "Daily Why",
    desc: "A new real-world mystery every morning",
  },
  {
    icon: "🏆",
    label: "Earn as You Learn",
    desc: "Points and badges for every question explored",
  },
];

const previewCards = [
  { emoji: "🧅", q: "Why do onions make us cry?", tag: "Biology" },
  { emoji: "🧊", q: "Why does ice float?", tag: "Physics" },
  { emoji: "📱", q: "Why do phones get hot?", tag: "Electronics" },
  { emoji: "🌧️", q: "Why does rain smell?", tag: "Chemistry" },
  { emoji: "🕯️", q: "Why does a candle flicker?", tag: "Physics" },
  { emoji: "🪞", q: "Why do mirrors flip left-right?", tag: "Optics" },
];

export default function LandingPage() {
  const [activeQ, setActiveQ] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveQ((prev) => (prev + 1) % cyclingQuestions.length);
        setFading(false);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#0A0E1A]/70 border-b border-white/5">
        <span className="font-syne font-800 text-xl tracking-tight text-white">
          Daily<span className="text-[#4F9EFF]">Why</span>
        </span>
        <Link
          href="/explore"
          className="text-sm font-inter font-medium px-4 py-2 rounded-full bg-[#4F9EFF] text-[#0A0E1A] hover:bg-[#7DB8FF] transition-colors duration-200"
        >
          Start Exploring →
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4F9EFF]/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[#2DD4BF]/6 blur-[100px] pointer-events-none" />

        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4F9EFF]/30 bg-[#4F9EFF]/10 text-[#4F9EFF] text-xs font-inter font-medium tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
          AI-powered STEM learning
        </div>

        {/* Headline */}
        <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight text-white max-w-3xl mb-6">
          Every question is a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F9EFF] to-[#2DD4BF]">
            science lesson
          </span>
        </h1>

        <p className="font-inter text-lg text-[#8899BB] max-w-xl mb-10 leading-relaxed">
          DailyWhy turns the questions you already have into STEM discoveries.
          No textbooks. Just curiosity.
        </p>

        {/* SIGNATURE: live cycling curiosity card */}
        <div
          className={`relative mb-10 transition-all duration-300 ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl max-w-sm mx-auto">
            <span className="text-4xl">{cyclingQuestions[activeQ].emoji}</span>
            <div className="text-left">
              <p className="text-[10px] font-inter text-[#4F9EFF] uppercase tracking-widest mb-0.5">
                Today's question
              </p>
              <p className="font-syne font-semibold text-white text-sm leading-snug">
                {cyclingQuestions[activeQ].text}
              </p>
            </div>
          </div>
          {/* dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {cyclingQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQ(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === activeQ ? "bg-[#4F9EFF] w-4" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Link
            href="/explore"
            className="px-7 py-3.5 rounded-full bg-[#4F9EFF] text-[#0A0E1A] font-syne font-bold text-sm hover:bg-[#7DB8FF] transition-colors duration-200 shadow-lg shadow-[#4F9EFF]/25"
          >
            Start Exploring Free
          </Link>
          <Link
            href="/explore"
            className="px-7 py-3.5 rounded-full border border-white/15 text-white/70 font-inter text-sm hover:border-white/30 hover:text-white transition-all duration-200"
          >
            See Curiosity Cards →
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <p className="text-center font-inter text-xs uppercase tracking-[0.2em] text-[#4F9EFF] mb-3">
          How it works
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-center text-white mb-14 max-w-xl mx-auto leading-tight">
          Six ways to feed your curiosity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="group p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-[#4F9EFF]/40 hover:bg-white/6 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-syne font-semibold text-white text-base mb-1">
                {f.label}
              </h3>
              <p className="font-inter text-sm text-[#8899BB] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CURIOSITY CARD PREVIEW */}
      <section className="px-6 py-20 bg-gradient-to-b from-transparent via-[#4F9EFF]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <p className="text-center font-inter text-xs uppercase tracking-[0.2em] text-[#2DD4BF] mb-3">
            Curiosity cards
          </p>
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-center text-white mb-4 max-w-xl mx-auto leading-tight">
            Just tap a question. Science does the rest.
          </h2>
          <p className="text-center font-inter text-[#8899BB] text-sm mb-12 max-w-md mx-auto">
            You don't need to know what to ask. Pick anything that catches your
            eye.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {previewCards.map((card) => (
              <Link
                href="/explore"
                key={card.q}
                className="group p-5 rounded-2xl bg-white/4 border border-white/8 hover:border-[#4F9EFF]/50 hover:bg-[#4F9EFF]/8 transition-all duration-300 cursor-pointer"
              >
                <span className="text-3xl block mb-3">{card.emoji}</span>
                <p className="font-syne font-semibold text-white text-sm leading-snug mb-2 group-hover:text-[#4F9EFF] transition-colors">
                  {card.q}
                </p>
                <span className="inline-block text-[10px] font-inter text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {card.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#4F9EFF]/6 blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <span className="text-5xl block mb-6">🚀</span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-white mb-5 leading-tight">
            The world is full of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#2DD4BF]">
              whys
            </span>
          </h2>
          <p className="font-inter text-[#8899BB] text-base mb-10 leading-relaxed">
            Start with one question today. You'll end up somewhere you never
            expected.
          </p>
          <Link
            href="/explore"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#4F9EFF] to-[#2DD4BF] text-[#0A0E1A] font-syne font-bold text-base hover:opacity-90 transition-opacity duration-200 shadow-xl shadow-[#4F9EFF]/20"
          >
            Explore DailyWhy →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">
        <span className="font-syne font-bold text-white/60">
          Daily<span className="text-[#4F9EFF]">Why</span>
        </span>
        <p className="font-inter text-xs text-white/30">
          Discover the science behind everyday life.
        </p>
      </footer>
    </main>
  );
}
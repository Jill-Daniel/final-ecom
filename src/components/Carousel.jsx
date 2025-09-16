import React, { useEffect, useState } from "react";

export default function Carousel({ items = [] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="carousel" style={{ position: "relative", borderRadius: 14, overflow: "hidden" }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: i === index ? "block" : "none", transition: "opacity .4s" }}>
          <img src={it.image} alt={it.title} style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", left: 20, bottom: 30, color: "#fff", textShadow: "0 6px 20px rgba(0,0,0,.4)" }}>
            <h2 style={{ margin: 0 }}>{it.title}</h2>
            {it.cta && <a className="btn primary" href={it.href || "/shop"} style={{ marginTop: 10 }}>{it.cta}</a>}
          </div>
        </div>
      ))}
    </div>
  );
}

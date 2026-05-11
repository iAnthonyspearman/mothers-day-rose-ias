"use client";

import { useRef, useState } from "react";

const honorCards = [
  {
    icon: "🌷",
    title: "Your Love Covered Me",
    text:
      "Through every season, your love has been steady. Even when life was heavy, your heart kept showing up for me.",
  },
  {
    icon: "🙏",
    title: "Your Prayers Carried Us",
    text:
      "There are prayers you prayed that helped protect us, guide us, and keep us moving forward when we did not fully understand it.",
  },
  {
    icon: "👑",
    title: "Your Strength Shaped Us",
    text:
      "Your faith, sacrifice, patience, and strength helped form who we are becoming. We thank God for you.",
  },
];

const petals = Array.from({ length: 32 }, (_, index) => {
  const ring = index < 8 ? 1 : index < 18 ? 2 : 3;
  const angle = index * 31;
  const depth = ring === 1 ? 68 : ring === 2 ? 42 : 18;
  const size = ring === 1 ? "small" : ring === 2 ? "medium" : "large";

  return {
    id: index,
    size,
    style: {
      transform: `rotateZ(${angle}deg) translateZ(${depth}px) rotateX(${-24 - ring * 9}deg)`,
    } as React.CSSProperties,
  };
});

function NeonHeartField() {
  return (
    <div className="neon-heart-field" aria-hidden="true">
      {Array.from({ length: 56 }).map((_, index) => (
        <span
          key={index}
          className={index % 4 === 0 ? "heart big" : index % 4 === 1 ? "heart medium" : "heart small"}
          style={
            {
              "--left": `${(index * 19) % 100}%`,
              "--delay": `${(index * -1.19) % 20}s`,
              "--duration": `${15 + (index % 10)}s`,
              "--drift": `${index % 2 === 0 ? 56 : -56}px`,
            } as React.CSSProperties
          }
        >
          {index % 2 === 0 ? "♥" : "♡"}
        </span>
      ))}
    </div>
  );
}

function RosePetalRain({ active }: { active: boolean }) {
  return (
    <div className={active ? "petal-rain active" : "petal-rain"} aria-hidden="true">
      {Array.from({ length: 34 }).map((_, index) => (
        <span
          key={index}
          style={
            {
              "--left": `${(index * 23) % 100}%`,
              "--delay": `${(index % 11) * 0.12}s`,
              "--size": `${10 + (index % 5) * 4}px`,
              "--drift": `${index % 2 === 0 ? 85 : -85}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function LoveBurst({ active }: { active: boolean }) {
  return (
    <div className={active ? "love-burst active" : "love-burst"} aria-hidden="true">
      <span>For Mom</span>
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}



function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio.volume = 0.42;

    // Start at 23 seconds when beginning playback.
    if (audio.currentTime < 23 || audio.ended) {
      audio.currentTime = 23;
    }

    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
        alert("Music could not play. Make sure the MP3 is in the public folder and named song-for-momma.mp3.");
      });
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} src="/song-for-momma.mp3" loop preload="auto" />
      <button type="button" onClick={toggleMusic}>
        {playing ? "Pause Mom's Song" : "Play Mom's Song"}
      </button>
      <p>Press play to start the background song.</p>
    </div>
  );
}

function ClassicRose({ onSurprise, active }: { onSurprise: () => void; active: boolean }) {
  const roseRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: -6, y: -18 });

  function applyRotation() {
    if (!roseRef.current) return;
    roseRef.current.style.setProperty("--rose-x", `${rotation.current.x}deg`);
    roseRef.current.style.setProperty("--rose-y", `${rotation.current.y}deg`);
  }

  function startDrag(event: React.PointerEvent<HTMLButtonElement>) {
    dragging.current = true;
    lastPoint.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging.current) return;

    const dx = event.clientX - lastPoint.current.x;
    const dy = event.clientY - lastPoint.current.y;

    rotation.current.y += dx * 0.45;
    rotation.current.x -= dy * 0.32;

    if (rotation.current.x > 24) rotation.current.x = 24;
    if (rotation.current.x < -34) rotation.current.x = -34;

    lastPoint.current = { x: event.clientX, y: event.clientY };
    applyRotation();
  }

  function endDrag() {
    dragging.current = false;
  }

  function handleClick() {
    if (!dragging.current) {
      onSurprise();
    }
  }

  return (
    <button
      className="rose-button"
      onClick={handleClick}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      aria-label="Turn and activate rose surprise"
    >
      <div
        ref={roseRef}
        className={active ? "classic-rose-stage surprise-active" : "classic-rose-stage"}
      >
        <div className="rose-orbit" />
        <div className="rose-sparkles">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--x": `${(index * 31) % 100}%`,
                  "--y": `${(index * 47) % 100}%`,
                  "--delay": `${index * 0.15}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="classic-rose-model">
          <div className="rose-light" />

          <div className="classic-rose-bloom">
            <div className="classic-rose-core" />
            {petals.map((petal) => (
              <div
                key={petal.id}
                className={`classic-petal classic-petal-${petal.size}`}
                style={petal.style}
              />
            ))}

            <div className="inner-swirl swirl-one" />
            <div className="inner-swirl swirl-two" />
            <div className="inner-swirl swirl-three" />
          </div>

          <div className="rose-neck" />

          <div className="classic-rose-stem">
            <div className="stem-highlight" />
          </div>

          <div className="classic-leaf leaf-left" />
          <div className="classic-leaf leaf-right" />
          <div className="classic-leaf leaf-low-left" />
          <div className="classic-leaf leaf-low-right" />

          <div className="classic-rose-shadow" />
        </div>

        <p className="rose-hint">Drag to turn • Tap for surprise</p>
      </div>
    </button>
  );
}

export default function Home() {
  const [activeMessage, setActiveMessage] = useState<"letter" | "blessing" | null>(null);
  const [surpriseActive, setSurpriseActive] = useState(false);

  function toggleMessage(message: "letter" | "blessing") {
    setActiveMessage((current) => (current === message ? null : message));
  }

  function triggerSurprise() {
    setSurpriseActive(true);
    window.setTimeout(() => setSurpriseActive(false), 3200);
  }

  return (
    <main className="page-shell">
      <NeonHeartField />
      <RosePetalRain active={surpriseActive} />
      <MusicPlayer />

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">Mother's Day Gift</div>

          <h1>
            Happy Mother's Day,
            <span> Mom.</span>
          </h1>

          <p className="hero-text">
            This is a digital rose garden made just for you. Every light, every
            petal, every shadow, and every word on this page is here to honor the
            love, prayers, sacrifice, and strength God placed inside of you.
          </p>

          <div className="hero-buttons">
            <button onClick={() => toggleMessage("letter")}>
              {activeMessage === "letter" ? "Close My Letter" : "Open My Letter"}
            </button>

            <button className="secondary" onClick={() => toggleMessage("blessing")}>
              {activeMessage === "blessing" ? "Close Your Blessing" : "Open Your Blessing"}
            </button>
          </div>
        </div>

        <div className="rose-panel">
          <div className="panel-shine" />
          <div className="glass-ring ring-one" />
          <div className="glass-ring ring-two" />
          <LoveBurst active={surpriseActive} />
          <ClassicRose onSurprise={triggerSurprise} active={surpriseActive} />
        </div>
      </section>

      {activeMessage && (
        <section className="message-section">
          {activeMessage === "letter" && (
            <div className="message-card">
              <p className="message-label">A Letter To You</p>
              <h2>Mom, I love you.</h2>

              <p>
                I want you to know how much I love you and appreciate you. You
                have poured so much into our lives, and we do not take that lightly.
              </p>

              <p>
                You believed in us, prayed for us, encouraged us, corrected us,
                protected us, and loved us through seasons where we were still
                growing into who God called us to become.
              </p>

              <p>
                There were sacrifices you made that we may not have fully
                understood back then, but now we see more clearly how much love was
                behind them.
              </p>

              <p className="signature">
                Happy Mother's Day. With love, from Russell and Heather.
              </p>
            </div>
          )}

          {activeMessage === "blessing" && (
            <div className="message-card blessing-card">
              <p className="message-label">A Blessing Over You</p>
              <h2>May the Lord bless you.</h2>

              <p>
                Mom, may the Lord bless you, strengthen you, cover you, and reward
                every seed of love you have sown. May peace surround your heart, joy
                fill your days, and may you always know how deeply you are loved,
                honored, and appreciated. In Jesus' Name, amen.
              </p>
            </div>
          )}
        </section>
      )}

      <section className="honor-section">
        {honorCards.map((card) => (
          <article className="honor-card" key={card.title}>
            <div className="card-icon">{card.icon}</div>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </article>
        ))}
      </section>

      <footer>
        Made with love from Russell and Heather.
      </footer>
    </main>
  );
}

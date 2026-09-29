const story = document.querySelector(".chip-story");
const stage = document.querySelector(".chip-stage");
const assembly = document.querySelector(".chip-assembly");
const blocks = document.querySelectorAll(".chip-block");
const labels = document.querySelectorAll(".chip-label");

function updateChip() {
  if (!story || !stage || !assembly) return;

  const bounds = story.getBoundingClientRect();
  const scrollableDistance = story.offsetHeight - window.innerHeight;
  const progress = Math.min(1, Math.max(0, -bounds.top / scrollableDistance));
  const explode = Math.max(0, Math.min(1, (progress - 0.12) / 0.72));
  const tilt = 58 - explode * 13;

  stage.style.setProperty("--progress", progress.toFixed(3));
  assembly.style.transform = `rotateX(${tilt}deg) rotateZ(-34deg) translateY(3%)`;

  blocks.forEach((block, index) => {
    const directions = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ];
    const [x, y] = directions[index];
    const distance = explode * (72 + index * 7);
    block.style.transform = `translate3d(${x * distance}px, ${y * distance}px, ${65 + explode * 115}px) rotateZ(${x * explode * 9}deg)`;
  });

  const substrate = stage.querySelector(".chip-substrate");
  const die = stage.querySelector(".chip-die");
  const pins = stage.querySelector(".chip-pins");
  if (substrate && die && pins) {
    substrate.style.transform = `translate3d(0, 0, ${13 - explode * 55}px) rotateZ(${explode * -4}deg)`;
    die.style.transform = `translate3d(0, 0, ${45 + explode * 48}px) rotateZ(${explode * 3}deg)`;
    pins.style.transform = `translate3d(0, 0, ${-3 - explode * 35}px)`;
  }

  labels.forEach((label, index) => {
    label.style.opacity = String(Math.max(0, Math.min(1, (explode - 0.25 - index * 0.12) * 3)));
  });
}

let frameRequested = false;
window.addEventListener(
  "scroll",
  () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(() => {
      updateChip();
      frameRequested = false;
    });
  },
  { passive: true },
);
window.addEventListener("resize", updateChip);
updateChip();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

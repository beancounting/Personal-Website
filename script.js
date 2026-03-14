// ===== Floating accounting symbols on hero canvas =====
(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const symbols = [
    "$", "%", "+", "=", "0", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "#", "&", "A1", "B2", "C3",
    "SUM", "TAX", "NET", "DR", "CR", "P&L", "ROI",
  ];

  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: height + 20,
      speed: 0.3 + Math.random() * 0.7,
      opacity: 0.04 + Math.random() * 0.08,
      size: 12 + Math.random() * 16,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      drift: (Math.random() - 0.5) * 0.3,
    };
  }

  function init() {
    resize();
    particles = [];
    const count = Math.floor(width / 25);
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.y = Math.random() * height;
      particles.push(p);
    }
  }

  function drawGrid() {
    const spacing = 60;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = spacing; x < width; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = spacing; y < height; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    ctx.font = "400 14px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.y -= p.speed;
      p.x += p.drift;

      if (p.y < -30) {
        particles[i] = createParticle();
        continue;
      }

      ctx.globalAlpha = p.opacity;
      ctx.font = `400 ${p.size}px -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(p.symbol, p.x, p.y);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resize();
  });

  init();
  animate();
})();

// ===== Fade-in elements on scroll =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".about, .services, .footer").forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

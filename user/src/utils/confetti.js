export function triggerConfetti() {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = [
    '#FFD700', '#D4AF37', '#FFDF00', // Gold & Yellow
    '#FF1744', '#FF4081', '#E91E63', // Crimson & Pink
    '#00E5FF', '#2979FF', '#00B0FF', // Electric Blue & Cyan
    '#00E676', '#1DE9B6',            // Mint & Emerald
    '#D500F9', '#651FFF',            // Violet & Purple
    '#FF6D00', '#FF9100'             // Sunset Orange
  ];

  const shapes = ['rect', 'circle', 'star', 'ribbon'];
  const particles = [];

  function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function addBurst(originX, originY, count = 70) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3; // Slower initial speed
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed * (Math.random() * 0.8 + 0.4),
        vy: Math.sin(angle) * speed - (Math.random() * 4 + 3), // Smooth gentle float
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 4, // Gentle spin
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        opacity: 1,
        gravity: 0.09 + Math.random() * 0.04, // Very light gravity for slow floating
        drag: 0.985 // Slow air resistance
      });
    }
  }

  // Wave 1: Center Explosion
  addBurst(canvas.width / 2, canvas.height * 0.4, 90);

  // Wave 2: Left Cannon (250ms delay)
  setTimeout(() => {
    addBurst(canvas.width * 0.2, canvas.height * 0.5, 60);
  }, 250);

  // Wave 3: Right Cannon (500ms delay)
  setTimeout(() => {
    addBurst(canvas.width * 0.8, canvas.height * 0.5, 60);
  }, 500);

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    particles.forEach(p => {
      if (p.opacity <= 0) return;
      activeCount++;

      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 1.2; // Gentle horizontal sway
      p.y += p.vy;
      p.rotation += p.rSpeed;
      p.opacity -= 0.0028; // Lasts ~5-6 seconds of slow floating celebration

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.shape === 'star') {
        drawStar(p.x, p.y, 5, p.size, p.size / 2, p.color);
      } else {
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size * 1.8, p.size / 3);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
      }

      ctx.restore();
    });

    if (activeCount > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  }

  render();
}

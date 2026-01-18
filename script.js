// ================= Food list =================
const foods = [
  { name: "كسكس", ingredients: "سميد، لحم، خضر، حمص، توابل" },
  { name: "كسكس بالسبع خضر", ingredients: "سميد، لحم، جزر، قرع، كوسة، لفت، حمص" },
  { name: "طاجين اللحم", ingredients: "لحم، بطاطس، طماطم، بصل، توابل" },
  { name: "طاجين الدجاج", ingredients: "دجاج، بصل، زيتون، ليمون مصير، توابل" },
  { name: "طاجين الكفتة", ingredients: "كفتة، طماطم، بصل، قزبور، توابل" },
  { name: "حريرة", ingredients: "عدس، حمص، طماطم، قزبور، كرفس" },
  { name: "رفيسة", ingredients: "دجاج، مسمن، عدس، حلبة، سمن" },
  { name: "بسطيلة دجاج", ingredients: "دجاج، ورقة، لوز، بيض، قرفة" },
  { name: "بسطيلة حوت", ingredients: "سمك، شعرية صينية، قمرون، توابل" },
  { name: "سفة مدفونة", ingredients: "شعرية، زبدة، سكر، قرفة" },
  { name: "طنجية", ingredients: "لحم، ثوم، كمون، سمن، زعفران" },
  { name: "سردين معمر", ingredients: "سردين، قزبور، ثوم، شرمولة" },
  { name: "شواية دجاج", ingredients: "دجاج، ثوم، سكينجبير، خرقوم" },
  { name: "مروزية", ingredients: "لحم، عسل، زبيب، لوز، توابل" },
  { name: "بيض بالطماطم", ingredients: "بيض، طماطم، بصل، قزبور" },
  { name: "مسمن", ingredients: "دقيق، سميد، ملح، زيت" },
  { name: "حرشة", ingredients: "سميد، زبدة، حليب" },
  { name: "بغرير", ingredients: "سميد، دقيق، خميرة" },
  { name: "شباكية", ingredients: "دقيق، زنجلان، عسل، نافع" }
];

// ================= Create food cards =================
const menu = document.getElementById("menu");

foods.forEach(food => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${food.name}</h2>
    <div class="ingredients">🧄 المقادير: ${food.ingredients}</div>
  `;
  menu.appendChild(card);
});

// ================= Snow + cyan bubbles with gradient background =================
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let flakes = [];
let bubbles = [];

function initParticles() {
  flakes = [];
  bubbles = [];
  
  for (let i = 0; i < 120; i++) { // أكثر ثلج
    flakes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      d: Math.random() * 1 + 0.5
    });
  }
  
  for (let i = 0; i < 40; i++) { // أكثر دوائر cyan
    bubbles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 5 + 3,
      dx: (Math.random() - 0.5) * 1.5,
      dy: Math.random() * 1 + 0.5
    });
  }
}

function drawParticles() {
  // ===== Draw gradient background in canvas =====
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, "#00ffff"); // cyan top
  gradient.addColorStop(1, "#000000"); // black bottom
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // ===== Snowflakes =====
  ctx.fillStyle = "white";
  ctx.beginPath();
  flakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
  });
  ctx.fill();

  // ===== Cyan bubbles =====
  ctx.fillStyle = "#00ffff";
  ctx.beginPath();
  bubbles.forEach(b => {
    ctx.moveTo(b.x, b.y);
    ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
  });
  ctx.fill();

  moveParticles();
}

let angle = 0;
function moveParticles() {
  angle += 0.01;

  flakes.forEach(f => {
    f.y += Math.pow(f.d,2)+1;
    f.x += Math.sin(angle)*2;
    if(f.y > h){ f.y=0; f.x=Math.random()*w; }
  });

  bubbles.forEach(b => {
    b.x += b.dx;
    b.y += b.dy;
    if(b.y > h) { b.y = 0; b.x = Math.random()*w; }
    if(b.x > w) { b.x = 0; }
    if(b.x < 0) { b.x = w; }
  });
}

function animateParticles() {
  drawParticles();
  requestAnimationFrame(animateParticles);
}

// ===== Handle resize =====
window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  initParticles();
});

// ===== Initialize =====
initParticles();
animateParticles();

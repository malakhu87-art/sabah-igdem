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

const menu = document.getElementById("menu");

foods.forEach(food => {
  const card = document.createElement("div");
  card.className = "card";
  // المقادير تظهر مباشرة
  card.innerHTML = `
    <h2>${food.name}</h2>
    <div class="ingredients">🧄 المقادير: ${food.ingredients}</div>
  `;
  menu.appendChild(card);
});

// ================= Snow animation =================
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let snowflakes = [];

function createSnowflakes() {
  for (let i = 0; i < 120; i++) {
    snowflakes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      d: Math.random() * 1 + 0.5
    });
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < snowflakes.length; i++) {
    let f = snowflakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
  }
  ctx.fill();
  moveSnow();
}

let angle = 0;
function moveSnow() {
  angle += 0.01;
  for (let i = 0; i < snowflakes.length; i++) {
    let f = snowflakes[i];
    f.y += Math.pow(f.d, 2) + 1;
    f.x += Math.sin(angle) * 2;

    if (f.y > h) {
      f.y = 0;
      f.x = Math.random() * w;
    }
  }
}

function animateSnow() {
  drawSnow();
  requestAnimationFrame(animateSnow);
}

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

createSnowflakes();
animateSnow();

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

const touch = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  //   console.log(e);
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

////////////// Touch Events /////////////////

canvas.addEventListener("touchstart", function (e) {
  e.preventDefault();
  touch.x = e.x;
  //   console.log(e);
  touch.y = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
  // touch.x = e.x;
  //   console.log(e);
  // touch.y = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

////////////////////////////////////////////

class Particle {
  constructor() {
    this.x = mouse.x; //touch.x
    this.y = mouse.y; //touch.y
    this.size = Math.random() * 20 + 1;
    this.speedX = Math.random() * 3 - 1.5; //random speed on x axis
    this.speedY = Math.random() * 3 - 1.5; //random speed on y axis
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1; // decreases drawn object to dissappear
  }
  draw() {
    ctx.fillStyle = this.color; //assigns particles individual colors as they are created
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //(x,y, size, portion of circle in this case multiplied by pi, Math.PI * 2 for a complete circle)
    ctx.fill();
  }
}

// function initialize() {
//   for (let i = 0; i < 100; i++) {
//     particlesArray.push(new Particle());
//   }
// }
// initialize();
// console.log(particlesArray);

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 60) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = particlesArray[i].size / 10;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      //   console.log(particlesArray.length); should decrease to 0
      i--; //adjusting index by  -1 so it wont skip
    }
  }
}

function animate() {
  //function to remove trail of circles being created each time
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0,0.1)";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 2; //can change speed here or back to original hue++
  requestAnimationFrame(animate);
}

animate();

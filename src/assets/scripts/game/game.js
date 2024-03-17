
let canvas, ctx
let player
let projectiles
let particles
let invaders
let danceInterval
let watchingGame
export function startGame(){
  canvas = document.querySelector(".game")
  ctx = canvas.getContext("2d");

  const gameContainer = document.querySelector(".game-container");
  canvas.width=gameContainer.getBoundingClientRect().width;
  canvas.height=gameContainer.getBoundingClientRect().height;

  observerGame.observe(canvas)
  observerBarreGame.observe(canvas)
}

class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;

    this.ogX = x
    this.ogY = y

    const image = new Image();
    image.src = `/assets/imgs/landing/hero/spaceship2.png`

    image.onload = ()=>{
      this.image=image
      let scale = .25

      this.width = image.width * scale
      this.height = image.height * scale
    }

    this.velocityX= 0
    this.rotation = 0

  }


  draw(){
    if (this.image.complete){
      ctx.save()

      ctx.translate(
        player.x + player.width/2,
        player.y+player.height/2
      )

      ctx.rotate(this.rotation)

      ctx.translate(
        -player.x - player.width/2,
        -player.y-player.height/2
      )

      ctx.drawImage(this.image, this.x, this.y,
        this.width,
        this.height);

      ctx.restore()
    }
  }

  update(){
    if(this.image){
      this.draw()
      this.x += this.velocityX
    }

  }
}

class Projectile{
  constructor({position, velocity}){
    this.position = position
    this.velocity = velocity

    this.radius = 3
  }

  draw(){
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
    ctx.fillStyle="orange"
    ctx.fill()
    ctx.closePath()
  }

  update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Particle{
  constructor({position, velocity}){
    this.position = position
    this.velocity = velocity

    this.color = "white"
      this.radius = Math.random()*1.25
  }

  draw(){
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
    ctx.fillStyle= this.color
    ctx.fill()
    ctx.closePath()
  }

  update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}


class invader {
  constructor(x, y, race) {
    this.x = x;
    this.y = y;

    this.race = race;
    this.bool = false;
    this.dead = false

    this.src1 = `/assets/imgs/landing/hero/inv/inv${race}1.png`;
    this.src2 = `/assets/imgs/landing/hero/inv/inv${race}2.png`;
    this.src3 = `/assets/imgs/landing/hero/explosion.png`;

    const image = new Image();
    image.src = `/assets/imgs/landing/hero/inv/inv${race}1.png`;

    this.scale = 0.18;

    image.onload = () => {
      this.image = image;
      this.width = image.width * this.scale;
      this.height = image.height * this.scale;
    };

    switch (race) {
      case 'A':
        this.scale = 0.16;
        break;

      case 'B':
        this.scale = 0.14;
        break;

      default:
        break;
    }


    this.velocityX = 0.7;
    this.velocityY = 0;
  }

  draw() {

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.image) {
      this.draw();

      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  dance() {
    if (!this.dead){
      if (!this.bool) {
        this.image.src = this.src2;
        this.bool = true;
      } else {
        this.image.src = this.src1;
        this.bool = false;
      }
    }
  }

  death(){
    this.dead= true
    this.scale=0.033
    this.image.src = this.src3;
    this.width = this.image.width * this.scale;
    this.height = this.image.height * this.scale;
    setTimeout(() => {
      var index = invaders.indexOf(this);

      if (index > -1) {
        invaders.splice(index, 1);
      }
    }, 200);

  }
}

const keys={
  q:{
    pressed:false
  },
  ArrowLeft:{
    pressed:false
  },

  d:{
    pressed:false
  },
  ArrowRight:{
    pressed:false
  },

  space:{
    pressed:false
  },
  z:{
    pressed:false
  },
  ArrowUp:{
    pressed:false
  }
}


function tp(){
  let race1= 0
  let race2= 0
  let race3= 0
  invaders.forEach(invader=>{

    switch (invader.race){
      case 'A':
        race1++
        break;
      case 'B':
        race2++
        break;
      case 'C':
        race3++
        break;
    }
  })

  let customEvent = null;

  if(race1 === 0){
    watchingGame=false
    customEvent = new CustomEvent('invaderScrollTo',{
      detail : 'a propos'
    })
  } else if(race2 === 0){
    watchingGame=false
    customEvent = new CustomEvent('invaderScrollTo',{
      detail : 'portfolio'
    })
  } else if(race3 === 0){
    watchingGame=false
    customEvent = new CustomEvent('invaderScrollTo',{
      detail : 'contact'
    })
  }

  if(customEvent !== null){
    document.dispatchEvent(customEvent);
  }



}

function checkCollisions() {
  for (let i = 0; i < projectiles.length; i++) {
    for (let j = 0; j < invaders.length; j++) {
      const projectile = projectiles[i];
      const invader = invaders[j];
      const dx = projectile.position.x - invader.x - invader.width/2;
      const dy = projectile.position.y - invader.y - invader.height/2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < projectile.radius + invader.width/2) {
        if(!invaders[j].dead){
          projectiles.splice(i, 1);
          invaders[j].death()
          j--;
          i--;
          break;
        }
        break;
      }
    }
  }
}


function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tp()
  player.update()


  particles.forEach(particle=>{
    if(particle.position.y-particle.radius>=canvas.height){
      particle.position.y=0
    }
    particle.update()
  })

  projectiles.forEach((projectile, idx)=>{

    if(projectile.position.y + projectile.radius<=0){
      setTimeout(()=>{
        projectiles.splice(idx,1)
      },0)
    }else{
      projectile.update()
    }

  })

  invaders.forEach((invader, idxI)=>{
    invader.update()
    checkCollisions()
  })

  if(invaders[0].x+invaders[0].width < 52){

    invaders.forEach((invader)=>{
      invader.velocityX=0.6
      invader.velocityY=0
    })
  } else if(invaders[invaders.length-1].x + invaders[invaders.length-1].width > canvas.width-10 ){

    invaders.forEach((invader)=>{
      invader.velocityX=-0.6
      invader.velocityY=0
    })

  }

  if (keys.q.pressed && player.x>=0 || keys.ArrowLeft.pressed && player.x>=0){
    player.velocityX = -8
    player.rotation = -0.15
  } else if (keys.d.pressed && player.x + player.width <= canvas.width ||
    keys.ArrowRight.pressed && player.x + player.width <= canvas.width){
    player.velocityX = 8
    player.rotation = 0.15
  }
  else{
    player.velocityX = 0
    player.rotation = 0
  }

  if(!watchingGame){
    clearInterval(danceInterval)
    removeEventListener("keyup", keyUp)
    removeEventListener("keydown", keyDown)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return
  }



  requestAnimationFrame(animate)
}

function invaderDanceGame(){
  invaders.forEach(invader=>{
    invader.dance()
  })
}

let observerGame = new IntersectionObserver((entries)=>{
  entries.forEach(entrie=>{
    if(entrie.isIntersecting){
      watchingGame=true
      loadImages()
    }
  })
}, {threshold: .30})

let observerBarreGame = new IntersectionObserver((entries)=>{
  entries.forEach(entrie=>{
    if(!entrie.isIntersecting){
      watchingGame=false
    }
  })
}, {threshold: .30})



let blinkDestroyed = false

let keyDown = (e)=>{

  if(!blinkDestroyed){
    let toDestroy = document.querySelectorAll('.blink')
    toDestroy.forEach((el)=>{
      el.remove()
      blinkDestroyed = true
    })
  }

  switch(e.key){
    case "ArrowLeft":
      keys.ArrowLeft.pressed=true;
      break;
    case 'q':
      keys.q.pressed=true;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed=true;
      break;
    case 'd':
      keys.d.pressed=true;
      break;

    case " ":
      keys.space.pressed=true;
      projectiles.push(new Projectile({
        position:{
          x: player.x + player.width/2,
          y:player.y
        },
        velocity:{
          x:0,
          y:-10
        }
      }))
      e.preventDefault();

      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed=true
      projectiles.push(    new Projectile({
        position:{
          x: player.x + player.width/2,
          y:player.y
        },
        velocity:{
          x:0,
          y:-10
        }
      }))
      e.preventDefault()
      break;
    case "z":
      keys.z.pressed=true;
      projectiles.push(    new Projectile({
        position:{
          x: player.x + player.width/2,
          y:player.y
        },
        velocity:{
          x:0,
          y:-10
        }
      }))
      break;

    case "ArrowDown":
      e.preventDefault()
      break;

    default:
      break;
  }
}

const keyUp = ({key})=>{

  switch(key){
    case "ArrowLeft":
      keys.ArrowLeft.pressed=false;
      break;
    case 'q':
      keys.q.pressed=false;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed=false;
      break;
    case 'd':
      keys.d.pressed=false;
      break;

    case " ":
      keys.space.pressed=false;
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed=false
      break;
    case "z":
      keys.z.pressed=false;
      break;
  }
}

function launchGame(){
  window.addEventListener("keydown", keyDown)
  window.addEventListener("keyup",keyUp)

  player = new Player(canvas.width/2-40, canvas.height-60)
  projectiles=[]
  particles = []
  invaders =[]



  for (let i = 0; i < 18; i++) {
    if(i<3){
      invaders.push(new invader(i*70,40, 'B'))
    }else if(i<6){
      invaders.push(new invader((i-3)*70,90, 'B'))
    } else if(i<9){
      invaders.push(new invader(200+(i-6)*80, 150, 'A'))
    }else if(i<12){
      invaders.push(new invader(200+(i-9)*80, 200, 'A'))
    }else if(i<15){
      invaders.push(new invader(430+(i-12)*70, 40, 'C'))
    }else if(i<18){
      invaders.push(new invader(430+(i-15)*70, 90, 'C'))
    }
  }

  for (let i = 0; i < 200; i++) {
    particles.push(
      new Particle({
        position: {
          x: Math.random()*canvas.width,
          y: Math.random()*canvas.height
        },
        velocity:{
          x:0,
          y:0.6
        }
      })
    )

  }
}



function loadImages() {
  let imagesLoaded = 0;
  const images = [
    "/assets/imgs/landing/hero/inv/invA1.png",
    "/assets/imgs/landing/hero/inv/invA2.png",
    "/assets/imgs/landing/hero/inv/invB1.png",
    "/assets/imgs/landing/hero/inv/invB2.png",
    "/assets/imgs/landing/hero/inv/invC1.png",
    "/assets/imgs/landing/hero/inv/invC2.png",
    "/assets/imgs/landing/hero/explosion.png"
  ];

  images.forEach((src) => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        launchGame()
        danceInterval = setInterval(() => {
          invaderDanceGame()
        }, 400);
        animate()
      }
    };
  });
}

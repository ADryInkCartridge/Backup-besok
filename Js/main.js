const start = document.querySelector("#start")
const scene = new THREE.Scene()

scene.background = new THREE.Color(0xffffff);

const canvas = document.querySelector("#bg");

const size = {
  w : window.innerWidth * 0.8 ,
  h : window.innerHeight * 0.8 
}

scene.add(new THREE.DirectionalLight(0xffffbb, 1));
scene.add(new THREE.AmbientLight(0xffffff, 1));
const camera = new THREE.PerspectiveCamera(90, size.w / size.h,0.1,1000);
camera.position.set(0, 50, 0);
const pi = Math.PI;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize( size.w , size.h);
renderer.setPixelRatio(window.devicePixelRatio);

const orbitControls = new THREE.OrbitControls(camera, canvas);
var clock = new THREE.Clock();
var time = 0
var delta = 0
var speed = 2
var score = 0
const colors = randColorGen(10);

var varjcount = 0 
var residual = 0
var changing = 0
var lane = 1
var jumping = 0
var press = 0
const hmax = 8
var gameover = 0
var jumpStartTime = 0

start.addEventListener('click',(e)=> {
  gameloop()
})

canvas.addEventListener("click", (e) => {
  var key = e.type;
  cLane(key)
})
function gameloop() {
  const x = document
  x.addEventListener('keydown', res)
  
  function res(e){
    if (press==0)
      animate()
    press++
    var key = e.code;
    cLane(key)
  }
  
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }
  obj = []
  time = 0
  lane = 1
  delta = 0
  changing = 0
  jumping = 0
  speed = 0.2
  press = 0
  score = 0
  jumpStartTime = 0
  gameover = 0
  ball = createBall(0xffffff)
  scene.add(ball)
  
  function animate(){ 
      orbitControls.update();
      ballAnimation()
      renderer.render(scene,camera)
      requestAnimationFrame(animate);
  }
}


const scene = new THREE.Scene()

scene.background = new THREE.Color(0xffffff);

const canvas = document.querySelector("#bg");

const size = {
  w : window.innerWidth * 1 ,
  h : window.innerHeight * 1 
}



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


canvas.addEventListener("click", (e) => {
  var key = e.type;
  cLane(key)
})

function gameloop() {
  const x = document
  x.addEventListener('keydown', res)
  
  function res(e){
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
  floor2 = createFloor2()
  // floor = createFloor(0x121212)
  // scene.add(floor)

  // floor.position.set(0, -3, 0)
  // floor.rotation.x = 270 * (pi/180);
  light = new THREE.PointLight(0xffffbb, 0.6);
  light.position.set(0,10,0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  ball = createBall(0xff0000)
  scene.add(ball)
  animate()
  function animate(){ 
      orbitControls.update();
      ballAnimation()
      renderer.render(scene,camera)
      requestAnimationFrame(animate);
  }
}

gameloop()

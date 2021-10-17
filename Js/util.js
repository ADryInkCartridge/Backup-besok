function radInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createBall(color) { 
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({ color: color })
    );
    sphere.position.set(0,0,-10)
    return sphere;
};

function randColorGen(i) {
    var arr = []
    for (x = 0; x < i; x ++){
        arr.push(Math.floor(Math.random()*16777215));
    }
    return arr;
}

function coupling(colors) { 
    let idx = radInt(0,9)
    sceneBuffer.push(createCube(colors[idx]), createCube(colors[idx]));
}

function resetTag(cubes) {
    for (const cube of cubes) {
        cube.tag = false
        // console.log(cube)
        cube.material.color.set(cube.oldcolor)
    }
}

function cLane(key){
    console.log(key)
    if(key == 'ArrowLeft' || key == 'KeyA'){
        changing = 1 
        console.log('left')
            lane = 1
            residual = speed
        
    }
    if(key == 'ArrowRight'|| key == 'KeyD'){
        console.log('right')
        changing = 1 
            lane = 2
            residual = speed
    }
    if(key == 'ArrowDown' || key == 'KeyS'){
        console.log('Down')
        changing = 1 
            lane = 3
            residual = speed
    }
    if(key == 'ArrowUp' || key == 'KeyW'){
        console.log('Up')
        changing = 1 
            lane = 4
            residual = speed
    }
    if(key == 'Space'){
        console.log('Space')
        if(!jumping){
            jumping = 1
            delta = clock.getDelta();
            time += delta
            jumpStartTime = time
            jcount = 0
        }
        
    }
    if(key == 'click'){
        console.log('Space')
        if(!jumping){
            jumping = 1
            delta = clock.getDelta();
            time += delta
            jumpStartTime = time
            jcount = 0
        }
        
    }
    console.log(lane)
}


window.addEventListener("resize", () => {
    size.w = window.innerWidth * 0.8;
    size.h = window.innerHeight * 0.8;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

function ballAnimation(){
    ball.rotation.x +=0.05
    if(changing == 1){
        console.log(ball.position)
        if(lane == 1){
            ball.position.x -= speed
        }
        if(lane == 2){
            ball.position.x += speed
        }
        if(lane == 3){
            ball.position.z += speed
        }
        if(lane == 4){
            ball.position.z -= speed
        }
        changing = 0
        
    }
    if(residual >= 0){
        if(lane == 1){
            console.log(residual)
            ball.position.x -= residual
            residual -= 0.001
        }
        if(lane == 2){
            ball.position.x += residual
            residual -= 0.001
        }
        if(lane == 3){
            ball.position.z += residual
            residual -= 0.001
        }
        if(lane == 4){
            ball.position.z -= residual
            residual -= 0.001
        }
    }
    if (jumping == 1){

        delta = clock.getDelta();
        time += delta
        var jumpClock = time - jumpStartTime;
        console.log(jumpClock)
        if(jumpClock < 0.75 && jcount == 0){
            console.log(jumpClock)
            ball.position.y = hmax * Math.sin((1 / (3/4)) * Math.PI * jumpClock) 
        }
        if(jumpClock > 0.75) {
            if(jcount == 1 ){
                jumping = 0;
                jcount=0;
                ball.position.y = 0
            }
            else {
                jumpStartTime = time 
                jcount++;
            }
        }
        if (jcount == 1) {
            console.log(time)
            ball.position.y = hmax/2 * Math.sin((1 / (3/4)) * Math.PI * jumpClock) 
            
        }
        
    }
}

function collision(x,y,z){
    if (Math.abs(ball.position.x - x) < 3 && Math.abs(ball.position.y - y) < 3  && Math.abs(ball.position.z - z) < 3){
        console.log(x,y,z)
        console.log('dead')
        gameover = 1;
    }
}
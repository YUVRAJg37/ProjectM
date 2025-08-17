import { Clock } from "three";
import { Game } from "./game";
import { createRenderer } from "./renderer";
import { Floor } from "./floor";
import { LightManager } from "./lightManager";
import Stats from "stats.js";
import { CameraManager } from "./camera";
import { TestBall } from "./testBall";
import { PhysicsManager } from "./physics";

const stats = new Stats();
const container = document.getElementById("app")!;
const renderer = createRenderer(container);
const camera = new CameraManager(container);
const physicsManager = new PhysicsManager();
const clock = new Clock();
let previousTime = 0;

const game = new Game(
  renderer,
  container,
  camera.getCameraRef(),
  physicsManager
);

const onResize = () => {
  game.resize(container.clientWidth, container.clientHeight);
};

window.addEventListener("resize", onResize);
onResize();

stats.showPanel(0);
container.appendChild(stats.dom);

//---------------------Creation---------------------------------
const lightManager = new LightManager();
const floor = new Floor(2, 2, 1);
const ball = new TestBall(0.5);

//---------------------Addition---------------------------------
game.add(lightManager);
game.add(floor);
game.add(ball);
//--------------------------------------------------------------

// Initialize everything asynchronously
async function initializeGame() {
  await physicsManager.init();
  game.init();

  function update() {
    stats.begin();
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;

    physicsManager.update();
    game.update(deltaTime);

    previousTime = elapsedTime;
    stats.end();
  }

  renderer.setAnimationLoop(update);
}

initializeGame().catch(console.error);

export { game, physicsManager };

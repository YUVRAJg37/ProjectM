import { Clock } from "three";
import { Game } from "./game";
import { createRenderer } from "./renderer";
import { Floor } from "./floor";
import { LightManager } from "./lightManager";
import Stats from "stats.js";
import { CameraManager } from "./camera";
import { Player } from "./player";
import { PhysicsManager } from "./physics";
import { InputManager } from "./inputManager";
import {
  setCamera,
  setGame,
  setInputManager,
  setPhysicsManager,
  setPlayer,
} from "./core";
import { Editor } from "./editor";

const stats = new Stats();
const container = document.getElementById("app")!;
const renderer = createRenderer(container);
const inputManager = new InputManager();
const camera = new CameraManager(container);
const physicsManager = new PhysicsManager();
const editor = new Editor();

const clock = new Clock();
let previousTime = 0;

const game = new Game(renderer, container, camera.getCameraRef());

const onResize = () => {
  game.resize(container.clientWidth, container.clientHeight);
};

window.addEventListener("resize", onResize);
onResize();

stats.showPanel(0);
container.appendChild(stats.dom);

//---------------------Creation---------------------------------
const lightManager = new LightManager();
const floor = new Floor(2, 1, 2);
const player = new Player(0.5, 1);

//---------------------Set Tools--------------------------------
setInputManager(inputManager);
setCamera(camera);
setPhysicsManager(physicsManager);
setGame(game);
setPlayer(player);

//---------------------Addition---------------------------------
game.add(lightManager);
game.add(floor);
game.add(player);
//--------------------------------------------------------------

// Initialize everything asynchronously
async function initializeGame() {
  await physicsManager.init();
  game.init();
  editor.init();

  function update() {
    stats.begin();
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;

    physicsManager.update();
    camera.update();
    game.update(deltaTime);

    previousTime = elapsedTime;
    stats.end();
  }

  renderer.setAnimationLoop(update);
}

initializeGame().catch(console.error);

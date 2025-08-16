import { Clock } from "three";
import { Game } from "./game";
import { createRenderer } from "./renderer";
import { TestCube } from "./testCube";

const container = document.getElementById("app")!;
const renderer = createRenderer(container);
const game = new Game(renderer, container);
const clock = new Clock();
let previousTime = 0;

const onResize = () => {
  game.resize(container.clientWidth, container.clientHeight);
};

window.addEventListener("resize", onResize);
onResize();

const cube = new TestCube();

game.add(cube);
game.init();

function update() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;

  game.update(deltaTime);

  previousTime = elapsedTime;
}

renderer.setAnimationLoop(update);

export { game };

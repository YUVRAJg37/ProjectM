import { InputManager } from "./inputManager";
import type { Game } from "./game";
import type { PhysicsManager } from "./physics";
import type { CameraManager } from "./camera";

let inputManager: InputManager;
let camera: CameraManager;
let game: Game;
let physicsManager: PhysicsManager;

export function setInputmanager(value: InputManager) {
  inputManager = value;
}

export function setCamera(value: CameraManager) {
  camera = value;
}

export function setGame(value: Game) {
  game = value;
}

export function setPhysicsManager(value: PhysicsManager) {
  physicsManager = value;
}

export { inputManager, camera, game, physicsManager };

import { InputManager } from "./inputManager";
import type { Game } from "./game";
import type { PhysicsManager } from "./physics";
import type { CameraManager } from "./camera";
import type { Player } from "./player";

let inputManager: InputManager;
let camera: CameraManager;
let game: Game;
let physicsManager: PhysicsManager;
let player: Player;

export function setInputManager(value: InputManager) {
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

export function setPlayer(value: Player) {
  player = value;
}

export { inputManager, camera, game, physicsManager, player };

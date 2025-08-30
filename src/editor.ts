import GUI from "lil-gui";
import { player } from "./core";

export class Editor {
  private GUI: GUI;

  constructor() {
    this.GUI = new GUI();
  }

  init() {
    this.GUI.add(player, "moveSpeed", 0, 500).step(0.1).name("Move Speed");
    this.GUI.add(player, "rotationSpeed", 1, 100)
      .step(0.1)
      .name("Rotation Speed");
  }
}

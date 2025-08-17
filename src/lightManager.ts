import { AmbientLight, DirectionalLight, Object3D } from "three";
import type { Entity } from "./game";

export class LightManager implements Entity {
  node: Object3D | null;
  private ambientLight: AmbientLight;
  private directionalLights: DirectionalLight[] = [];

  constructor() {
    this.ambientLight = new AmbientLight(0x404040);

    const directionalLight = new DirectionalLight(0xffffff, 2);

    this.directionalLights.push(directionalLight);
    this.node = new Object3D();
    this.node.position.set(0, 0, 5);
  }

  init(): void {
    if (this.node) {
      this.node.add(this.ambientLight);
      for (let i = 0; i < this.directionalLights.length; i++) {
        this.node.add(this.directionalLights[i]);
      }
    }
  }
}

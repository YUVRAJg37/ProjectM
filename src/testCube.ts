import { BoxGeometry, Mesh, MeshBasicMaterial, type Object3D } from "three";
import type { Entity } from "./game";

export class TestCube implements Entity {
  node: Object3D | null = null;

  init() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.node = new Mesh(geometry, material);
  }

  update(dt: number) {
    if (!this.node) return;
    this.node.rotation.x += 2 * dt;
    this.node.rotation.y += 2 * dt;
  }
}

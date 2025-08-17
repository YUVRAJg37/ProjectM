import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from "three";
import type { Entity } from "./game";
import RAPIER, { ColliderDesc } from "@dimforge/rapier3d";

export class Floor implements Entity {
  private size: Vector3 = new Vector3();
  node: Object3D | null = null;
  colliderDesc: ColliderDesc | null = null;
  constructor(x: number, y: number, z: number) {
    this.size.set(x, y, z);
  }

  init(): void {
    const boxGeo = new BoxGeometry(this.size.x, this.size.y, this.size.z);
    const boxMat = new MeshStandardMaterial({
      color: 0x77dd77,
      wireframe: false,
    });
    this.node = new Mesh(boxGeo, boxMat);
    this.colliderDesc = RAPIER.ColliderDesc.cuboid(
      this.size.x,
      this.size.y,
      this.size.z
    );
  }
}

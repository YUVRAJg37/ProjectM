import RAPIER from "@dimforge/rapier3d";
import type { Entity } from "./game";
import { Vector3 } from "three";

export class PhysicsManager {
  world: RAPIER.World | null = null;
  gravity: Vector3 = new Vector3(0, -9.81, 0);
  private initialized = false;

  constructor() {}

  async init() {
    if (this.initialized) return;

    this.world = new RAPIER.World(this.gravity);
    this.initialized = true;
  }

  update() {
    if (this.initialized) {
      this.world?.step();
    }
  }

  addCollider(entity: Entity) {
    if (entity.colliderDesc && entity.rigidBodyDesc) {
      let rigidBody = this.world?.createRigidBody(entity.rigidBodyDesc);
      entity.rigidBody = rigidBody;
      this.world?.createCollider(entity.colliderDesc, rigidBody);
    } else if (entity.colliderDesc) {
      this.world?.createCollider(entity.colliderDesc);
    }
  }
}

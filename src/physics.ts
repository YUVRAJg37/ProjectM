import RAPIER from "@dimforge/rapier3d";

export class PhysicsManager {
  world: RAPIER.World | null = null;
  private initialized = false;

  constructor() {}

  async init() {
    if (this.initialized) return;

    let gravity = { x: 0.0, y: 0, z: -0.5 };
    this.world = new RAPIER.World(gravity);
    this.initialized = true;
  }

  update() {
    if (this.initialized) {
      this.world?.step();
    }
  }
}

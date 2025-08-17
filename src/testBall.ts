import { Mesh, MeshStandardMaterial, Object3D, SphereGeometry } from "three";
import type { Entity } from "./game";
import RAPIER, {
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
} from "@dimforge/rapier3d";

export class TestBall implements Entity {
  private radius: number;
  node: Object3D | null = null;
  colliderDesc: ColliderDesc | null = null;
  rigidBodyDesc: RigidBodyDesc | null = null;
  rigidBody: RigidBody | null = null;

  constructor(radius: number) {
    this.radius = radius;
  }

  init(): void {
    const sphereGeo = new SphereGeometry(this.radius);
    const sphereMat = new MeshStandardMaterial({
      color: 0xff746c,
      wireframe: false,
    });
    this.node = new Mesh(sphereGeo, sphereMat);
    this.node.position.set(0, 0, 5);

    this.rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 0, 5);
    this.colliderDesc = RAPIER.ColliderDesc.ball(this.radius);
  }

  update(dt: number): void {
    if (this.node && this.rigidBody) {
      const p = this.rigidBody.translation();
      const q = this.rigidBody.rotation();
      this.node.position.set(p.x, p.y, p.z);
      this.node.quaternion.set(q.x, q.y, q.z, q.w);
    }
  }
}

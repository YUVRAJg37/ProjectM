import {
  BoxGeometry,
  CapsuleGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
  Vector3,
} from "three";
import type { Entity } from "./game";
import RAPIER, {
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
} from "@dimforge/rapier3d";
import { inputManager } from "./core";

export class Player implements Entity {
  private radius: number;
  private height: number;
  private velocity: Vector3;
  private horizontal: number = 0;
  private vertical: number = 0;
  rotationSpeed: number = 20;
  moveSpeed: number = 100;
  node: Object3D | null = null;
  colliderDesc: ColliderDesc | null = null;
  rigidBodyDesc: RigidBodyDesc | null = null;
  rigidBody: RigidBody | null = null;

  constructor(radius: number, height: number) {
    this.radius = radius;
    this.height = height;
    this.velocity = new Vector3(0);
  }

  init(): void {
    const playerGeo = new CapsuleGeometry(this.radius, this.height, 6, 12);
    const playerMat = new MeshStandardMaterial({
      color: 0xff746c,
      wireframe: false,
    });

    const visor = new BoxGeometry(this.radius, 0.2, 0.3);
    const visorMat = new MeshStandardMaterial({
      color: 0xffffff,
    });

    const visorMesh = new Mesh(visor, visorMat);
    visorMesh.position.set(0, this.height / 3, this.radius - 0.05);

    this.node = new Mesh(playerGeo, playerMat);
    this.node.add(visorMesh);

    this.rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(0, 5, 0)
      .setRotation({ w: 1.0, x: 0, y: 1, z: 0 })
      .lockRotations()
      .enabledRotations(false, true, false)
      .setAdditionalMass(50);
    this.colliderDesc = RAPIER.ColliderDesc.capsule(
      this.height / 2,
      this.radius
    );
  }

  update(dt: number): void {
    this.horizontal = inputManager.getInput("horizontal");
    this.vertical = inputManager.getInput("vertical");
    const movementDirection = new Vector3(
      this.horizontal,
      0,
      this.vertical
    ).normalize();

    if (movementDirection.length() > 0 && this.node) {
      const targetQuaternion = new Quaternion();
      targetQuaternion.setFromUnitVectors(
        new Vector3(0, 0, 1),
        movementDirection
      );

      this.node.quaternion.slerp(targetQuaternion, this.rotationSpeed * dt);
    }

    this.move(movementDirection, this.moveSpeed * dt);

    if (this.node && this.rigidBody) {
      this.rigidBody?.setLinvel(
        {
          x: this.velocity.x,
          y: this.velocity.y,
          z: this.velocity.z,
        },
        true
      );

      const p = this.rigidBody.translation();
      this.node.position.set(p.x, p.y, p.z);
    }
  }

  move(direction: Vector3, speed: number) {
    if (speed <= 0 || direction.length() === 0) {
      this.velocity = new Vector3(0, this.rigidBody?.linvel().y ?? 0, 0);
      return;
    }

    direction.x = direction.x * speed;
    direction.y = this.rigidBody?.linvel().y ?? 0;
    direction.z = direction.z * speed;
    this.velocity = direction;
  }
}

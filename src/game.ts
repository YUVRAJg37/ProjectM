import type {
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
} from "@dimforge/rapier3d";
import {
  Color,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import type { PhysicsManager } from "./physics";

export interface Entity {
  node: Object3D | null;
  colliderDesc?: ColliderDesc | null;
  rigidBodyDesc?: RigidBodyDesc | null;
  rigidBody?: RigidBody | null;
  init(): void;
  update?(dt: number): void;
  dispose?(): void;
}

export class Game {
  private scene = new Scene();
  private camera: PerspectiveCamera | null;
  private physics: PhysicsManager | null;
  private entities: Entity[] = [];
  private renderer: WebGLRenderer;
  private size = new Vector2(1, 1);

  constructor(
    renderer: WebGLRenderer,
    container: HTMLElement,
    camera: PerspectiveCamera,
    physics: PhysicsManager
  ) {
    this.renderer = renderer;
    this.size.set(container.clientWidth, container.clientHeight);
    this.camera = null;
    this.setCamera(camera);
    this.physics = physics;
  }

  init() {
    this.scene.background = new Color(0xfae4c2);
    for (const e of this.entities) {
      e.init();
      this.addToScene(e);
      this.addCollider(e);
    }
  }

  update(dt: number) {
    for (const e of this.entities) {
      if (e.update) e.update(dt);
    }
    if (this.camera) this.renderer.render(this.scene, this.camera);
  }

  add(entity: Entity) {
    this.entities.push(entity);
  }

  private addToScene(entity: Entity) {
    if (!entity.node) return;
    this.scene.add(entity.node);
  }

  private addCollider(entity: Entity) {
    if (entity.colliderDesc && entity.rigidBodyDesc) {
      let rigidBody = this.physics?.world?.createRigidBody(
        entity.rigidBodyDesc
      );
      entity.rigidBody = rigidBody;
      this.physics?.world?.createCollider(entity.colliderDesc, rigidBody);
    } else if (entity.colliderDesc) {
      this.physics?.world?.createCollider(entity.colliderDesc);
    }
  }

  setCamera(camera: PerspectiveCamera) {
    this.camera = camera;
  }

  remove(entity: Entity) {
    if (!entity.node) return;
    this.scene.remove(entity.node);
    this.entities = this.entities.filter((e) => e !== entity);
    entity.dispose?.();
  }

  resize(width: number, height: number) {
    this.size.set(width, height);
    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.setSize(width, height);
  }
}

import type {
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
} from "@dimforge/rapier3d";
import {
  AxesHelper,
  Color,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { physicsManager } from "./core";

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
  private entities: Entity[] = [];
  private renderer: WebGLRenderer;
  private size = new Vector2(1, 1);

  constructor(
    renderer: WebGLRenderer,
    container: HTMLElement,
    camera: PerspectiveCamera
  ) {
    this.renderer = renderer;
    this.size.set(container.clientWidth, container.clientHeight);
    this.camera = null;
    this.setCamera(camera);
  }

  init() {
    this.scene.background = new Color(0xfae4c2);

    const axesHelper = new AxesHelper(10);
    this.scene.add(axesHelper);

    for (const e of this.entities) {
      e.init();
      this.addToScene(e);
      physicsManager.addCollider(e);
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

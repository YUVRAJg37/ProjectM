import {
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";

export interface Entity {
  node: Object3D | null;
  init(): void;
  update(dt: number): void;
  dispose?(): void;
}

export class Game {
  private scene = new Scene();
  private camera: PerspectiveCamera;
  private entities: Entity[] = [];
  private renderer: WebGLRenderer;
  private size = new Vector2(1, 1);

  constructor(renderer: WebGLRenderer, container: HTMLElement) {
    this.renderer = renderer;
    this.size.set(container.clientWidth, container.clientHeight);
    console.log(this.size);
    this.camera = new PerspectiveCamera(
      60,
      this.size.x / this.size.y,
      0.1,
      100
    );
    this.camera.position.z = 5;
  }

  init() {
    for (const e of this.entities) {
      e.init();
      this.addToScene(e);
    }
  }

  update(dt: number) {
    for (const e of this.entities) {
      e.update(dt);
    }
    this.renderer.render(this.scene, this.camera);
  }

  add(entity: Entity) {
    this.entities.push(entity);
  }

  private addToScene(entity: Entity) {
    if (!entity.node) return;
    this.scene.add(entity.node);
  }

  remove(entity: Entity) {
    if (!entity.node) return;
    this.scene.remove(entity.node);
    this.entities = this.entities.filter((e) => e !== entity);
    entity.dispose?.();
  }

  resize(width: number, height: number) {
    this.size.set(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

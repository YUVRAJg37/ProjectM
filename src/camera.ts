import { PerspectiveCamera } from "three";

export class CameraManager {
  private camera: PerspectiveCamera;

  constructor(container: HTMLElement) {
    this.camera = new PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    this.camera.position.set(0, 10, 0);
    this.camera.rotation.set(-Math.PI / 2, 0, -Math.PI / 2);
  }

  getCameraRef(): PerspectiveCamera {
    return this.camera;
  }

  update() {}
}

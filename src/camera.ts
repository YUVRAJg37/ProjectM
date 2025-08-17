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

    this.camera.position.set(0, -5, 5);
    this.camera.rotation.set(1, 0, 0);
  }

  getCameraRef(): PerspectiveCamera {
    return this.camera;
  }
}

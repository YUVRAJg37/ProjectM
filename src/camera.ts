import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class CameraManager {
  private camera: PerspectiveCamera;
  private controls: OrbitControls;

  constructor(container: HTMLElement) {
    this.camera = new PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    this.camera.position.set(0, 10, 0);
    this.camera.rotation.set(-Math.PI / 2, 0, -Math.PI / 2);
    this.controls = new OrbitControls(this.camera, container);
  }

  getCameraRef(): PerspectiveCamera {
    return this.camera;
  }

  update() {
    this.controls.update();
  }
}

type InputValue = {
  value: number;
};

export class InputManager {
  private horizontal: InputValue = { value: 0 };
  private vertical: InputValue = { value: 0 };
  private inputMap: Map<string, InputValue> = new Map();

  constructor() {
    this.inputMap.set("horizontal", this.horizontal);
    this.inputMap.set("vertical", this.vertical);

    this.init();
  }

  init() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key == "w") {
        this.onHorizantalInput(1);
      }

      if (event.key == "s") {
        this.onHorizantalInput(-1);
      }

      if (event.key == "a") {
        this.onVerticalInput(-1);
      }

      if (event.key == "d") {
        this.onVerticalInput(1);
      }
    });

    document.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key == "w") {
        this.onHorizantalInput(0);
      }

      if (event.key == "s") {
        this.onHorizantalInput(0);
      }

      if (event.key == "a") {
        this.onVerticalInput(0);
      }

      if (event.key == "d") {
        this.onVerticalInput(0);
      }
    });
  }

  getInput(value: string): number {
    if (this.inputMap.has(value)) {
      const val = this.inputMap.get(value);
      return val ? val.value : 0;
    }
    return 0;
  }

  onHorizantalInput(value: number) {
    this.horizontal.value = value;
  }

  onVerticalInput(value: number) {
    this.vertical.value = value;
  }
}

import { WebGLRenderer } from "three"

export function createRenderer(container: HTMLElement){
    const renderer = new WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    return renderer
}
import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-maze',
  imports: [],
  templateUrl: './three-maze.component.html',
  styleUrl: './three-maze.component.scss'
})
export class ThreeMazeComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') private canvas!: ElementRef;

  @Input() maze: number[][][] = [];

  private cube!: THREE.Mesh;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.Camera;

  ngAfterViewInit(): void {
    this.initScene();
    // this.createMazeModel();
    this.render();
  }

  ngOnChanges(): void {
    this.createMazeModel();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xBED3D4);
  
    let canvasElement = this.canvas.nativeElement;
    let aspectRatio = canvasElement.clientWidth / canvasElement.clientHeight;
  
    this.camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 1000);
    this.camera.position.z = 8;
  
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
  }

  createMazeModel(): void {
    console.log("Creating maze model");
    console.log(this.maze);
    this.scene.clear();
    
    this.maze.forEach((layer, x) => {
      layer.forEach((row, y) => {
        row.forEach((cell, z) => {
          if (cell === 1) {
            let wall = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color:0x696969 }));
            wall.position.set(x, y, z);
            this.scene.add(wall);
          }
        });
      });
    });
  }

  initCube(): void {
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color:0x696969 }));
    this.cube.position.set(0, 0, 0);
    
    this.cube.rotation.x = Math.PI / 4;
    this.scene.add(this.cube);
  }

  render(): void {    
    this.renderer.render(this.scene, this.camera);
  
    // this.cube.rotation.y += 0.01;
  
    requestAnimationFrame(this.render.bind(this));
  }
  

}

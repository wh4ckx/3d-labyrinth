import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

@Component({
  selector: 'app-three-maze',
  imports: [],
  templateUrl: './three-maze.component.html',
  styleUrl: './three-maze.component.scss'
})
export class ThreeMazeComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') private canvas!: ElementRef;

  @Input() maze: number[][][] = [];
  @Input() start: [number, number, number] = [0, 0, 0];
  @Input() stop: [number, number, number] = [0, 0, 0];
  @Input() path: number[][] = [];

  private mazeGroup!: THREE.Group;
  private pathGroup!: THREE.Group;
  private startCube!: THREE.Mesh;
  private stopCube!: THREE.Mesh;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.Camera;
  private controls!: OrbitControls;

  ngAfterViewInit(): void {
    this.initScene();
    // this.createMazeModel();
    this.updateStartStop();
    this.render();
  }

  ngOnChanges(changes:SimpleChanges): void {
    if (changes['maze']){
      this.updateMazeModel();

    }
    if (changes['start'] || changes['stop']) {
      this.updateStartStop();
    }

    if (changes['path']) {
      this.drawPath();
    }
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xBED3D4);
  
    let canvasElement = this.canvas.nativeElement;
    let aspectRatio = canvasElement.clientWidth / canvasElement.clientHeight;
  
    


    this.renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);

    this.camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 1000);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.update();

    
  }

  updateStartStop(): void {
    console.log(this.start, this.stop);
    if (this.startCube) {
      this.scene.remove(this.startCube);
    }

    if (this.stopCube) {
      this.scene.remove(this.stopCube);
    }

    this.startCube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color:0x00ff00 }));
    this.startCube.position.set(...this.start);
    this.scene.add(this.startCube);

    this.stopCube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color:0xff0000 }));
    this.stopCube.position.set(...this.stop);
    this.scene.add(this.stopCube);
  }

  updateMazeModel(): void {
    if (this.mazeGroup) {
      this.scene.remove(this.mazeGroup);
    }
    if(this.pathGroup) {
      this.scene.remove(this.pathGroup);
    }

    this.camera.position.set(0, 0, Math.max(...this.maze.map(layer => layer.length)) * 1.5);

    // set rotation point to center of maze
    this.controls.target.set(this.maze.length / 2, this.maze[0].length / 2, this.maze[0][0].length / 2);
    this.controls.update();

    this.mazeGroup = new THREE.Group();

    this.maze.forEach((layer, x) => {
      layer.forEach((row, y) => {
        row.forEach((cell, z) => {
          if (cell === 1) {
            let wall = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color:0x696969 }));
            wall.position.set(x, y, z);
            this.mazeGroup.add(wall);
          }
        });
      });
    });

    this.scene.add(this.mazeGroup);
  }

  drawPath(): void {
    if (this.path.length === 0) {
      return;
    }

    if (this.pathGroup) {
      this.scene.remove(this.pathGroup);
    }

    console.log(this.path);

    this.pathGroup = new THREE.Group();

    this.path.forEach(([x, y, z]) => {
      let pathCube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color:0x0000ff }));
      pathCube.position.set(x, y, z);
      this.pathGroup.add(pathCube);
    });

    this.scene.add(this.pathGroup);
  }

  render(): void {    
    this.renderer.render(this.scene, this.camera);
  
    // this.cube.rotation.y += 0.01;

    
  
    requestAnimationFrame(this.render.bind(this));
  }
  

}

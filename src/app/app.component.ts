import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { PathService } from './services/path/path.service';
import { FormsModule } from '@angular/forms';
import { MazeService } from './services/maze/maze.service';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = '3d-labyrinth';
  size = [5, 5, 5];
  start = [0, 0, 0];
  stop = [0, 0, 0];

  maze : number[][][] = [];

  constructor(private pathService: PathService, private mazeService: MazeService) {}

  
  @ViewChild('canvas') private canvas!: ElementRef;

  private cube!: THREE.Mesh;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.Camera;

  ngAfterViewInit(): void {
    this.initScene();
    this.initCube();
    this.render();
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

  initCube(): void {
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ color:0x696969 }));
    this.cube.rotation.x = Math.PI / 4;
    this.scene.add(this.cube);
  }

  render(): void {    
    this.renderer.render(this.scene, this.camera);
  
    // this.cube.rotation.y += 0.01;
  
    requestAnimationFrame(this.render.bind(this));
  }
  
  findPath() {
    console.log(this.maze);
    this.pathService.findPath(this.maze, this.start, this.stop).subscribe(path => console.log(path));
  }

  generateMaze() {
    this.maze = this.mazeService.generateMaze(this.size);
  }


}

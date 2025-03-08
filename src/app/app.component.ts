import { Component, OnInit, signal } from '@angular/core';
import { PathService } from './services/path/path.service';
import { FormsModule } from '@angular/forms';
import { MazeService } from './services/maze/maze.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = '3d-labyrinth';
  size = [5, 5, 5];
  start = [0, 0, 0];
  stop = [0, 0, 0];

  maze : number[][][] = [];

  constructor(private pathService: PathService, private mazeService: MazeService) {}

  ngOnInit() {
    this.findPath();
  }

  findPath() {
    console.log(this.maze);
    this.pathService.findPath(this.maze, this.start, this.stop).subscribe(path => console.log(path));
  }

  generateMaze() {
    this.maze = this.mazeService.generateMaze(this.size);
  }


}

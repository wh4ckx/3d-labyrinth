import { Component, signal, WritableSignal} from '@angular/core';
import { PathService } from './services/path/path.service';
import { FormsModule } from '@angular/forms';
import { MazeService } from './services/maze/maze.service';
import { ThreeMazeComponent } from './components/three-maze/three-maze.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ThreeMazeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '3d-labyrinth';
  size = [5, 5, 5];
  start : [number, number, number] = [0, 0, 0];
  stop : [number, number, number] = [0, 0, 0];

  maze : WritableSignal<number[][][]> = signal([]);

  constructor(private pathService: PathService, private mazeService: MazeService) {}

  updateStartStop() {
    this.start = [...this.start]
    this.stop = [...this.stop]
  }
  
  findPath() {

    this.pathService.findPath(this.maze(), this.start, this.stop).subscribe(path => console.log(path));
  }

  generateMaze() {
    this.maze.set(this.mazeService.generateMaze(this.size));
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PathService } from './services/path/path.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = '3d-labyrinth';

  constructor(private pathService: PathService) {}

  ngOnInit() {
    this.findPath();
  }

  findPath() {
    this.pathService.findPath([[[0]]], [0, 0, 0], [0, 0, 0]).subscribe(path => console.log(path));
  }
}

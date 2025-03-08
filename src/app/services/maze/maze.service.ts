import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MazeService {

  constructor() { }

  generateMaze(size: number[]) {
    const [x, y, z] = size; 
    return Array.from({length: x}, () => Array.from({length: y}, () => Array.from({length: z}, () => Math.random() > 0.8 ? 1 : 0)));
  }
}

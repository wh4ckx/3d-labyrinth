import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(private http: HttpClient) { 
  }

  findPath(maze : number[][][], start : number[], stop : number[]) : Observable<number[][]> {
    return this.http.post<number[][]>("/api/find_path", {maze, start, stop});
  }
    
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contraint } from '../models/contraint.model';

const API: string = "http://localhost:8080/lunchtime";

@Injectable({
  providedIn: 'root'
})
export class ContraintService {

  constructor(private http: HttpClient) { }

  public getContraint(): Observable<Contraint> {
    return this.http.get<Contraint>(API + "/constraint/find/" + 1)
  }


}

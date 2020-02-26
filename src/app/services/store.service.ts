import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public blogsGlobal = [];
  public tipsters = [];

  constructor() { }
}

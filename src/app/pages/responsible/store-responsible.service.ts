import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export interface ResResponsiblePage{
  title: SafeHtml,
  content: SafeHtml,
  imgUrl: string,
  loaded: boolean
}

@Injectable({
  providedIn: 'root'
})
export class StoreResponsibleService {
  response: ResResponsiblePage = {
    title: "",
    content: "",
    imgUrl: "",
    loaded: false
  }
  constructor() { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly url = 'http://127.0.0.1:5000/post'
  private readonly visit_times = "http://127.0.0.1:5000/visit_times"

 // PngSource = new BehaviorSubject<any>('jgp_url');
 // pngUrl = this.PngSource.asObservable();
 // PngSource_modal = new BehaviorSubject<any>('png_url_modal')
 // pngUrl_modal = this.PngSource_modal.asObservable();

  constructor(private http: HttpClient) {}

  cdqa(post_body) {
  return this.http.post(this.url, post_body)}

  visitTimes(post_body) {
  return this.http.post(this.visit_times, post_body)}

 // updatePngSource(newPngUrl) {
  //  this.PngSource.next(newPngUrl) }

 // updatePngSource_modal(newPngUrl_modal) {
  //  this.PngSource_modal.next(newPngUrl_modal)}
}



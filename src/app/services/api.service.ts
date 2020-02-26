import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

function toFormData(data) {
  const formData: any = new FormData();
  for (const key in data) {
    if (data[key]) { formData.append(key, data[key]); }
  }
  return formData;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getResponsible() {
    return this.http.get('https://www.bettinggods.com/api/how_to_gamble_responsibly/');
  }
  sendSupport(formData) {
    return this.http.post('http://members.bettinggods.com/api/support', formData);
  }
  toggleBlogNotif(formData) {
    return this.http.post('https://members.bettinggods.com/api/toggle_notification_status', formData);
  }
  toggleTipNotif(formData) {
    return this.http.post('https://bettinggods.com/api/register_device_token', formData);
  }
  getCategories() {
    return this.http.get('https://bettinggods.com/api/get_categories');
  }
  getBlogs(page, currentCatId) {
    return this.http.get('https://bettinggods.com/api/get_recent_posts?page=' + page + '&cat=' + currentCatId);
  }
  getBlog(blogId) { return this.http.get('https://bettinggods.com/api/get_post/?id=' + blogId); }
  getTipstersCategories(data) {
    const formData = toFormData(data);
    return this.http.post('https://members.bettinggods.com/api/get_categories', formData);
  }
  getTipsters(tipId, page, data) {
    const formData = toFormData(data);
    return this.http.post('https://members.bettinggods.com/api/get_recent_posts?count=15&cat=' + tipId + '&page=' + page, formData);
  }

  getBuyTipstersCategories(page) {
    return this.http.get('https://bettinggods.com/api/get_recent_posts?post_type=tipsters&page=' + page);
  }
}

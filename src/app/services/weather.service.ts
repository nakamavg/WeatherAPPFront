// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://backendweatherjava-production.up.railway.app/api/weather'; // URL de tu backend

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    console.log('Obteniendo datos meteorológicos para:', city);
    return this.http.get(`${this.apiUrl}/${city}`);
  }
}
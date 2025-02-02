// src/app/app.component.ts
import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [WeatherService],
})
export class AppComponent {
  city = '';
  weatherData: any;
  errorMessage = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather(): void {
    console.log('Método searchWeather llamado'); // Añade este log para verificar
    if (!this.city.trim()) {
      this.errorMessage = 'Por favor, ingresa una ciudad válida.';
      return;
    }

    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = data;
        this.errorMessage = '';
        console.log('Datos meteorológicos recibidos:', data);
      },
      (error) => {
        this.weatherData = null;
        this.errorMessage = 'No se pudo obtener los datos meteorológicos.';
        console.error('Error al obtener datos:', error);
      }
    );
  }
}
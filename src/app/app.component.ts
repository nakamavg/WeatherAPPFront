// src/app/app.component.ts
import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [WeatherService],
})
export class AppComponent {
  title = 'meteo-app';
  city = '';
  weatherData: any;
  errorMessage = '';
  isLoading = false;
  raindrops = Array(50).fill(0).map(() => ({
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 2 + 's'
  }));

  getWeatherClass(): string {
    if (!this.weatherData) return '';
    
    if (this.weatherData.description?.includes('rain') || 
        this.weatherData.description?.includes('shower')) {
      return 'rain';
    }
    
    const temp = this.weatherData.temperature;
    if (temp >= 25) return 'hot';
    if (temp <= 10) return 'cold';
    return '';
  }

  isDay(): boolean {
    const hours = new Date().getHours();
    return hours >= 6 && hours < 20;
  }

  constructor(private weatherService: WeatherService) {}

  searchWeather(): void {
    if (!this.city.trim()) {
      this.errorMessage = 'Por favor, ingrese una ciudad válida.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = {
          ...data,
          description: this.translateWeatherDescription(data.description)
        };
        this.isLoading = false;
      },
      (error) => {
        this.weatherData = null;
        this.errorMessage = 'No se pudieron obtener los datos meteorológicos. Por favor, inténtelo de nuevo.';
        this.isLoading = false;
        console.error('Error al obtener datos:', error);
      }
    );
  }

  private translateWeatherDescription(description: string): string {
    const translations: { [key: string]: string } = {
      'clear sky': 'cielo despejado',
      'few clouds': 'algunas nubes',
      'scattered clouds': 'nubes dispersas',
      'broken clouds': 'nublado',
      'shower rain': 'lluvia ligera',
      'rain': 'lluvia',
      'thunderstorm': 'tormenta',
      'snow': 'nieve',
      'mist': 'neblina'
    };
    return translations[description] || description;
  }
}
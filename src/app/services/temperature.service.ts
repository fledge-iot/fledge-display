import { Injectable } from '@angular/core';

export class Temperature {
    timestamp: string;
    reading: {
        temperature: number;
    }
}

const TEMPERATURES: Temperature[] = [
    {
        timestamp: '2018-05-23 03:05:19',
        reading: {
            temperature: 75
        }
    },
    {
        timestamp: '2018-05-23 03:05:18',
        reading: {
            temperature: 75
        }
    },
    {
        timestamp: '2018-05-23 03:05:17',
        reading: {
            temperature: 75
        }
    },
];

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor() { }

  getTemperatures(): Temperature[] {
    return TEMPERATURES;
  }
}

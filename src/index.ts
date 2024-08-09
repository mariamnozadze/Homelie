import { deviceManagementSystem } from './deviceManagement';
import { templateRegistry } from './templateRegistry';
import { mainView } from './mainView';
import { render } from 'lit-html';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomieDevice } from './types';

function initializeSystem() {
  // Set up the initial A-Frame scene
  const app = document.getElementById('app');
  if (app) {
    render(mainView(deviceManagementSystem.devices.getValue()), app);
  }

  // Subscribe to device updates
  deviceManagementSystem.devices.subscribe((devices) => {
    if (app) {
      render(mainView(devices), app);
    }
  });

  // Add example devices
  const temperatureSensor: HomieDevice = {
    $homie: '4.0',
    $name: 'temperature-sensor',
    $state: 'ready',
    $nodes: {
      sensor: {
        $name: 'Temperature Sensor',
        $type: 'sensor',
        $properties: {
          temperature: {
            $name: 'Temperature',
            $datatype: 'float',
            $settable: false,
            $retained: true,
            $unit: '°C',
            value: 22.5
          }
        }
      }
    }
  };

  const lightSensor: HomieDevice = {
    $homie: '4.0',
    $name: 'light-sensor',
    $state: 'ready',
    $nodes: {
      sensor: {
        $name: 'Light Sensor',
        $type: 'sensor',
        $properties: {
          light: {
            $name: 'Light',
            $datatype: 'integer',
            $settable: false,
            $retained: true,
            $unit: 'lux',
            value: 500
          }
        }
      }
    }
  };

  deviceManagementSystem.addDevice('temp-sensor-1', temperatureSensor);
  deviceManagementSystem.addDevice('light-sensor-1', lightSensor);

  // Simulate external data sources
  const temperatureStream = interval(5000).pipe(
    map(() => 20 + Math.random() * 10)
  );

  const lightStream = interval(3000).pipe(
    map(() => Math.floor(100 + Math.random() * 900))
  );

  deviceManagementSystem.connectExternalDataSource('temp-sensor-1', 'sensor', 'temperature', temperatureStream);
  deviceManagementSystem.connectExternalDataSource('light-sensor-1', 'sensor', 'light', lightStream);
}

// Initialize the system when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeSystem);
# Homelie: A-Frame IoT Visualization

**Homelie** ( [ɔ.me.li] ) is a reactive A-Frame-based 3D visualization system for IoT devices, following the Homie convention for device representation.
It provides a modular and extensible framework for visualizing IoT device data in a 3D environment.

## Features

- Fully reactive using RxJS
- Modular and extensible architecture
- Compliant with the Homie convention for device representation
- Dynamic addition and removal of devices
- Real-time updates of device properties
- Customizable visualizations for different device types and properties
- Integration with external data sources

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/cmcrobotics/homelie.git
   cd homelie
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Development Server

To start the development server:

```
npm run start
```

This will start the development server, and you can view the visualization in your web browser at `http://localhost:9000`.

## Usage

### Adding a Device

To add a new device to the visualization:

```typescript
import { deviceManagementSystem } from './deviceManagement';

const newDevice = {
  $homie: '4.0',
  $name: 'my-sensor',
  $state: 'ready',
  $nodes: {
    sensor: {
      $name: 'My Sensor',
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

deviceManagementSystem.addDevice('my-sensor-1', newDevice);
```

### Updating a Property

To update a property value:

```typescript
deviceManagementSystem.updateProperty('my-sensor-1', 'sensor', 'temperature', 23.5);
```

### Connecting an External Data Source

To connect an external data source (e.g., an RxJS stream) to a device property:

```typescript
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

const temperatureStream = interval(5000).pipe(
  map(() => 20 + Math.random() * 10)
);

deviceManagementSystem.connectExternalDataSource('my-sensor-1', 'sensor', 'temperature', temperatureStream);
```

### Adding Custom Visualizations

To add a custom visualization for a device or property type, use the `templateRegistry`:

```typescript
import { templateRegistry } from './templateRegistry';

templateRegistry.addDeviceTemplate('my-custom-sensor', {
  render: (device) => `
    <a-entity>
      <a-cone position="0 0.5 0" radius-bottom="0.5" radius-top="0" height="1" color="green"></a-cone>
      <a-text value="${device.$name}" position="0 1.5 0" align="center"></a-text>
    </a-entity>
  `
});

templateRegistry.addPropertyTemplate('my-custom-property', {
  render: (property) => `
    <a-entity>
      <a-text value="${property.$name}: ${property.value}" position="0 0.5 0" align="center"></a-text>
      <a-torus position="0 0 0" radius="0.5" radius-tubular="0.1" arc="${property.value / 100 * 360}" color="purple"></a-torus>
    </a-entity>
  `
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceState, DeviceManagementSystem, HomieDevice } from './types';

export class DeviceManagementSystemImpl implements DeviceManagementSystem {
  devices: BehaviorSubject<DeviceState>;

  constructor() {
    this.devices = new BehaviorSubject<DeviceState>({});
  }

  updateProperty(deviceId: string, nodeId: string, propertyId: string, value: any): void {
    const currentState = this.devices.getValue();
    if (currentState[deviceId] && currentState[deviceId].$nodes[nodeId] && currentState[deviceId].$nodes[nodeId].$properties[propertyId]) {
      currentState[deviceId].$nodes[nodeId].$properties[propertyId].value = value;
      this.devices.next({ ...currentState });
    }
  }

  setDeviceType(deviceId: string, type: string): void {
    const currentState = this.devices.getValue();
    if (currentState[deviceId]) {
      currentState[deviceId].$name = type;
      this.devices.next({ ...currentState });
    }
  }

  addDevice(deviceId: string, device: HomieDevice): void {
    const currentState = this.devices.getValue();
    currentState[deviceId] = device;
    this.devices.next({ ...currentState });
  }

  removeDevice(deviceId: string): void {
    const currentState = this.devices.getValue();
    delete currentState[deviceId];
    this.devices.next({ ...currentState });
  }

  connectExternalDataSource(deviceId: string, nodeId: string, propertyId: string, dataStream: Observable<any>): void {
    dataStream.subscribe((value) => {
      this.updateProperty(deviceId, nodeId, propertyId, value);
    });
  }
}

export const deviceManagementSystem = new DeviceManagementSystemImpl();
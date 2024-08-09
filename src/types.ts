import { BehaviorSubject } from 'rxjs';
import { TemplateResult } from 'lit-html';

export interface HomieAttribute {
  $name: string;
  $datatype: 'string' | 'integer' | 'float' | 'boolean' | 'enum' | 'color';
  $settable: boolean;
  $retained: boolean;
  $unit?: string;
  $format?: string;
}

export interface HomieProperty extends HomieAttribute {
  value: any;
}

export interface HomieNode {
  $name: string;
  $type: string;
  $properties: { [key: string]: HomieProperty };
}

export interface HomieDevice {
  $homie: string;
  $name: string;
  $state: 'init' | 'ready' | 'disconnected' | 'sleeping' | 'lost' | 'alert';
  $nodes: { [key: string]: HomieNode };
}

export interface DeviceState {
  [deviceId: string]: HomieDevice;
}

export interface Template {
  render: (data: any) => TemplateResult;
}

export interface TemplateRegistry {
  deviceTemplates: BehaviorSubject<{ [key: string]: Template }>;
  propertyTemplates: BehaviorSubject<{ [key: string]: Template }>;
}

export interface DeviceManagementSystem {
  devices: BehaviorSubject<DeviceState>;
  updateProperty: (deviceId: string, nodeId: string, propertyId: string, value: any) => void;
  setDeviceType: (deviceId: string, type: string) => void;
  addDevice: (deviceId: string, device: HomieDevice) => void;
  removeDevice: (deviceId: string) => void;
}
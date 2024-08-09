import { BehaviorSubject } from 'rxjs';
import { TemplateRegistry, Template } from './types';
import { html, TemplateResult } from 'lit-html';

class TemplateRegistryImpl implements TemplateRegistry {
  deviceTemplates: BehaviorSubject<{ [key: string]: Template }>;
  propertyTemplates: BehaviorSubject<{ [key: string]: Template }>;

  constructor() {
    this.deviceTemplates = new BehaviorSubject<{ [key: string]: Template }>({});
    this.propertyTemplates = new BehaviorSubject<{ [key: string]: Template }>({});
  }

  addDeviceTemplate(type: string, template: Template): void {
    const currentTemplates = this.deviceTemplates.getValue();
    this.deviceTemplates.next({ ...currentTemplates, [type]: template });
  }

  addPropertyTemplate(type: string, template: Template): void {
    const currentTemplates = this.propertyTemplates.getValue();
    this.propertyTemplates.next({ ...currentTemplates, [type]: template });
  }

  getDeviceTemplate(type: string): Template | undefined {
    return this.deviceTemplates.getValue()[type];
  }

  getPropertyTemplate(type: string): Template | undefined {
    return this.propertyTemplates.getValue()[type];
  }
}

export const templateRegistry = new TemplateRegistryImpl();

// Add some example templates
templateRegistry.addDeviceTemplate('default', {
  render: (device) => html`
    <a-entity>
      <a-box position="3 0.5 3" color="red"></a-box>
      <a-text value="${device.$name}" position="3 1.5 0" align="center"></a-text>
    </a-entity>
  `
});

templateRegistry.addDeviceTemplate('temperature-sensor', {
  render: (device) => html`
    <a-entity>
      <a-cylinder position="0 0.5 0" radius="0.5" height="1" color="blue"></a-cylinder>
      <a-text value="${device.$name}" position="0 1.5 0" align="center"></a-text>
    </a-entity>
  `
});

templateRegistry.addDeviceTemplate('light-sensor', {
  render: (device) => html`
    <a-entity>
      <a-sphere position="0 0.5 0" radius="0.5" color="yellow"></a-sphere>
      <a-text value="${device.$name}" position="0 1.5 0" align="center"></a-text>
    </a-entity>
  `
});

templateRegistry.addPropertyTemplate('default', {
  render: (property) => html`
    <a-text value="${property.$name}: ${property.value}" position="3 2 0" align="center"></a-text>
  `
});

templateRegistry.addPropertyTemplate('temperature', {
  render: (property) => html`
    <a-entity>
      <a-text value="${property.$name}: ${property.value}°C" position="3 2 0" align="center"></a-text>
      <a-box position="3 2.5 0" depth="0.1" height="${0.1 * property.value}" width="0.5" color="${property.value > 30 ? 'red' : 'blue'}"></a-box>
    </a-entity>
  `
});

templateRegistry.addPropertyTemplate('light', {
  render: (property) => html`
    <a-entity>
      <a-text value="${property.$name}: ${property.value} lux" position="0 0.5 0" align="center"></a-text>
      <a-ring position="0 0 0" radius-inner="0.3" radius-outer="${0.3 + (property.value / 1000)}" color="yellow"></a-ring>
    </a-entity>
  `
});

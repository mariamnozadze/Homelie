import { html, TemplateResult } from 'lit-html';
import { DeviceState, HomieDevice, HomieNode, HomieProperty } from './types';
import { templateRegistry } from './templateRegistry';

function renderProperty(property: HomieProperty, nodeId: string, deviceId: string): TemplateResult {
  const template = templateRegistry.getPropertyTemplate(property.$datatype) || templateRegistry.getPropertyTemplate('default');
  return template ? html`${template.render(property)}` : html``;
}

function renderNode(node: HomieNode, deviceId: string): TemplateResult {
  return html`
    <a-entity>
      ${Object.entries(node.$properties).map(([propertyId, property]) => 
        renderProperty(property, node.$name, deviceId)
      )}
    </a-entity>
  `;
}

function renderDevice(device: HomieDevice, deviceId: string): TemplateResult {
  const template = templateRegistry.getDeviceTemplate(device.$name) || templateRegistry.getDeviceTemplate('default');
  return template ? html`${template.render(device)}` : html``;
}

export function mainView(devices: DeviceState): TemplateResult {
  return html`
    <a-scene>
      <a-sky color="#ECECEC"></a-sky>
      <a-entity position="0 0 -5">
        ${Object.entries(devices).map(([deviceId, device]) => html`
          <a-entity>
            ${renderDevice(device, deviceId)}
            ${Object.entries(device.$nodes).map(([nodeId, node]) => 
              renderNode(node, deviceId)
            )}
          </a-entity>
        `)}
      </a-entity>
    </a-scene>
  `;
}
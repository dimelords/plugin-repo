// plugins/utils/basePlugin.js
export class BasePlugin {
    constructor(name, manifest) {
      this.name = name;
      this.manifest = manifest;
    }
    
    initialize() {
      console.log(`Initializing plugin: ${this.manifest.displayName} (${this.manifest.version})`);
    }
    
    render() {
      return null;
    }
  
    getConfig() {
      return this.manifest.config;
    }
  }
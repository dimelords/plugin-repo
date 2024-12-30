export interface PluginConfig {
  theme: string;
  [key: string]: any;
}

export interface PluginManifest {
  displayName: string;
  id: string;
}

export abstract class BasePlugin {
  manifest: PluginManifest;
  protected config: PluginConfig;
  

  constructor() {
    this.manifest = {
      displayName: '',
      id: ''
    };
    this.config = {
      theme: 'gray'
    };
  }

  getConfig(): PluginConfig {
    return this.config;
  }

  abstract render(): JSX.Element;
}
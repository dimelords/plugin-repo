export interface PluginConfig {
  theme: string;
  [key: string]: any;
}

export interface PluginManifest {
  displayName: string;
  id: string;
}

export class BasePlugin {
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

  render(): JSX.Element {
      throw new Error('render() must be implemented by child class');
  }
}
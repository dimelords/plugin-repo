# plugin-repo

A repository of plugins for React applications using a dynamic plugin loading system. This repository serves as a CDN source for plugin code that can be dynamically loaded into React applications at runtime.

## Structure

```
plugin-repo/
├── plugins/
│   ├── customPlugin.js
│   └── anotherPlugin.js
├── manifests/
│   ├── custom.manifest.js
│   └── another.manifest.js
└── README.md
```

## Usage

### Loading Plugins

To use these plugins in your React application, reference them in your manifest using the jsDelivr CDN URL:

```javascript
{
  name: 'custom',
  version: '1.0.0',
  displayName: 'Custom Plugin',
  entryPoint: 'https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/plugins/customPlugin.js',
  // ... other manifest properties
}
```

### Version Control

Plugins are versioned using Git tags. To use a specific version of a plugin, replace `@main` with `@v1.0.0` in the CDN URL.

## Creating New Plugins

1. Add your plugin code in the `plugins/` directory
2. Create a corresponding manifest in the `manifests/` directory
3. Ensure your plugin extends the base plugin class
4. Test your plugin locally before committing
5. Tag your release with a semantic version number

## Plugin Requirements

- Plugins must be written in React and export a default class
- Each plugin needs a corresponding manifest file
- Plugins should handle their own cleanup and initialization
- External dependencies should be declared in the manifest

### Example Plugin Structure

```javascript
// plugins/customPlugin.js
import React, { useEffect, useRef } from 'react';

class CustomPluginBase {
  constructor(name, manifest) {
    this.name = name;
    this.manifest = manifest;
  }

  getConfig() {
    return this.manifest.config;
  }

  renderContent(props) {
    return <CustomPluginContent {...props} manifest={this.manifest} config={this.getConfig()} />;
  }

  render() {
    return this.renderContent();
  }
}

function CustomPluginContent({ manifest, config }) {
  // Your component code here
  return (
    <div>
      <h2>{manifest.displayName}</h2>
      // ... more JSX
    </div>
  );
}

export default CustomPluginBase;
```

### Example Manifest Structure

```javascript
// manifests/custom.manifest.js
export default {
  name: 'custom',
  version: '1.0.0',
  displayName: 'Custom Plugin',
  description: 'A dynamically loaded plugin',
  author: 'Your Name',
  entryPoint: 'https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/plugins/customPlugin.js',
  packages: [
    {
      name: 'chart.js',
      version: '4.4.1',
      globalName: 'Chart',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
    }
  ],
  config: {
    theme: 'purple'
  }
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-plugin`)
3. Commit your changes (`git commit -am 'Add amazing plugin'`)
4. Push to the branch (`git push origin feature/amazing-plugin`)
5. Create a Pull Request

## License

MIT

## Support

For issues and feature requests, please use the GitHub issues system.

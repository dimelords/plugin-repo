# plugin-repo
[![](https://data.jsdelivr.com/v1/package/gh/dimelords/plugin-repo/badge)](https://www.jsdelivr.com/package/gh/dimelords/plugin-repo)

A repository of plugins for React applications using a TypeScript-based dynamic plugin loading system. This repository serves as a CDN source for plugin code that can be dynamically loaded into React applications at runtime.

## Structure

```
plugin-repo/
├── plugins/                 # Source files
│   ├── utils/
│   │   └── basePlugin.ts   # Base plugin class and interfaces
│   └── customPlugin.tsx    # Example custom plugin implementation
├── manifests/              # Plugin manifests
│   └── custom.manifest.js  # Manifest points to dist/plugins/customPlugin.js
├── dist/                   # Built JavaScript files (generated)
│   └── plugins/
│       └── customPlugin.js # Built version used at runtime
└── README.md
```

## Development

### Prerequisites

- Node.js (v20 or later)
- npm

### Setup

1. Clone the repository
```bash
git clone https://github.com/dimelords/plugin-repo.git
cd plugin-repo
```

2. Install dependencies
```bash
npm install
```

3. Build the plugins
```bash
npm run type-check  # Run TypeScript type checking
npm run build      # Build plugins to dist directory
```

## Usage

### Loading Plugins

To use these plugins in your React application, reference them in your manifest using the jsDelivr CDN URL. Note that the manifest's entryPoint should point to the built file in the dist directory, not the source file:

```javascript
{
  name: 'custom',
  version: '1.0.0',
  displayName: 'Custom Plugin',
  // Point to the built .js file in dist/, not the source .tsx file
  entryPoint: 'https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/dist/plugins/customPlugin.js',
  // ... other manifest properties
}
```

### Version Control

Plugins are versioned using Git tags. To use a specific version of a plugin, replace `@main` with `@v1.0.0` in the CDN URL.

## Creating New Plugins

1. Create a new `.tsx` file in the `plugins/` directory
2. Extend the BasePlugin class:

```typescript
import { BasePlugin } from "./utils/basePlugin";

class YourPlugin extends BasePlugin {
    manifest = {
        displayName: "Your Plugin Name",
        id: "your-plugin-id"
    };

    render(): JSX.Element {
        return (
            // Your React component here
        );
    }
}

export default YourPlugin;
```

3. Create a manifest file in `manifests/` directory pointing to the built version
4. Test your plugin locally before committing
5. Tag your release with a semantic version number

## Plugin Requirements

- Plugins must be written in TypeScript/React and export a default class
- Each plugin must extend the BasePlugin class
- Plugins should handle their own cleanup and initialization
- External dependencies should be declared in the manifest
- Manifests must point to the built `.js` file in the `dist/` directory

### Example Plugin Structure

```typescript
// plugins/customPlugin.tsx
import React, { useEffect, useRef } from 'react';
import { BasePlugin, PluginConfig, PluginManifest } from "./utils/basePlugin";

interface ContentProps {
    manifest: PluginManifest;
    config: PluginConfig;
}

class CustomPluginBase extends BasePlugin {
    manifest = {
        displayName: "Custom Plugin",
        id: "custom-plugin"
    };

    renderContent(props: ContentProps): JSX.Element {
        return <CustomPluginContent {...props} manifest={this.manifest} config={this.getConfig()} />;
    }

    render(): JSX.Element {
        return this.renderContent({
            manifest: this.manifest,
            config: this.getConfig()
        });
    }
}

function CustomPluginContent({ manifest, config }: ContentProps) {
    return (
        <div className={`p-4 bg-${config.theme}-100 rounded`}>
            <h2 className="font-bold">{manifest.displayName}</h2>
            {/* Your component JSX here */}
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
  // Note: entryPoint points to the built file, not the source
  entryPoint: 'https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/dist/plugins/customPlugin.js',
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

## Build System

The project uses:
- TypeScript for type checking and compilation
- Rollup for bundling
- GitHub Actions for automatic builds
- jsDelivr for CDN delivery

The build process:
1. Runs type checking on all TypeScript files
2. Bundles plugins into ES modules
3. Outputs built files to the `dist` directory
4. Automatically commits built files when merged to main
5. Purges jsDelivr cache for any updated files

Note: After changes are pushed to main, the GitHub Action automatically purges the jsDelivr cache for updated files. This ensures that users always get the latest version of your plugins and manifests when using the CDN URLs.

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
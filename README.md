# Plugin Repository
[![](https://data.jsdelivr.com/v1/package/gh/dimelords/plugin-repo/badge)](https://www.jsdelivr.com/package/gh/dimelords/plugin-repo)

A TypeScript-based plugin system for React applications that supports dynamic loading via CDN. This repository serves as both the plugin registry and runtime delivery mechanism.

## Features

- TypeScript support out of the box
- Dynamic loading via jsDelivr CDN
- Automatic builds via GitHub Actions
- Automatic cache purging
- External package management (e.g., Chart.js)

## Project Structure

```
plugin-repo/
├── plugins/                  # Source files
│   ├── utils/
│   │   └── basePlugin.ts    # Base plugin class and interfaces
│   └── customPlugin.tsx     # Example plugin implementation
├── manifests/               # Plugin manifests
│   └── custom.manifest.ts   # Example manifest
├── dist/                    # Built files (generated)
│   └── plugins/
│       └── customPlugin.js  # Built plugin
└── README.md
```

## Plugin Development

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

### Development Workflow

1. Create your plugin files in `plugins/`
2. Create a manifest in `manifests/`
3. Build locally to test
```bash
npm run type-check  # Run TypeScript type checking
npm run build      # Build plugins
```

### Creating a New Plugin

1. Create a new `.tsx` file in `plugins/`:

```typescript
import React from "react";
import { BasePlugin } from "./utils/basePlugin";
import manifest from "@manifests/your.manifest";

class YourPlugin extends BasePlugin {
    constructor() {
        super(manifest);
    }

    render(): React.ReactElement {
        return (
            <div className={`p-4 bg-${this.getConfig().theme}-100`}>
                {this.manifest.displayName}
            </div>
        );
    }
}

export default YourPlugin;
```

2. Create a manifest file in `manifests/`:

```typescript
import type { PluginManifest } from '../plugins/utils/basePlugin';

const manifest: PluginManifest = {
    name: 'your-plugin',
    version: '1.0.0',
    displayName: 'Your Plugin',
    description: 'Your plugin description',
    author: 'Your Name',
    entryPoint: 'https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/dist/plugins/yourPlugin.js',
    dependencies: [],
    packages: [
        {
            name: 'some-package',
            version: '1.0.0',
            globalName: 'GlobalName',
            url: 'https://cdn.jsdelivr.net/npm/some-package@1.0.0'
        }
    ],
    config: {
        theme: 'blue'
    }
};

export default manifest;
```

## Build System

The project uses:
- TypeScript for type safety
- Rollup for bundling
- GitHub Actions for CI/CD

### Build Process

1. GitHub Action triggers on push to main
2. Runs type checking
3. Builds plugins into ES modules
4. Commits built files to dist/
5. Purges jsDelivr cache

### Path Aliases

The project supports path aliases for cleaner imports:
- `@manifests/*` -> `manifests/*`
- `@plugins/*` -> `plugins/*`

Example:
```typescript
import manifest from "@manifests/custom.manifest";
```

## Using Plugins

### CDN URLs

Plugins are available via jsDelivr:
```javascript
https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/dist/plugins/[pluginName].js
```

### Version Control

Use specific versions by changing @main to @version:
```javascript
https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@v1.0.0/dist/plugins/customPlugin.js
```

### External Dependencies

If your plugin requires external packages:
1. Add them to your manifest's packages array
2. They will be automatically loaded before your plugin initializes
3. Use CDN URLs from trusted sources (cdnjs, jsdelivr, etc.)

## TypeScript Interfaces

### Base Plugin
```typescript
interface PluginConfig {
    theme: string;
    [key: string]: unknown;
}

interface PluginPackage {
    name: string;
    version: string;
    globalName?: string;
    url: string;
}

interface PluginManifest {
    name: string;
    version: string;
    displayName: string;
    description: string;
    author: string;
    entryPoint: string;
    dependencies: string[];
    packages: PluginPackage[];
    config: PluginConfig;
}
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

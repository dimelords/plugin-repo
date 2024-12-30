# plugin-repo
... [previous content remains the same until Build System section] ...

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

... [rest of the README remains the same] ...
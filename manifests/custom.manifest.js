export default {
    name: 'custom',
    version: '1.0.0',
    displayName: 'Custom Dynamic Plugin',
    description: 'A plugin that uses Chart.js',
    author: 'Fredrik Gustafsson',
    entryPoint: 'https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@v1.0.3/dist/plugins/customPlugin.js',
    dependencies: [],
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
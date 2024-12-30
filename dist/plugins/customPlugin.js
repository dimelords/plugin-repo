const manifest = {
    name: 'custom',
    version: '1.0.0',
    displayName: 'Custom Dynamic Plugin',
    description: 'A plugin that uses Chart.js',
    author: 'Fredrik Gustafsson',
    entryPoint: 'https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/dist/plugins/customPlugin.js',
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

class BasePlugin {
    constructor(manifestData) {
        this.manifest = {
            name: 'base',
            version: '1.0.0',
            displayName: 'Base Plugin',
            description: 'Base plugin implementation',
            author: 'Unknown',
            entryPoint: '',
            dependencies: [],
            packages: [],
            config: {
                theme: 'gray'
            },
            ...manifestData
        };
        this.config = this.manifest.config;
    }
    getConfig() {
        return this.config;
    }
    render() {
        throw new Error('render() must be implemented by child class');
    }
}

const React = window.React || window.React;
const { useRef, useEffect } = React;
class CustomPluginBase extends BasePlugin {
    constructor() {
        super(manifest);
    }
    getConfig() {
        return this.config;
    }
    renderContent(props) {
        return (React.createElement(CustomPluginContent, { ...props, manifest: this.manifest, config: this.getConfig() }));
    }
    render() {
        return this.renderContent({
            manifest: this.manifest,
            config: this.getConfig(),
        });
    }
}
function CustomPluginContent({ manifest, config }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
        const ctx = chartRef.current?.getContext("2d");
        if (chartRef.current && ctx && window.Chart) {
            chartInstance.current = new window.Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Red", "Blue", "Yellow"],
                    datasets: [
                        {
                            label: "My Chart",
                            data: [12, 19, 3],
                        },
                    ],
                },
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);
    return (React.createElement("div", { className: `p-4 bg-${config.theme}-100 rounded` },
        React.createElement("h2", { className: "font-bold" }, manifest.displayName),
        React.createElement("canvas", { ref: chartRef })));
}

export { CustomPluginBase as default };

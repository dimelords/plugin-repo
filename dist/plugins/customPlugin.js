const React = window.React;
const { useRef, useEffect } = React;

class BasePlugin {
    constructor() {
        this.manifest = {
            displayName: '',
            id: ''
        };
        this.config = {
            theme: 'gray'
        };
    }
    getConfig() {
        return this.config;
    }
    render() {
        throw new Error('render() must be implemented by child class');
    }
}

class CustomPluginBase extends BasePlugin {
    constructor() {
        super();
        this.manifest = {
            displayName: "Custom Plugin",
            id: "custom-plugin",
        };
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

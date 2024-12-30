declare global {
  interface Window {
    Chart: typeof import("chart.js").Chart;
  }
}

import manifest from "../manifests/custom.manifest.js";

const React = (window as any).React || window.React;
const { useRef, useEffect } = React as {
  useRef: <T>(initialValue: T | null) => { current: T | null };
  useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
};

import { BasePlugin, PluginConfig, PluginManifest } from "./utils/basePlugin";
interface ContentProps {
  manifest: PluginManifest;
  config: PluginConfig;
}

class CustomPluginBase extends BasePlugin {
  constructor() {
    super(manifest);
  }

  getConfig(): PluginConfig {
    return this.config as PluginConfig;
  }

  renderContent(props: ContentProps): React.ReactElement {
    return (
      <CustomPluginContent
        {...props}
        manifest={this.manifest}
        config={this.getConfig()}
      />
    );
  }

  render(): React.ReactElement {
    return this.renderContent({
      manifest: this.manifest,
      config: this.getConfig(),
    });
  }
}

function CustomPluginContent({ manifest, config }: ContentProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const chartInstance = useRef<any>(null);

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

  return (
    <div className={`p-4 bg-${config.theme}-100 rounded`}>
      <h2 className="font-bold">{manifest.displayName}</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default CustomPluginBase;

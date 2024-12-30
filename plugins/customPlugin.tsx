declare global {
  interface Window {
    Chart: typeof import("chart.js").Chart;
  }
}
import React, { useEffect, useRef } from "react";
import { BasePlugin, PluginConfig, PluginManifest } from "./utils/basePlugin";
interface ContentProps {
  manifest: PluginManifest;
  config: PluginConfig;
}

class CustomPluginBase extends BasePlugin {
  manifest: PluginManifest;

  constructor() {
    super();
    this.manifest = {
      displayName: "Custom Plugin",
      id: "custom-plugin",
    };
  }

  getConfig(): PluginConfig {
    return this.config as PluginConfig;
  }

  renderContent(props: ContentProps): JSX.Element {
    return (
      <CustomPluginContent
        {...props}
        manifest={this.manifest}
        config={this.getConfig()}
      />
    );
  }

  render(): JSX.Element {
    return this.renderContent({
      manifest: this.manifest,
      config: this.getConfig(),
    });
  }
}

function CustomPluginContent({ manifest, config }: ContentProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
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

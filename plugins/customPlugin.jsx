import React, { useEffect, useRef } from "react";
import { BasePlugin } from "https://cdn.jsdelivr.net/gh/dimelords/plugin-repo@main/plugins/utils/basePlugin.js";


class CustomPluginBase extends BasePlugin {
  renderContent(props) {
    return (
      <CustomPluginContent
        {...props}
        manifest={this.manifest}
        config={this.getConfig()}
      />
    );
  }

  render() {
    return this.renderContent();
  }
}

function CustomPluginContent({ manifest, config }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && window.Chart) {
      const ctx = chartRef.current.getContext("2d");

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

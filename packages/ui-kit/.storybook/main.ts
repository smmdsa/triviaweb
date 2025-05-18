import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import tsconfigPaths from 'vite-tsconfig-paths'

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    })
  },
};
export default config;
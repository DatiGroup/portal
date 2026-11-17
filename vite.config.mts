import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import fs from 'fs-extra';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME ?? '/'}`;
  const PORT = Number(env.VITE_APP_PORT) || 5173;

  // Strip console output in production and demo builds
  const isDev = mode !== 'production' && mode !== 'demo';

  const agent = process.argv.find((arg) => arg.startsWith('--agent'))?.split('=')[1] || 'digital-twins';
  const generateBrandAssets = async () => {
    const themeBrandedConfig = `import { ThemeMode } from 'config';
import { PalettesProps } from '@ant-design/colors';
import { PaletteThemeProps } from 'types/theme';

import ThemeConfig from 'brands/${agent}/themeConfig';


export default function Theme(colors: PalettesProps, mode: ThemeMode): PaletteThemeProps {
  return ThemeConfig(colors, mode);
}
`;

    fs.writeFileSync('./src/themes/theme-config.ts', themeBrandedConfig);

    // Update index.html title based on brand
    const brandEnPath = `${__dirname}/src/brands/${agent}/translations/en.json`;
    let brandTitle = 'Digital Twins'; // default fallback

    if (await fs.pathExists(brandEnPath)) {
      const brandEn = await fs.readJSON(brandEnPath);
      brandTitle = brandEn.brandName || brandTitle;
    }

    const indexHtmlPath = `${__dirname}/index.html`;
    let indexHtml = await fs.readFile(indexHtmlPath, 'utf-8');
    indexHtml = indexHtml.replace(/<title>.*<\/title>/, `<title>${brandTitle}</title>`);
    await fs.writeFile(indexHtmlPath, indexHtml);
    console.log(`Updated index.html title to: ${brandTitle}`);

    // Delete any existing favicon files in public directory before copying new ones
    const publicDir = `${__dirname}/public`;
    const brandDir = `${__dirname}/src/brands/${agent}`;

    // Remove all existing favicon.* files from public
    const publicFiles = await fs.readdir(publicDir);
    for (const file of publicFiles) {
      if (file.startsWith('favicon.')) {
        console.log(`Removing existing file: ${publicDir}/${file}`);
        await fs.remove(`${publicDir}/${file}`);
      }
    }

    // Copy all favicon.* files from brand directory
    if (await fs.pathExists(brandDir)) {
      const brandFiles = await fs.readdir(brandDir);
      for (const file of brandFiles) {
        if (file.startsWith('favicon.')) {
          console.log(`Copying file: ${brandDir}/${file} to ${publicDir}/${file}`);
          await fs.copy(`${brandDir}/${file}`, `${publicDir}/${file}`);
        }
      }
    }

    // Copy logo files from brand directory to assets/logo
    const logoSourceDir = `${__dirname}/src/brands/${agent}/logo`;
    const logoDestDir = `${__dirname}/src/assets/logo`;

    if (await fs.pathExists(logoSourceDir)) {
      // Remove existing logo directory
      if (await fs.pathExists(logoDestDir)) {
        console.log(`Removing existing logo directory: ${logoDestDir}`);
        await fs.remove(logoDestDir);
      }

      // Copy brand logo files
      console.log(`Copying logo files from ${logoSourceDir} to ${logoDestDir}`);
      await fs.copy(logoSourceDir, logoDestDir);
    } else {
      console.warn(`Warning: Logo directory not found: ${logoSourceDir}`);
    }
  };

  const brandAssetsPlugin = () => ({
    name: 'brand-assets-plugin',
    async configResolved() {
      await generateBrandAssets();
    }
  });

  return {
    server: {
      // for hot reload in container
      watch: {
        usePolling: true
      },
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 5173
      port: PORT,
      host: true
    },
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window',
      'import.meta.env.VITE_BRAND': JSON.stringify(agent)
    },
    base: API_URL,
    esbuild: {
      drop: !isDev ? ['console', 'debugger'] : []
    },
    // build: {
    //   target: 'esnext'
    // },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setup.tsx'
    },
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
          dev: { logLevel: ['error'] }
        },
        overlay: {
          position: 'tl',
          initialIsOpen: false
        }
      }),
      brandAssetsPlugin(),
      federation({
        name: 'main-portal-app',
        remotes: {
          digitalTwinApp: `${env.VITE_DIGITAL_TWIN_BASE_URL}/assets/remoteEntry.js`,
          digitalTwinBuilderApp: `${env.VITE_DIGITAL_TWIN_BUILDER_BASE_URL}/assets/remoteEntry.js`,
          fragmentRegistryApp: `${env.VITE_FRAGMENT_REGISTRY_BASE_URL}/assets/remoteEntry.js`,
          widgetRegistryApp: `${env.VITE_WIDGET_REGISTRY_BASE_URL}/assets/remoteEntry.js`,
          simulationModelRegistryApp: `${env.VITE_SIMULATION_MODEL_REGISTRY_BASE_URL}/assets/remoteEntry.js`,
          simulationApp: `${env.VITE_SIMULATION_BASE_URL}/assets/remoteEntry.js`,
          dataSourceCatalogApp: `${env.VITE_DATA_SOURCE_CATALOG_BASE_URL}/assets/remoteEntry.js`,
          machineLearningModelApp: `${env.VITE_ML_BASE_URL}/assets/remoteEntry.js`
        },
        exposes: {
          './SharedDataGrid': './src/components/tables/sharedDataGrid/SharedDataGrid'
        },
        shared: [
          'react',
          'react-dom',
          'react-router',
          'react-router-dom',
          'react-redux',
          '@reduxjs/toolkit',
          '@xyflow/react',
          '@mui/x-data-grid',
          '@mui/material',
          '@mui/system',
          '@mui/styled-engine',
          '@emotion/react',
          '@emotion/styled'
        ]
      })
    ],
    resolve: {
      dedupe: [
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        'react-redux',
        '@reduxjs/toolkit',
        '@xyflow/react',
        '@mui/x-data-grid',
        '@mui/material',
        '@mui/system',
        '@mui/styled-engine',
        '@emotion/react',
        '@emotion/styled'
      ]
    }
  };
});

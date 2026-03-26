import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface WidgetConfig {
  name: string;
  uri: string;
  prefersBorder?: boolean;
  csp?: {
    connect_domains?: string[];
    resource_domains?: string[];
    frame_domains?: string[];
  };
  domain?: string;
}

function findWidgetFile(widgetName: string, ext: 'js' | 'css'): string {
  const filename = `${widgetName}.${ext}`;
  // From build/server/src/resources/ → go up 4 levels to project root → web/dist/
  const buildPath = join(__dirname, '../../../../web/dist', filename);
  if (existsSync(buildPath)) {
    return buildPath;
  }
  // From source server/src/resources/ → go up 3 levels to project root → web/dist/
  const sourcePath = join(__dirname, '../../../web/dist', filename);
  if (existsSync(sourcePath)) {
    return sourcePath;
  }
  throw new Error(`Widget file not found: ${filename}`);
}

export function createWidgetResource(config: WidgetConfig) {
  const componentJs = readFileSync(findWidgetFile(config.name, 'js'), 'utf-8');
  const componentCss = readFileSync(findWidgetFile(config.name, 'css'), 'utf-8');

  return {
    uri: config.uri,
    handler: async () => {
      return {
        contents: [{
          uri: config.uri,
          mimeType: 'text/html+skybridge',
          text: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="root"></div>
  <style>${componentCss}</style>
  <script type="module">${componentJs}</script>
</body>
</html>
          `.trim(),
          _meta: {
            'openai/widgetPrefersBorder': config.prefersBorder ?? true,
            ...(config.csp && { 'openai/widgetCSP': config.csp }),
            ...(config.domain && { 'openai/widgetDomain': config.domain }),
          },
        }],
      };
    },
  };
}

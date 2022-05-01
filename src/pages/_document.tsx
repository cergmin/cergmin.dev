import { readFileSync } from 'fs';
import { join } from 'path';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const lightThemeStylePath = join(
    process.cwd(),
    '/public/resources/styles/light-theme.css',
  );
  const darkThemeStylePath = join(
    process.cwd(),
    '/public/resources/styles/dark-theme.css',
  );

  const styles = {
    lightTheme: readFileSync(lightThemeStylePath, 'utf8'),
    darkTheme: readFileSync(darkThemeStylePath, 'utf8'),
  };

  return (
    <Html>
      <Head>
        <style
          id="lightColorThemeStyleTag"
          media="(prefers-color-scheme: light)">
          {styles.lightTheme}
        </style>
        <style id="darkColorThemeStyleTag" media="(prefers-color-scheme: dark)">
          {styles.darkTheme}
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

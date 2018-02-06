export default function renderHTML (componentHTML, initialState) {
    let bundle = null;
    let styles = null;
    const staticUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8050' : '';
    if (process.env.NODE_ENV === 'production') {
        const manifestPath = `${process.cwd()}/public/static/build/manifest.json`;
        const manifest = require(manifestPath);
        bundle = `${staticUrl}/static/build/${manifest['main.js']}`;
        styles = `${staticUrl}/static/build/${manifest['main.css']}`;
    } else {
        bundle = `${staticUrl}/static/build/bundle.js`;
        styles = `${staticUrl}/static/build/styles.css`;
    }
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.gif"/>
          <link rel="stylesheet" href=${styles}>
          <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
          <script type="application/javascript" id="initialState">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <div id="dev-tools"></div>
        <script type="application/javascript" src=${bundle}></script>
      </body>
    </html>
  `;
}

module.exports = {
  base: {
    // root 디렉토리를 기준으로 제외할 폴더들입니다.
    exclude: [
      'html',
      'html-starter',
      'html-demo',
      'dist',
      'build',
      'assets',
      'tasks',
      'node_modules',
      '_temp',
      'node-script'
    ],

    // Browser Sync를 사용하여 서비스할 기본 경로입니다. 현재 프로젝트의 루트로 설정되어 있습니다.
    serverPath: './',

    // 프로덕션 빌드를 위해 빌드할 템플릿 또는 폴더입니다.
    buildTemplatePath: 'html',

    // 프로덕션 빌드를 위한 폴더입니다.
    buildPath: './build'
  },
  development: {
    // 상대 또는 절대 경로가 될 수 있는 빌드 경로입니다.
    // Current dist path is `./assets/vendor` which will be used by templates from `html\` directory. Set distPath: './dist' to generate assets in dist folder.
    distPath: './assets/vendor',

    // 압축여부.
    minify: false,

    // 소스맵을 생성할지 여부입니다.
    sourcemaps: true,

    // https://webpack.js.org/configuration/devtool/#development     // 개발 중에 사용할 소스맵 생성 옵션입니다.
    devtool: 'eval-source-map',

        // 이 옵션을 사용할 때는 주의하십시오. 전체 출력 디렉토리를 제거합니다. 'build' 명령에만 영향을 미칩니다.
    cleanDist: false
  },
  production: {
    // Build path can be both relative or absolute.
    // Current dist path is `./assets/vendor` which will be used by templates from `html\` directory. Set distPath: './dist' to generate assets in dist folder.
    distPath: './assets/vendor',

    // Minify assets.
    // Note: Webpack will minify js sources in production mode regardless to this option
    minify: true,

    // Generate sourcemaps.

    sourcemaps: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Use this option with caution because it will remove entire output directory.
    // Will affect only `build:prod` command
    cleanDist: true
  }
};

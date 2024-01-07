const path = require('path');

// 환경 설정 가져오기
// -------------------------------------------------------------------------------

const env = require('gulp-environment');
process.env.NODE_ENV = env.current.name;

let serverPath;
const conf = (() => {
  const _conf = require('./build-config');
  serverPath = _conf.base.serverPath;
  templatePath = _conf.base.buildTemplatePath;
  buildPath = _conf.base.buildPath;
  return require('deepmerge').all([{}, _conf.base || {}, _conf[process.env.NODE_ENV] || {}]);
})();

// 경로를 슬래시로 통일화하고 distPath를 절대 경로로 변경
conf.distPath = path.resolve(__dirname, conf.distPath).replace(/\\/g, '/');

// Modules
// -------------------------------------------------------------------------------
// Gulp 모듈 및 유틸리티 가져오기
const { parallel, series, watch } = require('gulp');
const del = require('del');
const colors = require('ansi-colors');
const browserSync = require('browser-sync').create();
colors.enabled = require('color-support').hasBasic;

// Utilities
// -------------------------------------------------------------------------------
// 유틸리티 함수

function srcGlob(...src) {
  return src.concat(conf.exclude.map(d => `!${d}/**/*`));
}

// Tasks
// -------------------------------------------------------------------------------
// 빌드 및 프로덕션 작업 가져오기

const buildTasks = require('./tasks/build')(conf, srcGlob);
const prodTasks = require('./tasks/prod')(conf);

// Clean build directory
// -------------------------------------------------------------------------------
// 빌드 디렉토리 정리

const cleanTask = function () {
  return del([conf.distPath, buildPath], {
    force: true
  });
};

// Watch
// -------------------------------------------------------------------------------
const watchTask = function () {
  watch(srcGlob('**/*.scss', '!fonts/**/*.scss'), buildTasks.css);
  watch(srcGlob('fonts/**/*.scss'), parallel(buildTasks.css, buildTasks.fonts));
  watch(srcGlob('**/*.@(js|es6)', '!*.js'), buildTasks.js);
  // watch(srcGlob('**/*.png', '**/*.gif', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.swf'), copyTasks.copyAssets)
};

// Serve
// -------------------------------------------------------------------------------
// 서버 실행

const serveTasks = function () {
  browserSync.init({
    // ? You can change server path variable from build-config.js file
    server: serverPath
  });
  watch([
    // ? You can change add/remove files/folders watch paths in below array
    'html/**/*.html',
    'html-starter/**/*.html',
    'assets/vendor/css/*.css',
    'assets/vendor/css/rtl/*.css',
    'assets/css/*.css',
    'assets/js/*.js'
  ]).on('change', browserSync.reload);
};

const serveTask = parallel([serveTasks, watchTask]);

// Build (Dev & Prod)
// -------------------------------------------------------------------------------
// 개발 및 프로덕션 빌드

const buildTask = conf.cleanDist
  ? series(cleanTask, env.current.name === 'production' ? [buildTasks.all, prodTasks.all] : buildTasks.all)
  : series(env.current.name === 'production' ? [buildTasks.all, prodTasks.all] : buildTasks.all);

// Exports
// -------------------------------------------------------------------------------
// 모듈 내보내기

module.exports = {
  default: buildTask,
  build: buildTask,
  'build:js': buildTasks.js,
  'build:css': buildTasks.css,
  'build:fonts': buildTasks.fonts,
  'build:copy': parallel([buildTasks.copy]),
  watch: watchTask,
  serve: serveTask
};

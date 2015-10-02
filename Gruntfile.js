module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    "watch": {
      files: ["**/*", "!build/**"],
      options: {
        interval: 5007
      },
      tasks: ["browserify"]
    },
    "browserify": {
      options: {
        transform: [["babelify", { "stage": 0 }]],
        "browserifyOptions": {
          debug: true
        },
      },
      dist: {
        files: {
          "build/app.js": ["src/main.js"]
        }
      }
    }
  });
  grunt.registerTask("default", ["browserify", "watch"]);
}


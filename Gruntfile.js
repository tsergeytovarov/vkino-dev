/*
  Author: Sergey Popov.
  Version: 1.0.
  Last version date: 15.05.2015.
  Author URI: http://ourworkspace.ru
  Author social: https://vk.com/sergeytovarov
  Author email: tovarov.piter@gmail.com
  From Saint-Petersburg with love
*/

module.exports = function(grunt) {

  // вызываем все таски стандартные
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // постпроцессор
    postcss: {
      options: {
        map: false,
        processors: [
          require('postcss-size').postcss, // функция для размеров
          require("postcss-import").postcss, // импорты файлов
          require('postcss-mixins').postcss, // миксины
          require('postcss-conditionals').postcss, // условия
          require('postcss-for').postcss, // циклы
          require('postcss-simple-vars').postcss, //переменные
          require('postcss-nested').postcss, // вложенности
          //require('postcss-merge-rules').postcss, // собирает и склеивает свойства в селекторы и селекторы с дубликатоми слоёв
          require('autoprefixer-core')({browsers: 'last 10 version'}).postcss //вызов автопрефиксера над css файлом
        ]
      },
      dist: {
        files: {
           'src/css/style.css': 'src/css/postcss/style.css'
        }
      }
    },

    // сжатие css
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },

    // красота
    csscomb: {
      dist: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    //сжатие js
    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },

    // оптимизация графики
    // imagemin: {
    //   build: {
    //     options: {
    //       optimizationLevel: 3
    //     },
    //     files: [{
    //       expand: true,
    //       src: ['build/img/*.{png,jpg,gif,svg}']
    //     }]
    //   }
    // },

    // очистка дирректории
    clean: {
      build: [
        'build/css',
        'build/img',
        'build/js',
        'build/*.html',
      ]
    },

    // копирование
    copy: {
      js: {
        expand: true,
        cwd: 'src/js/',
        src: ['**'],
        dest: 'build/js/',
      },
      css:{
        expand: true,
        cwd: 'src/css/',
        src: ['*.css'],
        dest: 'build/css/',
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: ['*.{png,jpg,gif,svg}'],
        dest: 'build/img/',
      },
      html: {
        expand: true,
        cwd: 'src/',
        src: ['*.html'],
        dest: 'build/',
      },
      fonts: {
        expand: true,
        cwd: 'src/font/',
        src: ['*.{eot,svg,woff,ttf}'],
        dest: 'build/font/',
      },
    },

    // отслеживаем изменений
    watch: {
      style: {
        files: ['src/css/**/*.css'],
        tasks: ['style'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false,
          livereload: true
        },
      }
    },

    // автоперезагрузка
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg}',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/",
          },
          startPath: "/index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });

  // базовый таск
   grunt.registerTask('default', [
     'postcss',
     'copy:css',
     'csscomb',
     'cssmin',
     'copy:js',
     'uglify',
     'copy:html',
     'copy:img',
     'copy:fonts',
    //  'imagemin',
     'browserSync',
     'watch'
   ]);

   // билдовый таск
   grunt.registerTask('build', [
     'clean:build',
     'postcss',
     'copy:css',
     'csscomb',
     'cssmin',
     'copy:js',
     'uglify',
     'copy:html',
     'copy:img',
     'copy:fonts',
    //  'imagemin',
   ]);

   // только js
   grunt.registerTask('js', [
     'uglify',
     'copy:js',
   ]);

   // только стили
   grunt.registerTask('style', [
     'postcss',
     'copy:css',
     'csscomb',
     'cssmin'
   ]);

   // только картики и стили
   grunt.registerTask('img', [
     'copy:img',
    //  'imagemin',
     'postcss'
   ]);

}

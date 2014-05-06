module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        distdir: 'public/dist',
        // This line makes your node configurations available for use
        pkg: grunt.file.readJSON('package.json'),
        banner:
            '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src: {
            jshint: {
                client: ['public/src/**/*.js']
            },
            vendor: 'public/vendor',
            src: 'public/src',
            upload: 'public/upload',
            clean:['<%= distdir %>/*','<%= src.src %>/assets/default/css','<%= src.src %>/assets/admin/css'],
            jsModules: {
                app: ['public/src/app/default/**/*.js'],
                admin: ['public/src/app/admin/**/*.js'],
                login:  ['public/src/app/login/**/*.js'],
                common: ['public/src/common/**/*.js']
            },
            tplModules: {
                app: ['public/src/app/default/**/*.tpl.html'],
                admin: ['public/src/app/admin/**/*.tpl.html'],
                login:  ['public/src/app/login/**/*.tpl.html'],
                common: ['public/src/common/**/*.tpl.html']
            },
            lessModules: {
                app: ['<%= src.src %>/less/default'],
                admin: ['<%= src.src %>/less/admin'],
                login:  ['<%= src.src %>/less/login']
            },
            cssModules: {
                app: ['<%= src.src %>/app/default/assets/css'],
                admin: ['<%= src.src %>/app/admin/assets/css'],
                login:  ['<%= src.src %>/app/login/assets/css']
            },
            fontModules: {
                app: ['<%= src.src %>/app/default/assets/fonts'],
                admin: ['<%= src.src %>/app/admin/assets/fonts'],
                login:  ['<%= src.src %>/app/login/assets/fonts']
            }
        },
        watch: {
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/src/app/**/*.js', 'test/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/src/*.html','public/src/**/*.html', 'app/views/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/src/assets/**/css/*.css'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: ['public/src/less/**/*.less'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        env: {
            production: {
                NODE_ENV: 'production'
            }
        },
        html2js: {
            options: { useStrict: true },
            app: {
                options: {
                    base: 'public'
                },
                src: ['<%= src.tplModules.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.app'
            },
            login: {
                options: {
                    base: 'public'
                },
                src: ['<%= src.tplModules.login %>'],
                dest: '<%= distdir %>/templates/login.js',
                module: 'templates.login'
            },
            admin: {
                options: {
                    base: 'public'
                },
                src: ['<%= src.tplModules.admin %>'],
                dest: '<%= distdir %>/templates/admin.js',
                module: 'templates.admin'
            },
            common: {
                options: {
                    base: 'public'
                },
                src: ['<%= src.tplModules.common %>'],
                dest: '<%= distdir %>/templates/common.js',
                module: 'templates.common'
            }
        },
        clean: ['<%= distdir %>/*','<%= src.src %>/assets/default/css','<%= src.src %>/assets/default/fonts','<%= src.src %>/assets/admin/css','<%= src.src %>/assets/admin/fonts'],
        concat:{
            targetDefault: {
                src: ['<%= src.src %>/default.html'],
                dest: '<%= distdir %>/default.html',
                options: {
                    process: true
                }
            },
            targetLogin: {
                src: ['<%= src.src %>/login.html'],
                dest: '<%= distdir %>/login.html',
                options: {
                    process: true
                }
            },
            targetAdmin: {
                src: ['<%= src.src %>/admin.html'],
                dest: '<%= distdir %>/admin.html',
                options: {
                    process: true
                }
            },
            app:{
                options: {
                    banner: '<%= banner %>'
                },
                src:['<%= src.jsModules.app %>','<%= src.jsModules.common %>','<%= distdir %>/templates/app.js','<%= distdir %>/templates/common.js'],
                dest:'<%= distdir %>/default/<%= pkg.name %>.js'
            },
            admin:{
                options: {
                    banner: '<%= banner %>'
                },
                src:['<%= src.jsModules.admin %>','<%= src.jsModules.common %>','<%= distdir %>/templates/admin.js','<%= distdir %>/templates/common.js'],
                dest:'<%= distdir %>/admin/<%= pkg.name %>.js'
            },
            login:{
                options: {
                    banner: '<%= banner %>'
                },
                src:['<%= src.jsModules.login %>','<%= src.jsModules.common %>','<%= distdir %>/templates/login.js','<%= distdir %>/templates/common.js'],
                dest:'<%= distdir %>/login/<%= pkg.name %>.js'
            },
            jquery: {
                src:['<%= src.vendor %>/jquery/jquery.min.js'],
                dest: '<%= distdir %>/jquery.js'
            },
            lodash: {
                src:['<%= src.vendor %>/lodash/dist/lodash.min.js'],
                dest: '<%= distdir %>/lodash.js'
            },
            angular: {
                src:[
                    '<%= src.vendor %>/angular/angular.min.js',
                    '<%= src.vendor %>/angular-ui-router/release/angular-ui-router.min.js',
                    '<%= src.vendor %>/restangular/dist/restangular.min.js',
                    '<%= src.vendor %>/angular-local-storage/angular-local-storage.min.js',
                    '<%= src.vendor %>/angular-sanitize/angular-sanitize.min.js'
                ],
                dest: '<%= distdir %>/angular.js'
            },
            bootstrap: {
                src:['<%= src.vendor %>/angular-bootstrap/ui-bootstrap-tpls.min.js'],
                dest: '<%= distdir %>/ui-bootstrap.js'
            },
            fileupload: {
                src:['<%= src.vendor %>/ng-file-upload/angular-file-upload.min.js'],
                dest: '<%= distdir %>/angular-file-upload.js'
            },
            cookies: {
                src:['<%= src.vendor %>/angular-cookies/angular-cookies.min.js'],
                dest: '<%= distdir %>/angular-cookies.js'
            }
        },
        ngmin: {
            dist: {
                src: ['<%= distdir %>/<%= pkg.name %>.js'],
                dest: '<%= distdir %>/<%= pkg.name %>-ngmin.js'
            }
        },
        copy: {
            upload: {
                cwd: '<%= src.upload %>',
                src: '**',
                dest: '<%= distdir %>/upload',
                expand: true
            },
            assetsApp: {
                cwd: '<%= src.src %>/assets/default/',
                src: '**',
                dest: '<%= distdir %>/default/assets',
                expand: true
            },
            assetsLogin: {
                cwd: '<%= src.src %>/assets/login/',
                src: '**',
                dest: '<%= distdir %>/login/assets',
                expand: true
            },
            assetsAdmin: {
                cwd: '<%= src.src %>/assets/admin/',
                src: '**',
                dest: '<%= distdir %>/admin/assets',
                expand: true
            },
            fontsApp: {
                cwd: '<%= src.vendor %>/bootstrap/fonts/',
                src: '*',
                dest: '<%= src.fontModules.app %>/',
                expand: true
            },
            fontsAppSocial: {
                cwd: '<%= src.vendor %>/bootstrap-social/fonts/',
                src: '*',
                dest: '<%= src.fontModules.app %>/',
                expand: true
            },
            fontsAdmin: {
                cwd: '<%= src.vendor %>/bootstrap/fonts/',
                src: '*',
                dest: '<%= src.fontModules.admin %>/',
                expand: true
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', '<%= src.jshint.client %>'],
                options:{
                    jshintrc: true
                }
            }
        },
        less: {
           bootstrapApp: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: '<%= src.cssModules.app %>/bootstrap.css.map'
                },
                files: {
                    '<%= src.cssModules.app %>/bootstrap.css': '<%= src.lessModules.app %>/bootstrap.less'
                }
            },
            compileThemeApp: {
                options: {
                  banner: '<%= banner %>',
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'theme.css.map',
                  sourceMapFilename: '<%= src.cssModules.app %>/theme.css.map'
                },
                files: {
                  '<%= src.cssModules.app %>/theme.css': '<%= src.lessModules.app %>/theme.less'
                }
            },
            bootstrapAdmin: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: '<%= src.cssModules.admin %>/bootstrap.css.map'
                },
                files: {
                    '<%= src.cssModules.admin %>/bootstrap.css': '<%= src.lessModules.admin %>/bootstrap.less'
                }
            },
            compileThemeAdmin: {
                options: {
                  banner: '<%= banner %>',
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'theme.css.map',
                  sourceMapFilename: '<%= src.cssModules.admin %>/theme.css.map'
                },
                files: {
                  '<%= src.cssModules.admin %>/theme.css': '<%= src.lessModules.admin %>/theme.less'
                }
            },
            bootstrapLogin: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: '<%= src.cssModules.login %>/bootstrap.css.map'
                },
                files: {
                    '<%= src.cssModules.login %>/bootstrap.css': '<%= src.lessModules.login %>/bootstrap.less'
                }
            },
            compileThemeLogin: {
                options: {
                  banner: '<%= banner %>',
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'theme.css.map',
                  sourceMapFilename: '<%= src.cssModules.login %>/theme.css.map'
                },
                files: {
                  '<%= src.cssModules.login %>/theme.css': '<%= src.lessModules.login %>/theme.less'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);
    
    //grunt.registerTask('default', ['jshint','build']);
    
    

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);
    grunt.registerTask('build', ['clean','html2js','concat','copy'/*,'ngmin'*/]);
    grunt.registerTask('my', ['clean','less','copy:fontsApp','copy:fontsAdmin']);

    //Test task.
    grunt.registerTask('production', ['build','concurrent','env:production']);
};

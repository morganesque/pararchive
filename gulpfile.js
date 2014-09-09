/*
    the basic stuff.
*/        
var gulp    = require('gulp'),
    fs      = require('fs');
/*
    load all the other things.
*/        
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins({
        pattern:'*',
        camelize:true,
    });

/*
    keep references to filenames up here.
*/        
var files = {
    "jsconf":   'src/allJS.conf',
    "jslib":    "all.min.js",
    "jsieconf": 'src/lteie8.conf',
    "jsielib":  "lteie8.min.js",
}

/*
    keep all the globs together here.
*/        
var glob = {
    "sass":     'src/**/*.scss',
    "js":       ['src/js/**/*.js','src/components/*.js'],
    "img":      'src/img/**/*.{jpg,jpeg,gif,png}',
    "svg":      'src/img/**/*.svg',
    "jekyll":   ['build/**/*.{html,yml,md,mkd,markdown}','build/_config.yml'],
    "html":     'build/**/*.{html,yml,md,mkd,markdown,php}',
};

/*
    keeping all the destinations together here.
*/        
var dest = {
    "css":      "build/css",
    "js":       "build/js",
    "img":      "build/img",
}

/*
    ----- SASS -----
*/        
gulp.task('sass',function()
{
    /*
        combine everything together so I can catch errors.
    */        
    var combined = plugins.streamCombiner(
        gulp.src(glob.sass),
        plugins.rubySass({style:'nested', loadPath:'bower_components', quiet:true,}),
        plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'),
        gulp.dest(dest.css),
        plugins.browserSync.reload({stream:true})        
    );
    /*
        growl out any errors
    */        
    combined.on('error', function(err) 
    {
        plugins.nodeNotifier.Growl().notify({
            name:       "SASS processor",
            title:      "SASS",
            message:    err.message,
        });
        this.emit('end');
    }); 
    return combined;       
});

/*
    HERE ARE ALL THE TASKS NOW!!!
*/        

/*
    ----- AUTO PREFIX -----
*/
gulp.task('autoprefix',function()
{
    return gulp.src(glob.css)
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))        
        .pipe(gulp.dest(dest.css))
        .pipe(plugins.browserSync.reload({stream:true}));
});

/*
    ----- JEKYLL -----
*/
gulp.task('jekyll',function()
{
    /* plugins.jekyll */
    return gulp.src(glob.jekyll)
        .pipe(plugins.jekyll({
            source: './build',
            destination: '.jekyll',
            // bundleExec:true,
        }))
        .pipe(gulp.dest('.jekyll'));
});

/*
    ----- JS LIBRARIES -----
    (minified into a single file)
*/
gulp.task('libScripts',function()
{
    createJSLib(files.jsconf,files.jslib);
    createJSLib(files.jsieconf,files.jsielib);
});

function createJSLib(conf,lib)
{
    var src = refreshJSLibs(conf);
    if (src.length)
    {
        plugins.util.log(src);   
        return gulp.src(src,{base:'bower_components/'})
            .pipe(plugins.uglify())  
            .pipe(plugins.header("/*! bower_components/${file.relative} */\n",{foo:'bar'}))
            .pipe(plugins.concat(lib))
            .pipe(gulp.dest(dest.js))
            .pipe(plugins.browserSync.reload({stream:true}));
    } else {
        plugins.util.log('file empty ignoring');
    }
}

/*
    Check lib size
*/        
gulp.task('checkScripts',function()
{
    var src = refreshJSLibs();
    if (src.length)
    {
        return gulp.src(src,{base:'bower_components/'})
            .pipe(plugins.uglify())  
            .pipe(plugins.header("/*! bower_components/${file.relative} */\n",{foo:'bar'}))
            .pipe(plugins.gzip())
            .pipe(plugins.flatten())
            .pipe(plugins.filesize())
            .pipe(gulp.dest('.tmp'));
    } else {
        plugins.util.log('file empty ignoring');
    }
});

/*
    ----- JS FILES -----
    (for separates minified and copied across) 
*/
gulp.task('scripts',function()
{
    return gulp.src(glob.js)
        // .pipe(plugins.uglify())  // put this back later - for dev I don't need it uglified.
        .pipe(plugins.changed(dest.js))
        .pipe(gulp.dest(dest.js))
        .pipe(plugins.browserSync.reload({stream:true}));
});

/*
    ----- SVG MINIFY -----
*/
gulp.task('svg',function()
{
    return gulp.src(glob.svg)
        .pipe(plugins.changed(dest.img))
        .pipe(plugins.svgmin([
                {removeHiddenElems:false},
                {mergePaths:false},
                {convertPathData:false},
            ]))
        .pipe(gulp.dest(dest.img))
        .pipe(plugins.browserSync.reload({stream:true}));
});

/*
    ----- BITMAPS MINIFY -----
*/
gulp.task('bitmaps',function()
{
    return gulp.src(glob.img)
        .pipe(plugins.changed(dest.img))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(dest.img))
        .pipe(plugins.browserSync.reload({stream:true}));
});

/*
    ----- SYNC -----
    (includes a server for flat builds)
*/
gulp.task('browser-sync', function() {
    plugins.browserSync.init(null, {
        open:false,
        // server: {baseDir: "./build/"},
        proxy: "pararchive.app"
    });
});

/*
    ----- BASIC LIVERELOAD -----
    (so I can trigger it independantly for certain files)
*/
gulp.task('sync',function()
{
    return gulp.src(glob.html)
        .pipe(plugins.cached('htmlsync'))
        .pipe(plugins.browserSync.reload({stream:true}));
});

/*
    ----- WATCH -----
*/
gulp.task('watch', function() 
{ 
        // Watch .scss files
        gulp.watch(glob.sass, ['sass']);     

        // Watch .js files
        gulp.watch(glob.js, ['scripts']);

        // Watch JS library conf
        gulp.watch(files.jsconf, ['libScripts']); // and "checkScripts" ???
        gulp.watch(files.jsieconf, ['libScripts']); 

        // Watch bitmaps
        gulp.watch(glob.img, ['bitmaps']);

        // Watch SVG
        gulp.watch(glob.svg, ['svg']);

        // watch HTML (etc)
        gulp.watch(glob.html,['sync']) 

        // Watch plugins.jekyll files
        // gulp.watch(glob.jekyll, ['jekyll'])
});

/*
    ----- DEFAULT -----
*/
gulp.task('default', ['browser-sync','watch']);

function refreshJSLibs(confFile)
{
    var file = fs.readFileSync(confFile,'utf8').trim().split('\n');    
    var src = file.filter(function(v)
    {
        if (!v) return false;
        if (v.substr(0,1) == '#') return false;   

        if (!fs.existsSync(v)) 
        {
            plugins.util.log(plugins.util.colors.red(v+' does not exist!'));
            return false;
        }
              
        return true;
    })    
    return src;
}

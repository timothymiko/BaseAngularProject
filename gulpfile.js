var gulp  = require('gulp-param')(require('gulp'), process.argv),
    gutil = require('gulp-util'),
    inject = require('gulp-inject-string');

function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function () {
        this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
        this.push(null)
    }
    return src;
}

gulp.task('view', function(name, url) {

    string_src(name + '.js', 'app.controller(\''+name+'\', function($scope, $state) {\n\n\t\'user strict\';\n\n});')
        .pipe(gulp.dest('./controllers/'));

    string_src(name + '.html', '')
        .pipe(gulp.dest('./partials/'));

    gulp.src('index.html')
        .pipe(inject.after('<!-- VIEW FILES -->', '\n\t<script src="./controllers/' + name + '.js"></script>'))
        .pipe(gulp.dest('./'));

    gulp.src('app.js')
        .pipe(inject.before('// end of view states', '\n\t\t\t.state("'+name+'", { \n\t\t\t\turl: "'+url+'",\n\t\t\t\ttemplateUrl: "./partials/'+name+'.html",\n\t\t\t\tcontroller: "'+name+'"\n\t\t\t})\n\n'))
        .pipe(gulp.dest('./'));

    gulp.src('app.css')
        .pipe(inject.append('\n/**\n* ' + name + '\n*/'))
        .pipe(gulp.dest('./'));

    return 1;
});
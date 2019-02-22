/**
 * Created  on 2017/2/17.
 */
var fs = require('fs');
var archiver = require('archiver');

function zip(path, name, replaceStr) {
    var output = fs.createWriteStream(name);
    var archive = archiver('zip');
    archive.on('error', function (err) {
        throw err;
    });
    archive.pipe(output);
    getAllFiles(path, function (e) {
        // console.info(e);
        archive
            .append(fs.createReadStream(e), {name: e.replace(replaceStr, "")});
    });
    archive.finalize();
}

/**
 * 控制流/同步
 * @param {Array} arr
 * @param {Function} callback1 传递两个参数 (item,next)，执行完一项则需执行next()才能执行下一项
 * @param {Function} callback2 出错或执行完时回调
 * @returns {*}
 */
function async(arr, callback1, callback2) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        return callback2(new Error('第一个参数必须为数组'));
    }
    if (arr.length === 0)
        return callback2(null);
    (function walk(i) {
        if (i >= arr.length) {
            return callback2(null);
        }
        callback1(arr[i], function () {
            walk(++i);
        });
    })(0);
}
/**
 * 获取文件夹下面的所有的文件(包括子文件夹)
 * @param {String} dir
 * @param {Function} callback
 * @returns {Array}
 */
function getAllFiles(dir, callback) {
    var filesArr = [];
    dir = ///$/.test(dir) ? dir : dir + '/';
        (function dir(dirpath, fn) {
            var files = fs.readdirSync(dirpath);
            async(files, function (item, next) {
                var info = fs.statSync(dirpath + item);
                if (info.isDirectory()) {
                    dir(dirpath + item + '/', function () {
                        next();
                    });
                } else {
                    filesArr.push(dirpath + item);
                    callback && callback(dirpath + item);
                    next();
                }
            }, function (err) {
                !err && fn && fn();
            });
        })(dir);
    return filesArr;
}
function makeBundle() {
    zip("./android/bundle" + "/", "./android/bundle-acm-android.zip", "./android/");
    zip("./ios/bundle" + "/", "./ios/bundle-acm-ios.zip", "./ios/");
}
makeBundle();
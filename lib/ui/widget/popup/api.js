/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'qike.js',
            'ui/qikeui.js',
            'ui/core/uibase.js',
            'ui/core/utils.js',
            'ui/plugin/popup.js'
        ],
        baseURL = '../../../';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();

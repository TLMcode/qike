/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'qikeui.js',
            'core/uibase.js',
            'plugin/mask.js',
            'widget/guide/guide.js'
        ],
        baseURL = '../../';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();

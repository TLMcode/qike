/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'qike.js',
            'ui/qikeui.js',
            'ui/core/uibase.js',
            'ui/plugin/mask.js',
            'ui/widget/flybox/flybox.js'
        ],
        baseURL = '../../';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();

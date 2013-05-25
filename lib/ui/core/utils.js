var utils = qike.utils = {
    /**
     * 动态加载文件到doc中，并依据obj来设置属性，加载成功后执行回调函数fn
     * @name loadFile
     * @grammar qike.utils.loadFile(doc,obj)
     * @grammar qike.utils.loadFile(doc,obj,fn)
     * @example
     * //指定加载到当前document中一个script文件，加载成功后执行function
     * utils.loadFile( document, {
     *     src:"test.js",
     *     tag:"script",
     *     type:"text/javascript",
     *     defer:"defer"
     * }, function () {
     *     console.log('加载成功！')
     * });
     */
    loadFile:function () {
        var tmpList = [];
        function getItem(doc,obj){
            for(var i= 0,ci;ci=tmpList[i++];){
                try{
                    if(ci.doc === doc && ci.url == (obj.src || obj.href)){
                        return ci;
                    }
                }catch(e){
                    //在ie9下，如果doc不是一个页面的，会导致拒绝访问的错误
                    continue
                }
            }
        }
        return function (doc, obj, fn) {
            var item = getItem(doc,obj);
            if (item) {
                if(item.ready){
                    fn && fn();
                }else{
                    item.funs.push(fn)
                }
                return;
            }
            tmpList.push({
                doc:doc,
                url:obj.src||obj.href,
                funs:[fn]
            });
            if (!doc.body) {
                var html = [];
                for(var p in obj){
                    if(p == 'tag')continue;
                    html.push(p + '="' + obj[p] + '"')
                }
                doc.write('<' + obj.tag + ' ' + html.join(' ') + ' ></'+obj.tag+'>');
                return;
            }
            if (obj.id && doc.getElementById(obj.id)) {
                return;
            }
            var element = doc.createElement(obj.tag);
            delete obj.tag;
            for (var p in obj) {
                element.setAttribute(p, obj[p]);
            }
            element.onload = element.onreadystatechange = function () {
                if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                    item = getItem(doc,obj)
                    if (item.funs.length > 0) {
                        item.ready = 1;
                        for (var fi; fi = item.funs.pop();) {
                            fi();
                        }
                    }
                    element.onload = element.onreadystatechange = null;
                }
            };
            doc.getElementsByTagName("head")[0].appendChild(element);
        }
    }()
};
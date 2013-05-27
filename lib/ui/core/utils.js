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
    }(),
    cookie : function() {
        var en = encodeURIComponent,
            de = decodeURIComponent,
            isEnabled = navigator.cookieEnabled;

        return {
            set: function(name, value, expires, ve, ne, domain, secure) {
                var day = new Date();
                day.setDate(day.getDate() + (parseInt(expires) || -1));
                document.cookie = [
                    ne ? en(name) : name,
                    '=',
                    ve ? en(value) : value,
                    '; expires=' + day.toUTCString(),
                    '; domain=' + (domain || '7k7k.com'),
                    '; path=/',
                    secure ? '; secure' : ''
                ].join('');
            },
            get: function(name, ne) {// 获取的值不存在时返回""
                return isEnabled ? de((document.cookie.match((new RegExp("(?:^|; )" + (ne ? en(name) : name) + "=([^;]+)"))) || [])[1] || "") : "";
            }
        };
    }(),
    getCompareTime:function(end,start){
        var start = start || new Date().getTime(),
            end,date;
        if(!end)return;
        if(typeof end == "object"){
            end = end.getTime();
        }else{
            //处理字符串或者整型
            end += "";
            end = end.length<13?parseInt(end)*1000:parseInt(end);
        }
        date = end - parseInt(start);
        var d=Math.floor(date/(24*3600*1000))//计算出小时数
        var leave1=date%(24*3600*1000)    //计算天数后剩余的毫秒数
        var h=Math.floor(leave1/(3600*1000))//计算相差分钟数
        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
        var m=Math.floor(leave2/(60*1000))//计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var s=Math.round(leave3/1000)
        return {
            d:d,
            h:h,
            m:m,
            s:s
        }
    }
};
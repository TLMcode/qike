(function(){
    var magic = "QKGLOABL",
        uicount = 0,
        root = window[magic] = {};
    var UIBase = qike.ui.Base = function(){};
    UIBase.prototype = {
        initOptions:function (options) {
            var me = this;
            $.extend(me,options);
            this.id = this.id || 'qikeui' + this.uid();
            if(this.autoRender){
                $(this).trigger("postRender");
            }
        },
        initUIBase:function () {
            this._globalKey = this.setGlobal(this.id, this);
        },
        uid: function (){
            return uicount++;
        },
        getDom:function (name) {
            if (!name) {
                return $("#"+this.id);
            } else {
                return $("#"+this.id + '-' + name);
            }
        },
        setGlobal:function(id,obj){
            root[id] = obj;
            return magic + '["' + id  + '"]';
        },
        formatHtml:function (tpl) {
            var prefix = 'qikeui-' + this.uiName;
            return (tpl
                .replace(/##/g, this.id)
                .replace(/%%-/g, this.uiName ? prefix + '-' : '')
                .replace(/%%/g, (this.uiName ? prefix : '') + ' ' + (this.className||""))
                .replace(/\$\$/g, this._globalKey));
        },
        renderHtml:function () {
            return this.formatHtml(this.getHtmlTpl());
        },
        dispose:function () {
            var box = this.getDom();
            $(box).remove();
        },
        render:function(){
            var container = this.container||document.body;
            $(container).append(this.renderHtml());
        }
    };
})();
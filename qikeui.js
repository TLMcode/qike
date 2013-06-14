(function(){var qike = window.qike || {};

window.qike = qike;

qike.version="1.0";


var qike = qike || {};
qike.ui = qike.ui || {};

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
(function(){
    var uibase = qike.ui.Base;
    var Mask =  qike.ui.Mask = function(opt){
        this.initMask(opt);
    };
    Mask.prototype = {
        nodeAttr:{
            "position":"absolute",
            "left":0,
            "top":0,
            "background":"#ccc",
            "opacity":0.6,
            "filter":"alpha(opacity=60)",
            "display":"none",
            "width":"100%",
            "height":"100%"
        },
        initMask:function(opt){
            this.initOptions(opt);
        },
        getHtmlTpl: function (){
            return '<div id="##" class="qike-mask"></div>';
        },
        show: function (zIndex){
            this._fill();
            this.getDom().css({
                display:"",
                zIndex:zIndex
            });
        },
        postRender: function (){
            var me = this;
            me.render();
            $(window).on('resize scroll',function(){
                setTimeout(function (){
                    if (!me.isHidden()) {
                        me._fill();
                    }
                });
            });
            me.getDom().css(me.nodeAttr);
        },
        isHidden: function (){
            return this.getDom().css("display") == 'none';
        },
        hide: function (){
            this.getDom().css({
                "display":"none",
                "zIndex":""
            });
        },
        _fill: function (){
            var el = this.getDom();
            el.css({
                width:$(window).width(),
                height:$(window).height()+$(window).scrollTop()
            })
        }
    }
    $.extend(Mask.prototype,uibase.prototype);
})();
(function(){
    var uibase = qike.ui.Base;
    var mask = qike.ui.Mask;
    var Guide =  qike.ui.Guide = function(opt){
        this.initGuide(opt);
    };
    Guide.prototype = {
        id:"guide",
        targetNode:null,
        uiName:"guide",
        hasMask:false,
        pos:{
            x:0,
            y:0
        },
        initGuide:function(opt){
            this.initOptions(opt);
        },
        postRender:function(){
            var me = this;
            if(me.hasMask){
                me.mask = new mask({
                    autoRender:true
                });
            }
            this.render();
            this.getDom("close").bind("click",function(){
                me.hide();
            });
            this.getDom("go").bind("click",function(){
                $(me).trigger("beforego");
            });
            this.setPos();
        },
        setPos:function(){
            var dom = this.getDom(),
                    offset = {
                        left:0,
                        top:0
                    };
            if(this.targetNode){
                $.extend(offset,$(this.targetNode).offset());
            }
            $(dom).css({
                left:offset.left+(this.pos.x||0),
                top:offset.top+(this.pos.y||0)
            })
        },
        getHtmlTpl:function(){
            return "<div class='%%' id='##'><span id='##-close' class='%%-close'></span><span id='##-go' class='%%-go'></span></div>";
        },
        hide:function(){
            this.getDom().css("display","none");
            this.mask&&this.mask.hide();
        },
        show:function(){
            this.getDom().css("display","block");
            this.mask&&this.mask.show(10);
        }
    };
    $.extend(Guide.prototype,uibase.prototype);
})();
(function(){
    var uibase = qike.ui.Base;
    var mask = qike.ui.Mask;
    var guide = qike.ui.Guide;
    var MGuide =  qike.ui.MGuide = function(opt){
        this.initMGuide(opt);
    };
    MGuide.prototype = {
        steplist:[],
        curstep:0,
        initMGuide:function(opt){
            this.initOptions(opt);
            this.initStep();
        },
        initStep:function(){
            var me = this;
            me.steplist = [];
            for(var key in me.step){
                var guid = new qike.ui.Guide($.extend({
                    beforego:function(){
                        me.next();
                    },
                    className:"mguide",
                    hasMask:true,
                    autoRender:true
                },me.step[key]));
                me.steplist.push(guid);
            }
        },
        start:function(){
            this.steplist[0].show();
        },
        show:function(){
            this.steplist[this.curstep].show();
        },
        next:function(){
            this.steplist[this.curstep].hide();
            if(this.curstep>=this.steplist.length-1){
                this.curstep=0;
                this.hideAll();
            }else{
                this.curstep+=1;
                this.show();
            }

        },
        hideAll:function(){
            for(var i= 0,step;step=this.steplist[i++];){
                step.hide();
            }
        }
    }
    $.extend(MGuide.prototype,uibase.prototype);
})();})();
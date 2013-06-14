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
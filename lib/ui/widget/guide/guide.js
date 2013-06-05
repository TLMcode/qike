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
        nodeAttr:{
            "width":"292px",
            "height":"261px",
            "position": "absolute",
            "display":"none",
            "z-index": 9999,
            "background":"url('imgs/guide.png') no-repeat"
        },
        closeAttr:{
            "width":"27px",
            "height":"27px",
            "position":"absolute",
            "left":"226px",
            "top":"114px",
            "cursor":"pointer"
        },
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
            this.getDom().css(this.nodeAttr);
            this.getDom("close").css(this.closeAttr).bind("click",function(){
                me.hide();
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
                $.extend(offset,$(this.targetNode).offset);
            }
            $(dom).offset({
                left:offset.left+this.pos.x,
                top:offset.top+this.pos.y
            })
        },
        getHtmlTpl:function(){
            return "<div class='guide' id='##'><span id='##-close' class='%%-close'></span></div>";
        },
        hide:function(){
            this.getDom().css("display","none");
            this.mask&&this.mask.hide();
        },
        show:function(){
            this.getDom().css("display","");
            this.mask&&this.mask.show();
        }
    };
    $.extend(Guide.prototype,uibase.prototype);
})();

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
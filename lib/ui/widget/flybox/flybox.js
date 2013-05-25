(function(){
    var uibase = qike.ui.Base;
    var FlyBox = qike.ui.FlyBox = function(opt){
        this.initFlyBox(opt);
    };
    FlyBox.prototype = {
        nodeAttr:{
            "width":"200px",
            "height":"200px",
            "position": "absolute",
            "z-index": 9999,
            "background":"url('imgs/flyboat.png') no-repeat"
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
        initFlyBox:function(opt){
            this.initOptions(opt);
        },
        postRender:function(){
            var me = this;
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
            return "<div class='guide' id='##'><span id='##-close'></span></div>";
        },
        show:function(){
            this.getDom().css("display","block");
        },
        hide:function(){
            this.getDom().css("display","none");
        }
    };
    $.extend(FlyBox.prototype,uibase.prototype);
})();
//demo
    var flyBox= new qike.ui.FlyBox({
        autoRender:true

    });

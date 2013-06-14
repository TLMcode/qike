(function(){
    var uibase = qike.ui.Base;
    var utils = qike.utils;
    var Popup =  qike.ui.Popup = function(opt){
        this.initPopup(opt);
    };
    Popup.prototype = {
        nodeAttr:{
            "width":200,
            "height":200,
            "position":"absolute",
            "display":"none"
        },
        target:{
            id:"",
            showNodeEvt:"mouseover",
            hideNodeEvt:"mouseout"
        },
        pos:{
            x:0,
            y:0
        },
        postype:"lt",
        uiName:"popup",
        className:"popup",
        initPopup:function(opt){
            this.initOptions(opt);
        },
        postRender:function(){
            this.render();
            this.getDom().css(this.nodeAttr);
            this.bindEvent();
        },
        bindEvent:function(){
            var me = this;
            $("#"+this.target.id).on(this.target.showNodeEvt,function(){
                me.showAt();
            });
            $("#"+this.target.id).on(this.target.hideNodeEvt,function(){
                me.hide();
            });
        },
        getHtmlTpl:function(){
            return '<div class="%%" id="##">' +
                '<div id="##-content" class="%%-content"></div>' +
                '<iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe>' +
                '</div>';
        },
        show:function(index){
            this.getDom().css({
                "display":"",
                "zIndex":index||10
            })
        },
        isHidden:function(){
            return this.getDom().css("display") == 'none';
        },
        hide:function(){
            this.getDom().css({
                "display":"none",
                "zIndex":0
            })
        },
        setContent:function(html){
            this.getDom("content").html(html);
        },
        showAt:function(node,pos){
            var targetOffset = utils.getViewOffset(node||$("#"+this.target.id)),
                nodeOffset = utils.getViewOffset(this.getDom()),
                offset={};
            pos = pos || this.postype;
            switch(pos){
                case "lt":
                    offset = {
                        left:targetOffset.left-nodeOffset.width,
                        top:targetOffset.top-nodeOffset.height
                    }
                    break;
                case "lb":
                    offset = {
                        left:targetOffset.left-nodeOffset.width,
                        top:targetOffset.top+targetOffset.height
                    }
                    break;
                case "rt":
                    offset = {
                        left:targetOffset.left+targetOffset.width,
                        top:targetOffset.top-nodeOffset.height
                    }
                    break;
                case "rb":
                    offset = {
                        left:targetOffset.left+targetOffset.width,
                        top:targetOffset.top+targetOffset.height
                    }
                    break;
                case "lc":
                    //左边居中
                    offset = {

                    };
                    break;
                case "rc":
                    //右边居中
                    offset={

                    };
                    break;
            }
            this.getDom().css({
                left:offset.left+(this.pos.x||0),
                top:offset.top+(this.pos.y||0)
            });
            this.show();
        }
    }
    $.extend(Popup.prototype,uibase.prototype);
})();
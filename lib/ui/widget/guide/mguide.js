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
})();
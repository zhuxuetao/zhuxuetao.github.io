/**
 * Created by zhuxuetao on 16/6/21.
 */
function getStyle(obj,Name){
    return (obj.currentStyle||getComputedStyle(obj,false))[Name];
}
function move(obj,json,options){
	options=options||{};
	options.daration=options.daration||700;
	options.easing=options.easing||'ease-out';
    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj,name));
        dis[name]=json[name]-start[name];
		if(name=='opacity'){
			if(isNaN(getStyle(obj,name))){
				obj.style.opacity=1;
			}
		}
    }
    var count=Math.round(options.daration/16);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            switch(options.easing){
                case 'linear':
                    var cur=start[name]+dis[name]*n/count;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*Math.pow(a,3);
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-Math.pow(a,3));
                    break;
                default:
                    var a=n/count;
                    var cur=start[name]+dis[name]*Math.pow(a,3);
            }
            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity('+cur*100+'))'
            }else{
                obj.style[name]=cur+'px';
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            options.complete&&options.complete();
        }
    },16);
}
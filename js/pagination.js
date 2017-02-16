/**
 * Created by Administrator on 2016/11/2.
 */
define(function (require,exports,module) {
   function Pagination(current, total, show) {
       this.contain='';
       this.page=0;
       this.pagesType='';
       this.CPage=function(c,t,s) {
           // console.log(11);
           if(typeof this.contain==='string') {
               // console.log(11);
               var current=c;
               //页码显示几页
               var show=s;
               var total=t;
               var region=Math.floor(show/2);
               //计算当前页起始值应该是几
               var begin=current-region;
               begin=begin<1?1:begin;
               var end=begin+show;
               if(end>total){
                   end=total+1;
                   begin=total-show+1;
                   begin=begin<1?1:begin;
               }
               //获取分页展示的容器
               var container=document.getElementsByClassName(this.contain)[0];
               container.innerHTML='';
               if(current!=1){
                   var prevA=document.createElement('a');
                   prevA.innerHTML='上一页';
                   prevA.classList.add('pageprv');
                   prevA.setAttribute('href','#/'+this.pagesType+'/'+(current-1));
                   container.appendChild(prevA);
               }
               // console.log(begin);
               // console.log(total);
               for(var i=begin;i<end;i++){
                   var a=document.createElement('a');
                   a.setAttribute('href','#/'+this.pagesType+'/'+i);
                   a.innerHTML=i;
                   if(i==current){
                       a.classList.add('z-crt');
                   }
                   container.appendChild(a);
               }
               if(current!=total){
                   var oneI=document.createElement("i");
                   oneI.innerHTML='...';
                   container.appendChild(oneI);
                   var nextA=document.createElement("a");
                   nextA.innerHTML='下一页';
                   nextA.classList.add('pagenxt');
                   nextA.setAttribute('href','#/'+this.pagesType+'/'+(parseInt(current)+1));
                   container.appendChild(nextA);
               }
           }
       }
   }
   Pagination.prototype.render=function (contain,cPage,tPage,sPage,tyPage,callback) {
       // function prev() {
       //     if(page>1){
       //         page--;
       //         window.location.hash='#/'+page;
       //     }
       // }
       // function next() {
       //     if(page<41){
       //         page++;
       //         window.location.hash='#/'+page;
       //     }
       // }
       this.contain=contain;
       this.page=cPage;
       this.pagesType=tyPage;
       this.CPage(this.page,tPage,sPage);
       };
   module.exports=Pagination;
});
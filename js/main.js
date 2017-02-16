/**
 * Created by Administrator on 2016/11/2.
 */
define(function (require, exports, module) {
    var pagination=require('./pagination.js');
    var pages=new pagination();
    var indexjs=require('./index.js');
    var way=indexjs.way;
    var allPage=indexjs.allPages;
    // console.log(indexjs);

    // console.log(allPages);
    way('all',1);
    pages.pagesType='all';
    pages.render('pagination123',1,allPage,5,'all');
    pages.CPage(1,allPage,5);
    window.addEventListener('hashchange',function () {
        // console.log('do2');
        var hash=window.location.hash;
        var end = new RegExp(/\d+$/);
        pages.page=end.exec(hash);
        var p=pages.page[0];
        // console.log(pages.page[0]);
        var reg = /\/([^\/]*)\//g;
        while(reg.exec(hash)){
            pages.pagesType=RegExp.$1
        }
        var pst=pages.pagesType;
        way(pst,p);
            pages.render('pagination123', p, allPage, 5, pst);
    },false);
    // console.log(11);
});
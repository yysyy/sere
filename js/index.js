/**
 * Created by Administrator on 2016/10/25.
 */
define(function (require,exports,module) {
    (function (window) {
        var allPages=0;
        var way=function (typeData, pageData) {
         var formatterDateTime=   function () {
                var date = new Date()
                var month = date.getMonth() + 1
                var datetime = date.getFullYear()
                    + ""// "年"
                    + (month >= 10 ? month : "0" + month)
                    + ""// "月"
                    + (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate())
                    + ""
                    + (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours())
                    + ""
                    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes())
                    + ""
                    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
                return datetime;
            }

            var askData=function (dataUrl, fn) {
                $.ajax({
                    url: dataUrl,
                    type: 'get',
                    dataType: 'jsonp',
                    async: true,
                    jsonp: 'jsonpcallback',
                    success: function (data) {
                        fn(data);
                    },
                    error: function (e) {
                        console.log(e);
                    }
                })
            };
            var typeD='';
            if(typeData=='all'){
                typeD='';
            }else if(typeData=='video'){
                typeD=41;
            }else if(typeData=='pic'){
                typeD=10;
            }else if(typeData=='text'){
                typeD=29;
            }else if(typeData=='audio'){
                typeD=31;
            }
            var pageD=pageData?pageData:1;

            var url = 'https://route.showapi.com/255-1?page='+pageD+'&showapi_appid=26114&showapi_timestamp='+formatterDateTime()+'&title=&type='+typeD+'&showapi_sign=2f3eb272ad574004a97760ce3f1f35da';
            var list=function (contentlist) {
                var str='';
                str+=' <div class="j-r-nav">';
                str+='     <ul>';
                str+='     <li class="j-nav-active"><a href="/">精华</a>';
                str+='     </li>';
                str+='     <li><a href="/new/">最新</a>';
                str+='     </li>';
                str+='     <li><a href="/old/">穿越</a>';
                str+='     </li>';
                str+='     </ul>';
                str+='</div>';
                str+='      <div class="j-r-list">';
                str+='           <ul>';
                for(var i=0;i<contentlist.length;i++) {
                    str += '           <li>';
                    str += '           <!--用户信息-->';
                    str += '           <div class="j-list-user">';
                    str += '           <div class="u-img">';
                    str += '           <a href="/user/others-12579103.html" target="_blank">';
                    str += '          <img class="u-logo lazy" src="'+contentlist[i].profile_image+'" data-original="'+contentlist[i].profile_image+'" alt="'+contentlist[i].name+'" style="display: block;">';
                    str += '           </a>';
                    str += '           </div>';
                    str += '           <div class="u-txt">';
                    str += '           <a href="/user/others-12579103.html" class="u-user-name" target="_blank">'+contentlist[i].name+'</a>';
                    str += '           <span class="u-time  f-ib f-fr">'+contentlist[i].create_time+'</span>';
                    str += '       </div>';
                    str += '       </div>';
                    str += '       <div class="j-r-list-c">';
                    str += '           <!--因为头像单独占位 所以内容需要 移动 一个头像高度 30px+间距10px -->';
                    str += '       <!--描述 段子 直接 只有它-->';
                    str += '       <div class="j-r-list-c-desc">';
                    str += contentlist[i].text;
                    str += '       </div>';
                    str += '       <!--视频 -->';
                    if(contentlist[i].type=='41') {
                        str += '       <div class="j-video-c" data-id="' + contentlist[i].id + '" data-title="' + contentlist[i].text + '" data-date="' + contentlist[i].create_time.substring(0,9) + '" data-time="' + contentlist[i].create_time.substring(10, 16) + '" data-videomlen="2.0分钟">';
                        str += '          <div class="jwplayer playlist-none jw-user-inactive" id="j-v-' + contentlist[i].id + '" tabindex="0" style="width:100%; height: 100%; background-color: rgb(0, 0, 0);">';
                        str += '           </div>';
                        str += '           </div>';
                        str += '           </div>';
                    }             else if(contentlist[i].type=='10'&&contentlist[i].image0!=''){
                        str+='  <div class="j-r-list-c-img">';
                        str+='       <img src="' + contentlist[i].image0 + '" class="lazy" data-original="' + contentlist[i].image0 + '" title="' + contentlist[i].text + '" alt="' + contentlist[i].text + '" style="display: inline;">';
                        str+='         </div>';
                    }
                    str += '           <!--操作工具条-->';
                    str += '           <div class="j-r-list-tool" data-type="41" data-video_mlen="2.0分钟" data-id="' + contentlist[i].id + '" data-title="' + contentlist[i].text + '" data-date="' + contentlist[i].create_time.substring(0,9) + '" data-time="' + contentlist[i].create_time.substring(10, 16) + '" data-playcount="15357" data-playfcount="2688">';
                    str += '           <div class="j-r-list-tool-l " data-id="' + contentlist[i].id + '">';
                    str += '           <ul>';
                    str += '           <li class="j-r-list-tool-l-up">';
                    str += '           <i class="icon-up ui-icon-up"></i>&nbsp;&nbsp;<span>' + contentlist[i].love + '</span>';
                    str += '       </li>';
                    str += '       <li class="j-r-list-tool-l-down ">';
                    str += '           <i class="icon-down"></i>&nbsp;&nbsp;<span>' + contentlist[i].hate + '</span>';
                    str += '       </li>';
                    str += '       </ul>';
                    str += '       </div>';
                    str += '       <!--分享-->';
                    str += '       <div class="j-r-list-tool-ct">';
                    str += '           <div class="j-r-list-tool-ct-share-c">';
                    str += '           <span>分享&nbsp;&nbsp;51&nbsp;&nbsp;</span>';
                    str += '       </div>';
                    str += '       <div class="j-r-list-tool-ct-fx">';
                    str += '           <div class="bdsharebuttonbox fx-bd-' + contentlist[i].id + ' bdshare-button-style1-24" data-id="' + contentlist[i].id + '" data-url="/detail-' + contentlist[i].id + '.html" data-pic="http://mpic.spriteapp.cn/picture/2016/1022/580ac41fcadfe__b.jpg" data-text="' + contentlist[i].text + '" data-bd-bind="1477395161620">';
                    str += '           <a href="javascript:void(0);" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>';
                    str += '           <a href="javascript:void(0);" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>';
                    str += '           <a href="javascript:void(0);" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>';
                    str += '           <a href="javascript:void(0);" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>';
                    str += '           <a class="bds_more" data-cmd="more"></a>';
                    str += '           </div>';
                    str += '           </div>';
                    str += '           </div>';
                    str += '           <!-- 评论收藏 -->';
                    str += '           <div class="j-r-list-tool-r j-r-list-tool-cc">';
                    str += '           <ul>';
                    str += '           <li class="j-r-list-tool-l-down f-tar j-down-video j-down-hide ipad-hide" title="下载视频" id="j-v-b-' + contentlist[i].id + '" data-url="/detail-21557513.html" data-pic="http://mpic.spriteapp.cn/picture/2016/1022/580ac41fcadfe__b.jpg" data-text="' + contentlist[i].text + '">';
                    str += '           <a href="' + contentlist[i].video_uri + '" target="_blank" download="" class="ipad-down-href" style="border:0;outline: none;">';
                    str += '           <i class="icon-dd"></i>';
                    str += '           </a>';
                    str += '           <input type="hidden" value="thunder://QUFodHRwOi8vbXZpZGVvLnNwcml0ZWFwcC5jbi92aWRlby8yMDE2LzEwMjIvNTgwYWM0MWZkYjZmZl93cGQubXA0Wlo=" id="ipad-downvideo-href">';
                    str += '           </li>';
                    str += '           <li class=" f-tar j-collect j-collect-width  j-r-list-tool-l-cc">';
                    str += '           <i class="icon-cc"></i>';
                    str += '           </li>';
                    str += '           <li class=" f-tac j-comment j-comment-width  j-r-list-tool-l-comment">';
                    str += '           <a href="/detail-21557513.html" class="j-list-comment" target="_blank">';
                    str += '           <i class="icon-comment "></i>&nbsp;<span class="comment-counts">12</span></a>';
                    str += '           </li>';
                    str += '           </ul>';
                    str += '           </div>';
                    str += '           </div>';
                    str += '           </li>';
                }
                str+='           </ul>';
                str+='           </div>';
                $(".j-r-c").html($(str));
            }
            list([]);
            askData(url,function (data) {
                //    var recommend=function () {
                //          var str='';
                // str+='       <!--弹出推荐-->';
                // str+='       <div class="j-v-d-c" id="j-v-container-21557513" style="display: block;">';
                // str+='           <div class="video-c-dialog slideBox">';
                // str+='           <div class="bd">';
                // str+='          <div class="tempWrap" style="overflow:hidden; position:relative; width:566px">';
                // str+='<ul style="width: 2830px; position: relative; overflow: hidden; padding: 0px; margin: 0px; left: -566px;">';
                // str+='           <li class="bd-2 clone" style="float: left; width: 566px;">';
                // str+='           <div class="bd-2-c">';
                // str+='           <div class="n-title  n-title-down">';
                // str+='           <h2 class="u-tt u-tt-sm">';
                // str+='          <a class="v-d-hd-download btnSmXz2" href="javascript:void(0);">扫码&nbsp;&nbsp;下载百思不得姐</a>';
                // str+='       </h2>';
                // str+='       </div>';
                // str+='       <!-- 更多 -->';
                // str+='       <div class="m-list4">';
                // str+='           <ul class="bd-2-ul">';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='<a href="/detail-14714076.html" data-title=" 这个人真是牛逼死了" data-id="14714076" data-date="2016-10-25" data-time="15:06" class="m-list-v-play-c" style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0701/55938b7f804a4_wpd.jpg" class="lazy" data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0701/55938b7f804a4_wpd.jpg" alt="这个人真是牛逼死了" style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14714076.html">';
                // str+='           这个人真是牛逼死了</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-14526000.html" data-title=" 小菇凉背个乘法..." data-id="14526000" data-date="2016-10-25" data-time="15:06" class="m-list-v-play-c" style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0706/559a111cbe439_wpd.jpg" class="lazy" data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0706/559a111cbe439_wpd.jpg" alt="小菇凉背个乘法..." style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14526000.html">';
                // str+='           小菇凉背个乘法...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-15208167.html"';
                // str+='      data-title=" 不愧是当老板的！"';
                // str+='      data-id="15208167"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0817/55d17acc07caf_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0817/55d17acc07caf_wpd.jpg"';
                // str+='      alt="不愧是当老板的！"';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-15208167.html">';
                // str+='           不愧是当老板的！</a>';
                // str+='       </p>';
                // str+='       </li>';
                // str+='       <li>';
                // str+='       <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-15351429.html"';
                // str+='      data-title=" 撞气球又有新玩..."';
                // str+='      data-id="15351429"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0830/55e2a64e57b2e_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0830/55e2a64e57b2e_wpd.jpg"';
                // str+='      alt="撞气球又有新玩..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-15351429.html">';
                // str+='           撞气球又有新玩...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           </ul>';
                // str+='           </div>';
                // str+='           </div>';
                // str+='           </li>';
                // str+='           <!-- 视频第一屏 -->';
                // str+='           <li class="bd-1" style="float: left; width: 566px;">';
                // str+='           <div class="bd-1-c">';
                // str+='           <div class="bd-1-c-left">';
                // str+='           <div class="n-title">';
                // str+='           <h2 class="u-tt">扫码&nbsp;&nbsp;下载百思不得姐</h2>';
                // str+='       </div>';
                // str+='       <div class="d-qr">';
                // str+='           <i class="icon-v-d-qr"></i>';
                // str+='           </div>';
                // str+='           </div>';
                // str+='           <!-- TODO: recommend = recommend_list[forloop.counter] -->';
                // str+='           <div class="bd-1-c-right">';
                // str+='           <div class="m-list4">';
                // str+='           <ul>';
                // str+='           <li>';
                // str+='           <div class="u-img">';
                // str+='           <!-- 推荐的链接-->';
                // str+='          <a href="/detail-15076473.html "';
                // str+='      data-title=" 刚刚曝光的传销..."';
                // str+='      data-id="15076473"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!-- gaga 图片地址 152x93 -->';
                // str+='      <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0805/55c1b6ad2034e_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0805/55c1b6ad2034e_wpd.jpg"';
                // str+='      alt="刚刚曝光的传销..."';
                // str+='      title="刚刚曝光的传销..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a';
                // str+='       href="/detail-15076473.html">';
                // str+='           刚刚曝光的传销...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img">';
                // str+='           <!-- 推荐的链接-->';
                // str+='          <a href="/detail-14636956.html"';
                // str+='      data-title=" 这魔术碉堡了！..."';
                // str+='      data-id="14636956"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!-- gaga 图片地址 152x93 -->';
                // str+='      <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0621/5586624011857_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0621/5586624011857_wpd.jpg"';
                // str+='      alt="这魔术碉堡了！..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14636956.html">';
                // str+='           这魔术碉堡了！...</a>';
                // str+='       </p>';
                // str+='       </li>';
                // str+='       </ul>';
                // str+='       </div>';
                // str+='       </div>';
                // str+='       </div>';
                // str+='       </li>';
                // str+='       <!-- 视频第二屏 -->';
                // str+='       <li class="bd-2" style="float: left; width: 566px;">';
                // str+='           <div class="bd-2-c">';
                // str+='           <div class="n-title n-title-down">';
                // str+='           <h2 class="u-tt u-tt-sm">';
                // str+='          <a class="v-d-hd-download btnSmXz1"';
                // str+='       href="javascript:void(0);">扫码&nbsp;&nbsp;下载百思不得姐</a>';
                // str+='       </h2>';
                // str+='       </div>';
                // str+='       <!-- 更多 -->';
                // str+='       <div class="m-list4">';
                // str+='           <ul class="bd-2-ul">';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-15417936.html"';
                // str+='      data-title=" 她年仅11岁，..."';
                // str+='      data-id="15417936"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0905/55ea825cd4ada_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0905/55ea825cd4ada_wpd.jpg"';
                // str+='      alt="她年仅11岁，..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-15417936.html">';
                // str+='           她年仅11岁，...</a>';
                // str+='       </p>';
                // str+='       </li>';
                // str+='       <li>';
                // str+='       <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-14774098.html"';
                // str+='      data-title=" 世界上最恐怖的..."';
                // str+='      data-id="14774098"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0708/559c68633ff91_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0708/559c68633ff91_wpd.jpg"';
                // str+='      alt="世界上最恐怖的..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14774098.html">';
                // str+='           世界上最恐怖的...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-14889647.html"';
                // str+='      data-title=" 国内最牛女司机..."';
                // str+='      data-id="14889647"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0719/55ab741872c51_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0719/55ab741872c51_wpd.jpg"';
                // str+='      alt="国内最牛女司机..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14889647.html">';
                // str+='           国内最牛女司机...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-14822279.html"';
                // str+='      data-title=" 泡妞歌，让我们..."';
                // str+='      data-id="14822279"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0713/55a38dfe58db6_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0713/55a38dfe58db6_wpd.jpg"';
                // str+='      alt="泡妞歌，让我们..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14822279.html">';
                // str+='           泡妞歌，让我们...</a>';
                // str+='       </p>';
                // str+='       </li>';
                // str+='       </ul>';
                // str+='       </div>';
                // str+='       </div>';
                // str+='       </li>';
                // str+='       <!-- 视频第三屏 -->';
                // str+='       <li class="bd-2" style="float: left; width: 566px;">';
                // str+='           <div class="bd-2-c">';
                // str+='           <div class="n-title  n-title-down">';
                // str+='           <h2 class="u-tt u-tt-sm">';
                // str+='          <a class="v-d-hd-download btnSmXz2"';
                // str+='       href="javascript:void(0);">扫码&nbsp;&nbsp;下载百思不得姐</a>';
                // str+='       </h2>';
                // str+='       </div>';
                // str+='       <!-- 更多 -->';
                // str+='       <div class="m-list4">';
                // str+='           <ul class="bd-2-ul">';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-14714076.html"';
                // str+='      data-title=" 这个人真是牛逼死了"';
                // str+='      data-id="14714076"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0701/55938b7f804a4_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0701/55938b7f804a4_wpd.jpg"';
                // str+='      alt="这个人真是牛逼死了"';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14714076.html">';
                // str+='           这个人真是牛逼死了</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-14526000.html"';
                // str+='      data-title=" 小菇凉背个乘法..."';
                // str+='      data-id="14526000"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0706/559a111cbe439_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0706/559a111cbe439_wpd.jpg"';
                // str+='      alt="小菇凉背个乘法..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-14526000.html">';
                // str+='           小菇凉背个乘法...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-15208167.html"';
                // str+='      data-title=" 不愧是当老板的！"';
                // str+='      data-id="15208167"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0817/55d17acc07caf_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0817/55d17acc07caf_wpd.jpg"';
                // str+='      alt="不愧是当老板的！"';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-15208167.html">';
                // str+='           不愧是当老板的！</a>';
                // str+='       </p>';
                // str+='       </li>';
                // str+='       <li>';
                // str+='       <div class="u-img ">';
                // str+='           <!--推荐的链接-->';
                // str+='          <a href="/detail-15351429.html"';
                // str+='      data-title=" 撞气球又有新玩..."';
                // str+='      data-id="15351429"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!--图片地址-->';
                // str+='          <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0830/55e2a64e57b2e_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0830/55e2a64e57b2e_wpd.jpg"';
                // str+='      alt="撞气球又有新玩..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a href="/detail-15351429.html">';
                // str+='           撞气球又有新玩...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           </ul>';
                // str+='           </div>';
                // str+='           </div>';
                // str+='           </li>';
                // str+='           <li class="bd-1 clone" style="float: left; width: 566px;">';
                // str+='           <div class="bd-1-c">';
                // str+='           <div class="bd-1-c-left">';
                // str+='           <div class="n-title">';
                // str+='           <h2 class="u-tt">扫码&nbsp;&nbsp;下载百思不得姐</h2>';
                // str+='       </div>';
                // str+='       <div class="d-qr">';
                // str+='           <i class="icon-v-d-qr"></i>';
                // str+='           </div>';
                // str+='           </div>';
                // str+='           <!-- TODO: recommend = recommend_list[forloop.counter] -->';
                // str+='           <div class="bd-1-c-right">';
                // str+='           <div class="m-list4">';
                // str+='           <ul>';
                // str+='           <li>';
                // str+='           <div class="u-img">';
                // str+='           <!-- 推荐的链接-->';
                // str+='          <a href="/detail-15076473.html "';
                // str+='      data-title=" 刚刚曝光的传销..."';
                // str+='      data-id="15076473"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!-- gaga 图片地址 152x93 -->';
                // str+='      <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0805/55c1b6ad2034e_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0805/55c1b6ad2034e_wpd.jpg"';
                // str+='      alt="刚刚曝光的传销..."';
                // str+='      title="刚刚曝光的传销..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a';
                // str+='       href="/detail-15076473.html">';
                // str+='           刚刚曝光的传销...</a>';
                // str+='           </p>';
                // str+='           </li>';
                // str+='           <li>';
                // str+='           <div class="u-img">';
                // str+='           <!-- 推荐的链接-->';
                // str+='          <a href="/detail-14636956.html"';
                // str+='      data-title=" 这魔术碉堡了！..."';
                // str+='      data-id="14636956"';
                // str+='      data-date="2016-10-25"';
                // str+='      data-time="15:06"';
                // str+='      class="m-list-v-play-c"';
                // str+='       style="display: block;">';
                // str+='           <i class="icon_play_left icon-play"></i>';
                // str+='           <!-- gaga 图片地址 152x93 -->';
                // str+='      <img src="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0621/5586624011857_wpd.jpg"';
                // str+='      class="lazy"';
                // str+='      data-original="http://mpic.spriteapp.cn/crop/152x93/picture/2015/0621/5586624011857_wpd.jpg"';
                // str+='      alt="这魔术碉堡了！..."';
                // str+='       style="display: block;">';
                // str+='           </a>';
                // str+='           </div>';
                // str+='           <p>&nbsp;<a';
                // str+='       href="/detail-14636956.html">';
                // str+='           这魔术碉堡了！...</a>';
                // str+='       </p>';
                // str+='       </li>';
                // str+='       </ul>';
                // str+='       </div>';
                // str+='       </div>';
                // str+='       </div>';
                // str+='       </li>';
                // str+='       </ul>';
                // str+='       </div>';
                // str+='       <span class="icon-replay"></span>';
                // str+='           </div>';
                // str+='           <!-- 下面是前/后按钮代码，如果不需要删除即可 -->';
                // str+='       <a class="prev prevStop" href="javascript:void(0)">';
                // str+='           <i class="icon-next-arrow"></i>';
                // str+='           </a>';
                // str+='           <a class="next" href="javascript:void(0)">';
                // str+='           <i class="icon-prev-arrow"></i>';
                // str+='           </a>';
                // str+='           </div>';
                // str+='         </div>';
                //          return str;
                //      }();
                var contentlist=data.showapi_res_body.pagebean.contentlist;
                allPages=data.showapi_res_body.pagebean.allPages;
                var allPages=function() {
                    return allPages;
                };
                exports.allPages=allPages;

                // console.log(contentlist);
                var jw=function (contentlist,i) {
                    // console.log("j-v-"+contentlist[i].id);
                    var jws=jwplayer("j-v-"+contentlist[i].id).setup({
                        flashplayer: 'jwplayer.flash.swf',
                        autostart: 'false',
                        controlbar: 'bottom',
                        primary: "html5",
                        dock: true,
                        image:contentlist[i].video_uri,
                        'file':contentlist[i].video_uri,
                        'width':'100%',
                        'height':'100%',
                        'background-color':'rgb(0, 0, 0)',
                        'opacity': 1
                    });
                    // $('#j-v-'+contentlist[i].id+' .jwdisplay #j-v-'+contentlist[i].id+'_display_button_play').css
                    // ({
                    //     width: 72,
                    //     'background-image': "url(img/v_play.png)",
                    //     'background-size': '72px 72px',
                    //     'float': 'none'
                    // });
                    videoArr.push(jws);
                };
                // console.log(contentlist);
                //list
                var videoArr=[];
                list(contentlist);
                for(var i=0;i<contentlist.length;i++) {
                    if(contentlist[i].type=='41'){
                        jw(contentlist,i);
                    }
                }
                // console.log($('j-v-b-' + contentlist[0].id));
                // $('j-v-b-'+contentlist[0].id).on('click',function () {
                //    console.log(111);
                // });
                // console.log(videoArr);
                for(var i=0;i<videoArr.length;i++) {
                    videoArr[i].sx = i;
                    var start = videoArr[i].getState();
                    $(start).on('change',function () {
                        switch (start) {
                            case 'PLAYING':

                                videoArr[this.sx].play(true);
                                break;
                            default:break;
                        }
                    });
                }
                // setTimeout(function () {
                //     for (var m = 0; m < videoArr.length; m++) {
                //         videoArr[m].stop();
                //     }
                // },6000);

                // $('.player-status').click(function() {
                //     var state = thePlayer.getState();
                //     var msg;
                //     switch (state) {
                //         case 'BUFFERING':
                //             msg = '加载中';
                //             break;
                //         case 'PLAYING':
                //             msg = '正在播放';
                //             break;
                //         case 'PAUSED':
                //             msg = '暂停';
                //             break;
                //         case 'IDLE':
                //             msg = '停止';
                //             break;
                //     }
                //     alert(msg);
                // });
                // console.log(videoArr);
            });
        };
        var st_h=$('.scroll-top').height()+40;
        var g_sd_h=$('.g-sd').height();
        var j_header_h=$(".j-header").height();
        var j_page_h=$(".j-page").height();
        // console.log('j_header_h'+j_header_h);
        var j_footer_h=$('.j-footer').height();
        $(window).scroll(function () {
            var scrollTop=$(document).scrollTop();
            var body_h=$('body').height();
            var j_content_h=$(".j-content").height();
            if(scrollTop<st_h){
                $('.scroll-top').css({
                    'margin-bottom':-st_h
                });
            }
            else {
                $('.scroll-top').css({
                    'margin-bottom':0
                });
            }
            var chbp_h=j_content_h+j_header_h-body_h-j_page_h;
            if(scrollTop>(g_sd_h-body_h+j_header_h)&&scrollTop<(chbp_h)){
                $('.j-l-c').addClass('bd-fixed').css({
                    top:-(g_sd_h-body_h+j_header_h)
                });
            }else if(scrollTop>=(chbp_h)){
                $('.j-l-c').addClass('bd-fixed').css({
                    top:-(g_sd_h-body_h+j_footer_h+j_page_h)
                });
            }
            else {
                $('.j-l-c').removeClass('bd-fixed').css({
                    top:0
                });
            }
        });
        exports.way=way;
    })(window);
});
var common={CurrentServerDate:'',basePostData:{_ClientKey:"IntouchWeb",_UserName:"IntouchUserName"},message:{unKnownMessage:"未知错误，请刷新后重试...",serverMessage:"服务端出现错误，请联系管理员..."},ajaxType:{GET:"GET",POST:"POST"},constchar:{seasonName:{liangcaimengxiang:'dcfc23e3cba1d9020088280af1ef4719',donggantuibian:'22ee5200631ef73a25fdd4cc3fe36558',hualizhanfang:'e0272369c8492c87cf5f3fca6b5b43a5'}},requestControllerAjax:function(url,ajaxtype,data,succsscallback,errorvallback){if(ajaxtype==common.ajaxType.GET){data.time=new Date();}
$.ajax({url:DomainPreUrl+url,type:ajaxtype,data:data,dataType:"json",traditional:true,success:function(re){succsscallback(re);},error:function(re){if(re!=undefined&&re!=null){if(typeof(errorvallback)!='undefined')
errorvallback(re);}}});},DeletePieceRemind:function(data,successcallback,errorcallback){common.requestControllerAjax("Piece/DeletePieceRemind",common.ajaxType.POST,data,successcallback,errorcallback);},CreatePieceRemind:function(data,successcallback,errorcallback){common.requestControllerAjax("Piece/CreatePieceRemind",common.ajaxType.POST,data,successcallback,errorcallback);},CheckWeChatRemind:function(data,successcallback,errorcallback){common.requestControllerAjax("Piece/CheckWeChatRemind",common.ajaxType.GET,data,successcallback,errorcallback);},deleteAppointment:function(data,successcallback,errorcallback){common.requestControllerAjax("Appointment/DeleteAppointment",common.ajaxType.POST,data,successcallback,errorcallback);},consultantLogin:function(reqd){common.callAjax(common.visitExternalUrl.ConsultantLogin,common.method.post,reqd,function(re){});},createUser:function(reqd,callback){common.callAjax(common.visitExternalUrl.CreateUser,common.method.post,reqd,function(re){callback(re);});},sendAward:function(data,successcallback,errorcallback){common.requestControllerAjax("Lottery/SendArawd",common.ajaxType.GET,data,successcallback,errorcallback);},getUser:function(successcallback,errorcallback){common.requestControllerAjax("User/GetUser",common.ajaxType.GET,{},successcallback,errorcallback);},getLotteryRecord:function(reqd,callback){common.requestControllerAjax("Lottery/GetLotteryRecord?Lotterykey="+reqd,common.ajaxType.GET,{},callback);},getVoteSummary:function(succsscallback,errorvallback){common.requestControllerAjax("home/getVoteSummary",common.ajaxType.GET,{},succsscallback,errorvallback);},getShareSummary:function(succsscallback,errorvallback){common.requestControllerAjax("home/getShareSummary",common.ajaxType.GET,{},succsscallback,errorvallback);},getLotterySummary:function(successcallback,errorcallback){common.requestControllerAjax("Lottery/GetLotterySummary",common.ajaxType.GET,{},successcallback,errorcallback);},createActivityShare:function(reqd,succsscallback,errorvallback){common.requestControllerAjax("Piece/CreateActivityShare",common.ajaxType.POST,reqd,succsscallback,errorvallback);},getPiece:function(reqd,callback){common.callAjax(common.visitExternalUrl.GetPiece,common.method.get,reqd,function(re){callback(re);});},getBeautyConsultant:function(reqd,callback){common.sendRequest("bc","GET",reqd,EXHost,EXAPIUrl,function(re){callback(re);});},getVote:function(reqd,callback){common.sendRequest("vote","GET",reqd,EXHost,EXAPIUrl,function(re){callback(re);});},GetVoteGate:function(reqd,callback){common.sendRequest("gate/vote","GET",reqd,EXHost,EXAPIUrl,function(re){callback(re);});},createVote:function(reqd,succsscallback,errorvallback){common.requestControllerAjax("Piece/CreateVote",common.ajaxType.POST,reqd,succsscallback,errorvallback);},createPieceShare:function(reqd,succsscallback,errorvallback){common.requestControllerAjax("Piece/CreatePieceShare",common.ajaxType.POST,reqd,succsscallback,errorvallback);},createVideoShare:function(reqd,succsscallback,errorvallback){common.requestControllerAjax("Piece/CreateVideoShare",common.ajaxType.POST,reqd,succsscallback,errorvallback);},getVoteQualification:function(reqd,succsscallback,errorvallback){common.requestControllerAjax("Piece/GetVoteQualification",common.ajaxType.GET,reqd,succsscallback,errorvallback);},getPrize:function(reqd,callback){common.sendRequest("prize","GET",reqd,EXHost,EXAPIUrl,function(re){callback(re);});},queryLotteryRecord:function(successcallback,errorcallback){common.requestControllerAjax("Lottery/QueryLotteryRecord",common.ajaxType.GET,{},successcallback,errorcallback);},queryLotteryRecordIn:function(callback){common.requestControllerAjax("Lottery/QueryLotteryRecord",common.ajaxType.GET,{},function(re){common.CurrentServerDate=re.CurrentServerDate;common.funGetPrize(re.LotteryRecords,callback);},null);},get_WXSDK:function(url,successcallback){common.requestControllerAjax("Home/get_WXSDK",common.ajaxType.GET,{url:url},successcallback);},funGetPrize:function(lotteryList,callback){var lotteryRecordList=new Array();var prizeList=new Array();var tempAwardList=new Array();var Lotterykeys=new Array();for(var i=0;i<lotteryList.length;i++){lotteryRecordList.push(lotteryList[i]);}
lotteryRecordList.sort(function(a,b){return(a.CreateDateTime-b.CreateDateTime<0)?1:-1;});common.getPrize(common.basePostData,function(r){for(var i=0,max=r.Prizes.length;i<max;i++){prizeList.push(r.Prizes[i]);}
for(var i=0,max=lotteryRecordList.length;i<max;i++){Lotterykeys.push(lotteryRecordList[i].Lotterykey);var awardojb={};for(var j=0;j<prizeList.length;j++){if(lotteryRecordList[i].AwardId==prizeList[j].Id){awardojb.CreateDateTime=lotteryRecordList[i].CreateDateTime;awardojb.Lotterykey=lotteryRecordList[i].Lotterykey;awardojb.WhetherSendAwrd=lotteryRecordList[i].WhetherSendAwrd;awardojb.UserKey=lotteryRecordList[i].UserKey;awardojb.SeasonName=lotteryRecordList[i].SeasonName;awardojb.SeasonId=lotteryRecordList[i].SeasonId;awardojb.PrizeName=prizeList[j].Name;awardojb.AwardId=prizeList[j].AwardId;awardojb.EnableEdit=true;if(window.location.href.indexOf("index")>1||window.location.href.indexOf("Index")>1){awardojb.PictureUrl="../Content/image"+prizeList[j].PictureUrl;}else{awardojb.PictureUrl="./Content/image"+prizeList[j].PictureUrl;}
awardojb.EndDateTime=lotteryRecordList[i].SeasonEndTime
awardojb.FormatEndTime=common.formatDateTime(lotteryRecordList[i].SeasonEndTime);}}
tempAwardList.push(awardojb);}
var aData={};aData.Lotterykeys=Lotterykeys;aData.Lotterykey="";if(Lotterykeys.length==0){common.funcReturnAwardList(tempAwardList,callback);}else{common.getShipping(aData,function(re){if(re.Shippings!=null){for(var i=0,max=tempAwardList.length;i<max;i++){for(var j=0;j<re.Shippings.length;j++){if(tempAwardList[i].Lotterykey==re.Shippings[j].LotteryKey){tempAwardList[i].EnableEdit=re.Shippings[j].EnableEdit;tempAwardList[i].ShippingKey=re.Shippings[j].ShippingKey;tempAwardList[i].ProvinceId=re.Shippings[j].ProvinceId;tempAwardList[i].CityId=re.Shippings[j].CityId;tempAwardList[i].CountyId=re.Shippings[j].CountyId;tempAwardList[i].StreetAddress=re.Shippings[j].StreetAddress;tempAwardList[i].ReceivedName=re.Shippings[j].ReceivedName;tempAwardList[i].ReceivedPhoneNumber=re.Shippings[j].ReceivedPhoneNumber;}}}
common.funcgetProvince(tempAwardList,callback);}else{common.funcReturnAwardList(tempAwardList,callback);}},function(re){common.funcReturnAwardList(tempAwardList,callback);});}});},funcReturnAwardList:function(tempAwardList,callback){callback(tempAwardList);},funcgetProvince:function(tempAwardList,callback){common.getProvince(function(re){for(var j=0,maxa=tempAwardList.length;j<maxa;j++){for(var i=0,maxb=re.length;i<maxb;i++){if(tempAwardList[j].ProvinceId==re[i].ProvinceID){tempAwardList[j].ProvinceName=re[i].Name;}}}
common.funcgetCitys(0,tempAwardList,callback);});},funcgetCitys:function(index,tempAwardList,callback){if(index>tempAwardList.length-1){common.funcReturnAwardList(tempAwardList,callback);}else{if(tempAwardList[index].ProvinceId!=undefined&&tempAwardList[index].ProvinceId>0){common.getCity(tempAwardList[index].ProvinceId,function(re){for(var i=0;i<re.length;i++){if(tempAwardList[index].CityId==re[i].CityID){tempAwardList[index].CityName=re[i].Name;}}
common.getCounty(tempAwardList[index].CityId,function(re){for(var i=0;i<re.length;i++){if(tempAwardList[index].CountyId==re[i].CountyID){tempAwardList[index].CountyName=re[i].Name;}}
common.funcgetCitys(index+1,tempAwardList,callback);});});}else{common.funcgetCitys(index+1,tempAwardList,callback);}}},getShipping:function(reqd,successcallback,errorcallback){common.requestControllerAjax("Shipping/GetShipping",common.ajaxType.GET,reqd,successcallback,errorcallback);},formatDateTime:function(dt){var date=new Date(dt);Y=date.getFullYear()+'年';M=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'月';D=date.getDate()+'日';return(Y+M+D);},getSeason:function(reqd,callback){common.sendRequest("season","GET",reqd,EXHost,EXAPIUrl,function(re){callback(re);});},createLotteryRecord:function(reqd,callback){common.requestControllerAjax("Lottery/CreateLotteryRecord",common.ajaxType.POST,reqd,callback);},createShipping:function(reqd,successcallback,errorcallback){common.requestControllerAjax("Shipping/CreateShipping",common.ajaxType.POST,reqd,successcallback,errorcallback);},updateShipping:function(reqd,successcallback,errorcallback){common.requestControllerAjax("Shipping/UpdateShipping",common.ajaxType.POST,reqd,successcallback,errorcallback);},getAppointment:function(successcallback,errorcallback){common.requestControllerAjax("Appointment/GetAppointment",common.ajaxType.GET,{},successcallback,errorcallback);},createAppointment:function(reqd,successcallback,errorcallback){common.requestControllerAjax("Appointment/CreateAppointment",common.ajaxType.POST,reqd,successcallback,errorcallback);},getCity:function(ProvinceId,callback){var aData={};common.copyObject(common.basePostData,aData);aData.ProvinceId=ProvinceId;common.sendRequest("city/"+ProvinceId,"GET",aData,EXHost,EXAPIUrl,function(re){callback(re.Cities);});},getCounty:function(CityId,callback){var aData={};common.copyObject(common.basePostData,aData);aData.CityId=CityId;common.sendRequest("county/"+CityId,"GET",aData,EXHost,EXAPIUrl,function(re){callback(re.Counties);});},getIsInPeriodResult:function(a,b){if(a!=null&&b!=null){var currentTime=new Date().getTime();var beginTime=new Date(a).getTime();var endTime=new Date(b).getTime();if((currentTime-beginTime>0)&&(currentTime-endTime<0)){return true;}}
return false;},queryPieces:function(reqd,callback){common.sendRequest("query/pieces","GET",reqd,EXHost,EXAPIUrl,function(dataObj){var tempList=new Array();var PiecesKeyList=new Array();var ContactIdList=new Array();var dataNextPage=dataObj.NextPage;var dataObj=dataObj.Pieces;if(dataObj==null||dataObj.length<=0){callback(tempList);return false;}
var httpReplaceStr=new RegExp("https://dscnazepbeauresource01.blob.core.chinacloudapi.cn","g");for(var i=0;i<dataObj.length;i++){var pieces={};pieces.PieceKey=dataObj[i].PieceKey;pieces.TicketId=dataObj[i].TicketId;pieces.CustomerName=dataObj[i].CustomerName;pieces.BeforeBlobURL=dataObj[i].BeforeBlobURL;if(pieces.BeforeBlobURL!=undefined){pieces.BeforeBlobURL=pieces.BeforeBlobURL.replace(httpReplaceStr,"http://dscnazepbeauresource01.marykay.com.cn");}
pieces.AfterBlobURL=dataObj[i].AfterBlobURL;if(pieces.AfterBlobURL!=undefined){pieces.AfterBlobURL=pieces.AfterBlobURL.replace(httpReplaceStr,"http://dscnazepbeauresource01.marykay.com.cn");}
if(dataObj[i].TicketType=="0"){if((dataObj[i].RecuriterDirectSellerID)){pieces.ContactId=dataObj[i].RecuriterContactId;pieces.DirectSellerId=dataObj[i].RecuriterDirectSellerID;pieces.ConsultantName=dataObj[i].RecuriterName;}else{pieces.ContactId=dataObj[i].DirectorContactId;pieces.DirectSellerId=dataObj[i].DirectorDirectSellerID;pieces.ConsultantName=dataObj[i].DirectorName;}}else if(dataObj[i].TicketType=="1"){pieces.ContactId=dataObj[i].ContactId;pieces.DirectSellerId=dataObj[i].DirectSellerID;pieces.ConsultantName=dataObj[i].ConsultantName;}else{pieces.ContactId="";pieces.DirectSellerId="";pieces.ConsultantName="";}
pieces.NSDName=dataObj[i].NSDName;pieces.Votes=dataObj[i].Votes;pieces.CanVote=true;pieces.VotesNextPage=dataNextPage.Votes;pieces.PieceKeysNextPage=dataNextPage.PieceKeys;pieces.StartDateTimeNextPage=dataNextPage.StartDateTime;pieces.CreateDateTime=dataObj[i].CreateDateTime;tempList.push(pieces);PiecesKeyList.push(dataObj[i].PieceKey);ContactIdList.push(dataObj[i].ContactId);}
if(!(PiecesKeyList)||PiecesKeyList.length<1){callback(tempList);return false;}
var params2={};params2.PieceKeys=PiecesKeyList;common.getVoteQualification(params2,function(result2){var objs2=result2.VoteQualificationList;if(objs2==null){for(var i3=0;i3<tempList.length;i3++){tempList[i3].CanVote=true;}
callback(tempList);}else{for(var i3=0;i3<tempList.length;i3++){for(var j3=0;j3<objs2.length;j3++){if(tempList[i3].PieceKey==objs2[j3].PieceKey.replace(/[-]/g,'')){if(objs2[j3].CanVote){tempList[i3].CanVote=true;}else if(objs2[j3].ErrCode==1||objs2[j3].CanVote==false){tempList[i3].CanVote=false;}else if(objs2[j3].ErrCode==2){tempList[i3].CanVote=true;}
break;}}}
callback(tempList);}});});},getProvince:function(callback){var aData={};common.copyObject(common.basePostData,aData);aData.Lisence=true;common.sendRequest("province","GET",aData,EXHost,EXAPIUrl,function(re){callback(re.Provinces);});},getWinningLottery:function(reqd,callback){common.sendRequest("lottery/winning","GET",reqd,EXHost,EXAPIUrl,function(re){callback(re);});},sendRequest:function(turl,mType,aData,apiHost,apiUrl,callbackMethod){common.getDataFromServer(turl,mType,aData,apiHost,apiUrl,{"CallBackHandler":function(data){callbackMethod(data);},"ErrorCallBackHandler":function(errordata){callbackMethod(errordata);}});},getDataFromServer:function(turl,mType,aData,apiHost,apiUrl,jsonData){common.EasyAjax(apiHost,apiUrl+turl,mType,aData).request(jsonData);},EasyAjax:function(aHost,cUrl,mType,reqd){var xhr=new easyXDM.Rpc({remote:aHost},{remote:{request:{}}});var _selfEasyAjax={request:function(jsonData){var callBack=jsonData.CallBackHandler;var errorCallBack=jsonData.ErrorCallBackHandler;xhr.request({url:cUrl,method:mType,timeout:60000,cache:true,headers:{"Accept":"application/json, text/javascript, */*; q=0.01"},data:reqd},function(response){if(response.data==""||response.data==undefined)
response.data="{}";var json=easyXDM.getJSONObject().parse(response.data);callBack(json);},function(error){if(error.data!=undefined){var json=easyXDM.getJSONObject().parse(error.data.data);errorCallBack(json);}else{var errorjson={};errorjson.CustomError="error";errorCallBack(errorjson);}});}};return _selfEasyAjax;},getImgPaths:function(reqd){var imgPaths=new Array();for(var i=0;i<reqd.length;i++){var item={};item.BlobId=reqd[i].Id;item.imgPath=reqd[i].Uri+reqd[i].SASToken;imgPaths.push(item);}
return imgPaths;},addFieldForPiece:function(r,callback){var piecesList=new Array();var tempList=new Array();var BlobIds=new Array();var PieceKeys=new Array();for(var i=0;i<r.length;i++){if(r[i].BeforeBlobId)BlobIds.push(r[i].BeforeBlobId);if(r[i].AfterBlobId)BlobIds.push(r[i].AfterBlobId);PieceKeys.push(r[i].PieceKey);}
common.getVote(PieceKeys,function(v){for(var i=0;i<r.length;i++){for(var j=0;j<v.length;j++){if(r[i].PieceKey==v[j].PieceKey){r[i].Votes=v[j].Votes;continue;}}
tempList.push(r[i]);}
if(!(BlobIds)||BlobIds.length<1){callback(tempList);return false;}
common.blobGet(BlobIds,function(re){for(var i=0;i<tempList.length;i++){var item=tempList[i];var ImgPaths=common.getImgPaths(re.Blobs);for(var j=0;j<ImgPaths.length;j++){if(ImgPaths[j].BlobId==item.BeforeBlobId){item.BeforeBlobId=ImgPaths[j].imgPath;continue;}
if(ImgPaths[j].BlobId==item.AfterBlobId){item.AfterBlobId=ImgPaths[j].imgPath;continue;}}
piecesList.push(item);}
callback(piecesList);});});},copyObject:function(fromObj,toObj){var k=null;for(var item in fromObj){k=false;for(var p in toObj){if(item==p){k=true;continue;}}
if(!k){toObj[item]=fromObj[item];}}
return toObj;},getLocalTime:function(unixTime,type){var dateObj=new Date(unixTime*1);var year=dateObj.getFullYear()
var month=(dateObj.getMonth()*1+1)>9?(dateObj.getMonth()*1+1):"0"+(dateObj.getMonth()*1+1);var date=dateObj.getDate()>9?dateObj.getDate():"0"+dateObj.getDate();var hour=dateObj.getHours()>9?dateObj.getHours():"0"+dateObj.getHours();var minute=dateObj.getMinutes()>9?dateObj.getMinutes():"0"+dateObj.getMinutes();var second=dateObj.getSeconds()>9?dateObj.getSeconds():"0"+dateObj.getSeconds();if(type=="min"){return year+"年"+month+"月"+date+"日"+" "+hour+":"+minute;}
return year+"."+month+"."+date;},getRootPath:function(){var href=window.location.href;var pathname=window.location.pathname;var search=window.location.search;var dircname=pathname.split("/");if(dircname.length>1){return(href.replace(pathname+search,'')+"/"+dircname[1]);}else{return(href.replace(pathname+search,''));}},getCurrentPath:function(){var protocol=window.location.protocol;var host=window.location.host;var pathname=window.location.pathname;return(protocol+"//"+host+pathname);},getHostDomain:function(){var protocol=window.location.protocol;var host=window.location.host;return(protocol+"//"+host+DomainPreUrl);},formatPhone:function(pnumber){var phone="";if(pnumber!=""&&pnumber!=undefined&&pnumber.length!=0){phone=phone.concat(pnumber.substr(0,3)).concat(" ").concat(pnumber.substr(3,4)).concat(" ").concat(pnumber.substr(7,4));return phone;}
return"";},checkPhone:function(pnumber){var re=/^[1][0-9]{10}$/;if(re.test(pnumber)){return true;}
return false;},isWeiXin:function(){var ua=window.navigator.userAgent.toLowerCase();if(ua.match(/MicroMessenger/i)=='micromessenger'){return true;}else{return false;}},stripscript:function stripscript(s){var pattern=new RegExp("[&]","ig")
var rs="";rs=s.replace(pattern,'');return rs;},getByteLen:function(str){str=str.replace(/(^\s*)|(\s*$)/g,"");var len=0;for(var i=0;i<str.length;i++){var a=str.charAt(i);if(a.match(/[^\x00-\xff]/ig)!=null){len+=2;}else{len+=1;}}
return len;}}
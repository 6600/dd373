var request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const express = require('express')
const app = express()
const port = 3000

// 静态目录
app.use('/',express.static('web'));

app.get('/get', (req, res) => {
  res.send(JSON.stringify({shList, jsList}))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})

const Tool = {
  wow:{
    isMillisecondStamp:function(num){if(num.length===10){return num*1000;}else if(num.length===13) {return num;}else {console.log(num+"不是一个标准的时间戳！");return false;}},
    ifStringGetElementById:function(target){if(typeof target==="string") {return document.getElementById(target);}else {return target;}},
  },
  text: {
    //分割字符串
    cutString:function(original,before,after,index) {
      index = index || 0;
      if (typeof index === "number") {
        const P = original.indexOf(before, index);
        if (P > -1) {
          if (after) {
            const f = original.indexOf(after, P + before.length);
            return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");
          } else {
            return original.slice(P + before.toString().length);
          }
        } else {
          console.error("Tool [在文本中找不到 参数一 " + before + "]");
          return
        }
      } else {
        console.error("Tool [sizeTransition:" + index + "不是一个整数!]");
      }
    },
    //根据一个基点分割字符串  实例：http://myweb-10017157.cos.myqcloud.com/20161212/%E7%BB%83%E4%B9%A0.zip
    cutStringPoint:function (original,str, before, after,order, index) {index = index || 0;if (typeof index === "number") {const O = original.indexOf(str, index);const P = (order[0]==="1")?original.lastIndexOf(before, O):original.indexOf(before, O);if (P > -1) {if (after) {let f ;switch (order[1]){case "1":f = original.indexOf(after, P + 1);break;case "2":f = original.indexOf(after, O + 1);break;case "3":f = original.lastIndexOf(after, O + 1);break;}return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");}else {return original.slice(P + before.toString().length);}}else {console.error("Tool [在文本中找不到 参数一 " + before + "]");}} else {console.error("Tool [sizeTransition:" + index + "不是一个整数!]");}},
    //分割字符串组
    cutStringArray:function(original,before,after,index){var aa=[],ab=0;while(original.indexOf(before,index)>0){aa[ab]=Tool.text.cutString(original,before,after,index);index=original.indexOf(before,index)+1;ab++;}return aa;},
    randomString:function(n){const str = 'abcdefghijklmnopqrstuvwxyz9876543210';let tmp = '',i = 0,l = str.length;for (i = 0; i < n; i++) {tmp += str.charAt(Math.floor(Math.random() * l));}return tmp;},
    replaceAll: function (temp, oString, nString) {
      if (!temp) return temp
      var startInd = -1
      while (temp.indexOf(oString, startInd) >= 0) {
        const findIndex = temp.indexOf(oString, startInd)
        temp = temp.substr(0, findIndex) + nString + temp.substr(findIndex + oString.length)
        startInd = findIndex + (nString.length - oString.length)
      }
      return temp
    },
    countSubstr: function (temp, oString) {
      if (!temp) return temp
      var startInd = -1
      var tempIndex = 0
      while (temp.indexOf(oString, startInd) >= 0) {
        const findIndex = temp.indexOf(oString, startInd)
        startInd = findIndex + 1
        tempIndex++
      }
      return tempIndex
    }
  },
  num: {
    randomNum: function (minNum,maxNum){ 
      switch(arguments.length){ 
        case 1: 
          return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
        default: 
          return 0; 
        break;
      }
    }
  }
}

// let returnList = []
// var options = {
//   'method': 'GET',
//   'url': 'https://www.dd373.com/s-eja7u2-0r2mut-0acvkr-67492s-0-0-jk5sj0-0-0-hot-0-0-1-0-0-0.html',
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   // console.log(response.body);
//   const dom = new JSDOM(response.body);
//   const dataList = dom.window.document.querySelectorAll(".hot-goods-list-content ul")
//   dataList.forEach(element => {
//     let temp = []
//     temp.push(dom.window.document.querySelectorAll('.next-dir')[1].textContent)
//     temp.push(dom.window.document.querySelectorAll('.next-dir')[2].textContent)
//     temp.push(dom.window.document.querySelectorAll('.next-dir')[3].textContent)
//     temp.push(element.querySelector('.hot-active').id.replace('hotNum', ''))
//     const danjia = parseFloat(element.querySelector('.bold').textContent)
//     temp.push(danjia)
//     temp.push(element.querySelector('.width364 .line-height14 .colorFF5').textContent)
//     temp.push(danjia * 0.97)
//     returnList.push(temp)
//   });
//   console.log(returnList)
// });

// const testTemp = {"StatusCode":"0","StatusMsg":"请求成功","StatusData":{"ResultCode":"0","ResultMsg":"操作成功","ResultData":{"RouteName":"游戏服","LevelType":3,"GameOther":[{"Id":"80512c89151940d18fdcaa1612cd24fd","Name":"阿拉希盆地(PVP)","Identify":"8kttb0","NameSpell":"alxpd(pvp)阿拉希盆地(PVP)alaxipendi(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false},{"Id":"764d5ca4e065424d843ebb6f6b4dc786","Name":"神谕林地(PVP)","Identify":"0pf223","NameSpell":"syld(pvp)神谕林地(PVP)shenyulindi(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false},{"Id":"56cd5680066446d0803d2f51f954d43d","Name":"巨龙沼泽(PVP)","Identify":"ge82p4","NameSpell":"jlzz(pvp)巨龙沼泽(PVP)julongzhaoze(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false},{"Id":"64fb547d1c2b49db9987785b92e3f9e3","Name":"圣光之愿(PVP)","Identify":"qnea70","NameSpell":"sgzy(pvp)圣光之愿(PVP)shengguangzhiyuan(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false},{"Id":"7cb6305f960340e4ae0b97b0519e48bb","Name":"祖尔格拉布(PVP)","Identify":"fc839x","NameSpell":"zeglb(pvp)祖尔格拉布(PVP)zuergelabu(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false},{"Id":"3bb25937235346d886e6657d42a6b63c","Name":"黑石山(PVP)","Identify":"7sgdm3","NameSpell":"hss(pvp)黑石山(PVP)heishishan(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false},{"Id":"efbebdd677e94e2b91d2d3236bcc3a44","Name":"流沙岗哨(PVP)","Identify":"t52v2h","NameSpell":"lsgs(pvp)流沙岗哨(PVP)liushagangshao(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false},{"Id":"9695f78437424f5cb2592f3167202bd6","Name":"甲虫之墙(PVP)","Identify":"6fhvcu","NameSpell":"jczq(pvp)甲虫之墙(PVP)jiachongzhiqiang(pvp)","CurrentLevelType":3,"IsClose":false,"ParentId":"af5a528b92344cd8aedb9c35bdaf26ec","ChildModels":null,"IsEnabled":false}]}}}

const DQ = [
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '奥罗', 'a887fd4253834330be65090655face44', '联盟'],
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '奥罗', 'c0cc0b7f2edf415396bec4928d8ceebd', '部落'],
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '沙尔图拉', 'd93b49b3021245f884a18bad886df0d1', '联盟'],
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '沙尔图拉', '2c0e64a1754940dc847141f937af6d81', '部落'],
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '水晶之牙', 'e7aa3e0eff9f4df5ab96bd3e520cc96d', '联盟'],
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '水晶之牙', 'd5a270972a0b4d338606ad82733d6652', '部落'],
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '霜语', '502f8f19893f40199d3535da9febed09', '联盟'],
  [ '一区', '61b65070243c4453b653fa82c8b39bd1', '霜语', 'c7b541fe1da146ea9ecd43dc8937240f', '部落'],
]

// let dq = []

// testTemp.StatusData.ResultData.GameOther.forEach(element => {
//   // console.log(element)
//   dq.push(['八区', element.Id, element.Name, element.Identify])
// });
// console.log(dq)

let shList = {}
let jsList = {}

DQ.forEach(element => {
  console.log(element)
  const url = `https://goods.dd373.com/Api/MallGoods/UserCenter/ListCoinIndexRecommendHotShop?LastId=${element[3]}&GoodsType=${element[1]}`
  console.log(url)
  var options = {
    'method': 'GET',
    'url': url,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const temp = JSON.parse(response.body)
    temp.StatusData.ResultData.forEach(element3 => {
      if (!shList[element[0] + element[2] + element[4]]) shList[element[0] + element[2] + element[4]] = []
      shList[element[0] + element[2] + element[4]].push([element[0], element[2], element[4], element3.Name, element3.Inventory.toFixed(2), element3.SingleUnit.toFixed(2), element3.SinglePrice.toFixed(2), (element3.SinglePrice * 0.97).toFixed(2)])
    });
    console.log(shList)
  });
  const url2 = `https://goods.dd373.com/Api/Receive/UserCenter/ListCoinIndexRecommendNeedReceive?LastId=${element[3]}&GoodsType=${element[1]}`
  console.log(url2)
  var options = {
    'method': 'GET',
    'url': url2,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const temp = JSON.parse(response.body)
    temp.StatusData.ResultData.forEach(element3 => {
      // console.log(element3.SingleUnit)
      if (!jsList[element[0] + element[2] + element[4]]) jsList[element[0] + element[2] + element[4]] = []
      jsList[element[0] + element[2] + element[4]].push([element[0], element[2], element[4], element3.Name, element3.Inventory.toFixed(2), element3.SingleUnit.toFixed(2), element3.SinglePrice.toFixed(2), (element3.SinglePrice * 0.97).toFixed(2)])
    })
  });
});


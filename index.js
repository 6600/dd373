var request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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

let returnList = []
var options = {
  'method': 'GET',
  'url': 'https://www.dd373.com/s-eja7u2-0r2mut-0acvkr-0-0-0-jk5sj0-0-0-0-0-0-1-0-0-0.html',
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  // console.log(response.body);
  const dom = new JSDOM(response.body);
  const dataList = dom.window.document.querySelectorAll(".goods-list-item")
  dataList.forEach(element => {
    let temp = []
    temp = temp.concat(element.querySelector('.game-qufu-value').textContent.split('/'))
    temp.push(element.querySelector('.goods-list-title').href.replace('/detail-', '').replace('.html', ''))
    const danjia = parseFloat(element.querySelector('.game-currency-price span').textContent.replace('￥', ''))
    temp.push(danjia)
    temp.push(element.querySelector('.kucun span').textContent)
    temp.push(danjia * 0.97)
    returnList.push(temp)
  });
  console.log(returnList)
});

// 网络请求封装
let that = this,
    CORS = `https://cors-anywhere.herokuapp.com/`,
    test = 'https://floor.huluxia.com',
    dev = 'https://tools.huluxia.com',
    data = {
      platform: 2,
      gkey: 440000,
      app_version: '3.5.0.88.3',
      versioncode: 20141400,
      market_id: 'floor_web'
    }
function Ajax(obj) {
  let origin = obj.data ? obj.data : data
  if (!obj.defalut) {
    for (let i in data) {
      origin[i] = data[i]
    }
  }
  wx.request({
    url: CORS+(obj.url ? obj.url : 'http://floor.huluxia.com'),
    method: obj.method ? obj.method.toUpperCase() : 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: origin,
    success(data) {
      wx.showLoading({
        title: '加载中..',
        mask: true
      })
      let asynC = setInterval(()=>{
        if (data.statusCode == 200) {
          clearInterval(asynC)
          obj.success(data.data)
          wx.hideLoading()
        }
      },100)
    },
    fail() {
      wx.showToast({
        title: "连接服务器失败"
      });
    }
  })
}
module.exports = {
  Ajax: Ajax,
  test: test,
  dev: dev,
  data: data
}
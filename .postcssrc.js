module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 如果检测到文件为vant的， 将它设置为1/10， 否则认为是设计稿中的样式长宽，将设置为1/20
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}

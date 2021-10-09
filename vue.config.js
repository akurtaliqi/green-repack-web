module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8081,
    // proxy: 'https://http://localhost:3000/api/product/',

  },
  transpileDependencies: [
    'vuetify',
  ],
  lintOnSave: false,
}

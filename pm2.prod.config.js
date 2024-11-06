module.exports = {
  apps: [
    {
      name: 'cms-server-prod',
      script: './dist/src/main.js',
      env: {
        PM2_SERVE_PATH: '.', // 静态服务路径
        PM2_SERVE_PORT: 3300, // 静态服务器访问端口
        NODE_ENV: 'production', // 设置开发环境运行时
      },

      instances: 'max', // 将应用程序分布在所有CPU核心上,可以是整数或负数
      watch: false, // 监听模式
      output: '../logs/cms/server/prod/out.log', // 指定日志标准输出文件及位置
      error: '../logs/cms/server/prod/error.log', // 错误输出日志文件及位置
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};

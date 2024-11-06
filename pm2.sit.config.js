module.exports = {
  apps: [
    {
      name: 'cms-server-sit',
      script: './dist/src/main.js',
      env: {
        PM2_SERVE_PATH: '.', // 静态服务路径
        PM2_SERVE_PORT: 3301, // 静态服务器访问端口
        NODE_ENV: 'sit', // 设置开发环境运行时
      },
      env_production: {
        NODE_ENV: '2', // 设置生产环境运行时
      },
      instances: 1, // 将应用程序分布在所有CPU核心上,可以是整数或负数
      watch: false, // 监听模式
      output: '../logs/cms/server/sit/out.log', // 指定日志标准输出文件及位置
      error: '../logs/cms/server/sit/error.log', // 错误输出日志文件及位置
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};

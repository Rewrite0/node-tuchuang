module.exports = {
  apps: [
    {
      name: 'node-tuchuang',
      script: 'app.js',
      autorestart: true,
      max_restarts: 5,
      min_uptime: '10s',
      restart_delay: 5000,
      out_file: 'logs/normal.log',
      error_file: 'logs/error.log',
      combine_logs: true,
    },
  ],
};
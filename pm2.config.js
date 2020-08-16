module.exports = {
  apps: [{
    name: 'app',
    script: 'lib/index.js',
    instances: 1,
    exec_mode: 'cluster',
  }],
}

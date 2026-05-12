module.exports = {
  proxy: 'http://localhost:3000',
  files: ['src/public/**/*', 'src/views/**/*'],
  port: 3001,
  open: false,
  notify: false,
};

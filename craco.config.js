const path = require('path');
const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@models': resolvePath('./src/models'),
      '@pages': resolvePath('./src/pages'),
      '@utils': resolvePath('./src/utils'),
      '@app': resolvePath('./src/app'),
      '@classes': resolvePath('./src/classes'),
      '@store': resolvePath('./src/store'),
      "@hooks": resolvePath('./src/hooks'),
      "@hoc": resolvePath('./src/hoc'),
      "@popups": resolvePath('./src/popups'),
      "@data": resolvePath('./src/data'),
      "@assets": resolvePath('./src/assets')
    }
  }
}

module.exports = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config;
  },
  // Увеличиваем таймаут сборки
  staticPageGenerationTimeout: 120,
  // Отключаем некоторые оптимизации для ускорения сборки
  swcMinify: false,
  reactStrictMode: false,
  // Увеличиваем лимит памяти
  experimental: {
    optimizeCss: false,
    optimizePackageImports: false,
  }
};

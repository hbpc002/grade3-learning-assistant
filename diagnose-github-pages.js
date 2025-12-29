#!/usr/bin/env node

// 🩺 GitHub Pages 问题诊断工具

const fs = require('fs');
const path = require('path');

console.log('🩺 诊断 GitHub Pages 部署问题...\n');

const checks = [
  {
    name: '检查 dist 目录是否存在',
    check: () => fs.existsSync('dist'),
    fix: '运行: npm run build'
  },
  {
    name: '检查 index.html 是否存在',
    check: () => fs.existsSync('dist/index.html'),
    fix: '检查构建过程是否成功'
  },
  {
    name: '检查 404.html 是否存在',
    check: () => fs.existsSync('dist/404.html'),
    fix: '运行: cp 404.html dist/'
  },
  {
    name: '检查 main.tsx 是否被正确引用',
    check: () => {
      const content = fs.readFileSync('dist/index.html', 'utf8');
      return content.includes('main.tsx') || content.includes('index-');
    },
    fix: '检查 vite.config.ts 的构建配置'
  },
  {
    name: '检查是否有 JS 文件生成',
    check: () => {
      const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
      return files.length > 0;
    },
    fix: '检查构建日志是否有错误'
  }
];

let allPassed = true;

checks.forEach((check, index) => {
  const passed = check.check();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${index + 1}. ${check.name}`);

  if (!passed) {
    console.log(`   💡 修复: ${check.fix}\n`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('✅ 所有检查通过！项目结构正常。');
  console.log('\n如果页面仍显示"正在加载"，可能是:');
  console.log('1. GitHub Pages 服务延迟 (等待1-2分钟)');
  console.log('2. 浏览器缓存问题 (清除缓存或使用无痕模式)');
  console.log('3. 网络问题 (尝试刷新页面)');
  console.log('\n🔧 快速修复命令:');
  console.log('./deploy-github-pages.sh');
} else {
  console.log('❌ 发现问题，请按提示修复');
  console.log('\n🔧 一键修复命令:');
  console.log('./deploy-github-pages.sh');
}

console.log('='.repeat(50));

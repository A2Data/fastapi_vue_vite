import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// 定义项目根目录的绝对路径
const ROOT_PATH = path.resolve(process.cwd());

// 获取指定相对路径的绝对路径
function resolvePath(...segments) {
  return path.resolve(ROOT_PATH, ...segments);
}

// 获取项目根目录的绝对路径
export function getRootPath() {
  return ROOT_PATH;
}

// 获取项目源码目录的绝对路径
export function getSrcPath(srcName = 'src') {
  return resolvePath(srcName);
}

// 转换环境变量，处理特定的环境变量类型
export function convertEnv(envOptions) {
  const result = {};
  if (!envOptions) return result;

  for (const envKey in envOptions) {
    let envVal = envOptions[envKey];
    switch (envKey) {
      case 'VITE_PORT':
        // 将字符串转换为数字
        result[envKey] = Number(envVal);
        break;
      default:
        // 如果环境变量的值是'true'或'false'，则转换为布尔值
        result[envKey] = ['true', 'false'].includes(envVal) ? envVal === 'true' : envVal;
    }
  }
  return result;
}

// 根据当前的运行模式（开发、生产等）来确定要读取的环境变量文件
function detectEnvFiles() {
  const script = process.env.npm_lifecycle_script;
  const modeMatch = script?.match(/--mode ([a-z_\\d]+)/);
  const mode = modeMatch?.[1] || 'production';
  return ['.env', '.env.local', `.env.${mode}`];
}

// 读取环境变量文件并返回与指定前缀匹配的环境变量
export function getEnvConfig(prefix = 'VITE_', confFiles = detectEnvFiles()) {
  let envConfig = {};

  // 遍历指定的环境变量文件列表
  confFiles.forEach((file) => {
    const filePath = resolvePath(file);
    if (fs.existsSync(filePath)) {
      try {
        // 解析文件中的环境变量并合并到envConfig对象中
        const env = dotenv.parse(fs.readFileSync(filePath));
        envConfig = { ...envConfig, ...env };
      } catch (error) {
        console.error(`解析文件 ${file} 出错`, error);
      }
    }
  });

  // 删除不匹配指定前缀的环境变量键
  const prefixRegEx = new RegExp(`^(${prefix})`);
  Object.keys(envConfig).forEach((key) => {
    if (!prefixRegEx.test(key)) {
      delete envConfig[key];
    }
  });

  return envConfig;
}

// 定义项目构建输出的目录名称
export const OUTPUT_DIR = 'dist'

// 定义代理配置，用于在开发模式下代理API请求

export const PROXY_CONFIG = {
  /**
   * @desc    替换匹配值
   * @请求路径  http://localhost:3100/api/user
   * @转发路径  http://localhost:8080/user
   */
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp('^/api'), ''),
  },
  /**
   * @desc    不替换匹配值
   * @请求路径  http://localhost:3100/api/v2/user
   * @转发路径  http://localhost:8080/api/v2/user
   */
  '/api/v2': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
  /**
   * @desc    替换部分匹配值
   * @请求路径  http://localhost:3100/api/v3/user
   * @转发路径  http://localhost:8080/user
   */
  '/api/v3': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp('^/api'), ''),
  },
}

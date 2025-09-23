import path from "node:path";
import fs from "node:fs";

// 文件根目录
const DIR_PATH = path.resolve();

// 根据目录生成：
// {
//   text: rootText,
//   items: [
//     { text: GroupNameFromPath, items: [ { text, link }, ... ] }
//   ]
// }
export const gen_group_section = (rootText, inputPathname) => {
  // 兼容传入 '/front-end/react' 或 'front-end/react'
  const pathname = inputPathname.replace(/^\/+/, '');
  const dirPath = path.join(DIR_PATH, pathname);

  if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
    console.warn(`[gen_group_section] 路径不存在或不是目录: ${dirPath}`);
    return { text: rootText, items: [] };
  }

  const files = fs.readdirSync(dirPath, { encoding: 'utf-8' });
  // 仅取 .md 文件
  const mdFiles = files.filter((f) => path.extname(f).toLowerCase() === '.md');

  const items = mdFiles.map((file) => {
     // 使用 decodeURIComponent 处理中文文件名
     const decodedFile = decodeURIComponent(file);
     const base = path.basename(decodedFile, '.md');
     const encodedBase = encodeURIComponent(base); // 对中文进行编码用于URL
      return {
        text: base,
        link: `/${pathname}/${encodedBase}`,
      };
    });

  // 从路径获取组名: 取最后一段并首字母大写（若是中文等非字母则原样返回）
  const lastSeg = pathname.split('/').filter(Boolean).pop() || '';
  const groupName = lastSeg
    ? lastSeg.charAt(0).toUpperCase() + lastSeg.slice(1)
    : pathname;

  return {
    text: rootText,
    items: [
      {
        text: groupName,
        items,
      },
    ],
  };
};

// utils/auto-gen-sidebar.mjs

/**
 * 生成包含多个子分组的侧边栏配置
 * @param {string} rootText - 根分组标题（如：'前端'）
 * @param {string[]} pathnames - 子分组的路径数组（如：['front-end/vue', 'front-end/react']）
 * @returns {Object} 返回VitePress侧边栏配置对象
 */
export const gen_multi_group_section = (rootText, pathnames) => {
  // 存储所有子分组
  const items = [];
  
  // 遍历每个路径
  for (const pathname of pathnames) {
    // 清理路径，移除开头的斜杠
    const cleanPath = pathname.replace(/^\/+/, '');
    const dirPath = path.join(DIR_PATH, cleanPath);
    
    // 检查路径是否存在且是目录
    if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
      console.warn(`[gen_multi_group_section] 路径不存在或不是目录: ${dirPath}`);
      continue;
    }
    
    // 读取目录下的所有文件
    const files = fs.readdirSync(dirPath);
    // 过滤出 .md 文件
    const mdFiles = files.filter((f) => path.extname(f) === '.md');
    
    // 为每个 .md 文件生成侧边栏项
    const subItems = mdFiles.map((file) => {
      const base = path.basename(file, '.md');
      return {
        text: base,  // 显示文本（不含 .md 后缀）
        link: `/${cleanPath}/${base}`,  // 生成链接
      };
    });
    
    // 从路径中提取分组名
    // 例如：'front-end/react' -> 'React'
    const lastSeg = cleanPath.split('/').filter(Boolean).pop() || '';
    const groupName = lastSeg
      ? lastSeg.charAt(0).toUpperCase() + lastSeg.slice(1)  // 首字母大写
      : cleanPath;
    
    // 将子分组添加到主分组
    items.push({
      text: groupName,  // 子分组名称（如 'Vue' 或 'React'）
      items: subItems,  // 子分组下的文档列表
      collapsible: true,  // 允许折叠
    });
  }
  
  // 返回完整的侧边栏配置
  return {
    text: rootText,  // 根分组标题（如 '前端'）
    items,  // 所有子分组
  };
};
// gen_multi_group_section('Echarts图示例', ['/pages/echarts/饼图', '/pages/echarts/line'])
import path from "node:path";
import fs from "node:fs";

/**
 * 生成包含多个子分组的侧边栏/导航配置
 * @param {string} rootText - 根分组标题（如：'前端'）
 * @param {string[]} pathnames - 子分组的路径数组（如：['front-end/vue', 'front-end/react']）
 * @param {boolean} useSubgroupFromPath - 是否以路径最后一段作为小标题（如：'/pages/echarts' -> 'Echarts'）
 * @returns {Object} 返回VitePress可用的分组配置对象
 */
export const gen_multi_group_section = (rootText, pathnames, useSubgroupFromPath = false) => {
  // 存储所有子分组或条目
  const items = [];
  
  // 遍历每个路径
  for (const pathname of pathnames) {
    // 清理路径，移除开头的斜杠
    const cleanPath = pathname.replace(/^\/+/, '');
    const dirPath = path.join(path.resolve(), cleanPath);
    
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
    
    if (useSubgroupFromPath) {
      // 以路径段作为小标题，生成可折叠子分组
      items.push({
        text: groupName,  // 子分组名称（如 'Vue'、'React' 或 'Echarts'）
        items: subItems,  // 子分组下的文档列表
        collapsible: true,  // 允许折叠
      });
    } else {
      // 不使用小标题：直接将条目平铺到根分组
      items.push(...subItems);
    }
  }
  
  // 返回完整的分组配置
  return {
    text: rootText,  // 根分组标题（如 '前端'）
    items,  // 所有子分组或条目
  };
};
// 示例：
// gen_multi_group_section('Echarts图示例', ['/pages/echarts'], true)
// gen_multi_group_section('前端', ['/pages/front-end/vue', '/pages/front-end/react'], true)
// gen_multi_group_section('优秀文章', ['/pages/excellent-article'], false)
# 巷里小馆

巷里小馆是一个基于 Vue 3 和 Vite 的在线点餐演示应用。完整、可构建的项目源代码位于 [`source/`](source/)，仓库根目录保留 GitHub Pages 正在提供的静态站点文件。

## 本地运行

```powershell
cd source
npm ci
npm run dev
```

## 更新线上静态站点

在 `source/` 目录执行：

```powershell
npm run release
```

该命令先构建 Vite 项目，再将生成的静态文件同步到仓库根目录。检查页面后，在仓库根目录提交并推送根目录的发布文件和 `source/` 源码，GitHub Pages 会继续从根目录发布。

## 项目边界

应用将购物篮、配送资料和订单演示记录保存在当前浏览器的 `localStorage`。它没有业务服务器、云端数据库、账号认证或真实支付渠道。

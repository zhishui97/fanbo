---
name: gitee-submit
description: 提交课堂实践项目到 Gitee 共享仓库。当用户说"提交项目""push""提交到 gitee""交作业"等时使用。流程：检查状态 → 先 pull 合并远程 → 提交本地改动 → push 到 origin/master。远程是老师 neusoft_wangyao_jsj 的共享仓库，严禁强推、严禁删除其他同学的文件夹。
---

# Gitee 项目提交

把 `E:\高级网页设计\webfanbo`（git 仓库根目录，包含 `24002120314 樊博/` 学生文件夹）的改动提交并推送到远程。

## 步骤

1. 查看当前改动：

   ```bash
   git -C "E:\高级网页设计\webfanbo" status --short
   ```

2. 先拉取远程最新内容并合并。远程是共享仓库，可能有其他同学的提交，**禁止 `push -f` 强推**：

   ```bash
   git -C "E:\高级网页设计\webfanbo" pull --no-rebase origin master
   ```

   如果出现冲突：保留双方内容，其他同学的文件夹绝对不能删，改完再提交。

3. 提交本次改动（提交信息用中文，写清楚改动内容）：

   ```bash
   git -C "E:\高级网页设计\webfanbo" add -A
   git -C "E:\高级网页设计\webfanbo" commit -m "提交课堂实践：<本次改动说明>"
   ```

4. 推送：

   ```bash
   git -C "E:\高级网页设计\webfanbo" push origin master
   ```

   若提示认证失败（系统凭据里没有令牌），改用带令牌的地址推送。令牌在 Gitee 个人设置 → 安全设置 → 私人令牌 中生成：

   ```bash
   git -C "E:\高级网页设计\webfanbo" push "https://<gitee账号>:<私人令牌>@gitee.com/neusoft_wangyao_jsj/webfanbo.git" master
   ```

5. 确认同步：

   ```bash
   git -C "E:\高级网页设计\webfanbo" status
   git -C "E:\高级网页设计\webfanbo" log --oneline -3
   ```

## 规则

- 私人令牌是隐私凭证，绝不能写进仓库里的任何文件或提交信息。
- `.claude/settings.local.json`（个人权限配置）已被 .gitignore 排除，不要取消排除。
- 推送前必须先 pull；远程有其他同学的文件夹时不要覆盖或删除。
- 仓库结构约定：每个学生一个「学号+姓名」文件夹放在仓库根目录，本项目对应 `24002120314 樊博/`。

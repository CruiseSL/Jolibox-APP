# Feature Log

记录每次功能改动和优化，便于追踪项目演进。

---

## 已完成

### 2026-03-03 — P0 & P1 优化

#### P0 修复

- [x] **修复提现规则占位符** — `WithdrawalRulesDialog.tsx` 中 `[xxx]` 替换为实际最低提现金额 `$4`
- [x] **修复游戏分类过滤** — `GameList.tsx` 移除 `Math.random()` 随机过滤，改为按 `category` 字段精确匹配
- [x] **替换异常分类名** — `home/page.tsx` 中标签从 `["All", "Battle", "Casual", "Alpinia oxyphylla"]` 改为 `["All", "Action", "Casual", "Puzzle"]`，与 Mock 数据中的实际分类对应

#### P1 优化

- [x] **新增 Toast 组件** — 创建 `components/ui/toast.tsx`，轻量级 Toast 提示（自动 2s 消失），通过 `ToastProvider` + `useToast` hook 全局可用
- [x] **为无响应按钮添加 Toast** — 涉及以下按钮点击后显示 "Coming soon" 或 "This is a demo ad"：
  - Spin & Win 横幅（`SpinBanner.tsx`）
  - DailyGoal "Go" 按钮（`DailyGoal.tsx`）
  - SplashAd "Install Now"（`SplashAd.tsx`）
  - FeedAdItem "Install Game"（`FeedAdItem.tsx`）
  - GameLaunchAd "Claim Offer"（`GameLaunchAd.tsx`）
  - Home 页搜索图标和 "Dramas" 标签（`home/page.tsx`）
  - ForYou 页搜索和历史按钮（`foryou/page.tsx`）
- [x] **抽取 StatusBar 共享组件** — 创建 `components/shared/StatusBar.tsx`，支持 `light`/`dark` 两种变体和自定义背景，替换了 4 个页面中的重复状态栏代码（Rewards、Home、Jolicoin、Cashback）
- [x] **抽取 TaskItem 共享组件** — 创建 `components/shared/TaskItem.tsx`，统一了 `BonusCard` 和 `TaskList` 中重复的任务项组件，支持 `compact` 模式、`bonusBadge`、`hideProgress` 等参数，使用 `LucideIcon` 类型替代 `any`
- [x] **统一余额数据管理** — 在 `MockStateContext` 中新增 `jolicoinBalance` 和 `cashbackBalance`，cashback 余额随 `withdrawalStatus` 状态自动切换（insufficient=$3.20 / sufficient=$6.00）。`HeaderStats`、`BalanceCard`、`BalanceHeader` 三个组件改为从 Context 读取，数值前后一致

### 2026-03-03 — P2 对齐设计稿

- [x] **BottomNav 标签修正** — "For You" 改为 "Video"，图标从 `LayoutGrid` 换为 `CirclePlay`，匹配设计稿
- [x] **广告插入位置修正** — 从每 3 个游戏插入一次广告，改为仅在第 6 个和第 30 个游戏后展示，匹配设计稿规范
- [x] **Leaderboard 卡片重构** — 移除底部 "Play" 按钮，改为排名展示行（奖杯图标 + 排名数字 + 绿色上升指标），匹配设计稿
- [x] **Video 页分类标签样式** — 游戏卡片中的分类文字从纯文本改为 pill 标签样式（半透明背景 + 圆角），匹配设计稿中 "Romantic" 标签效果

### 2026-03-03 — 全局布局自适应

- [x] **手机模拟器自适应屏幕高度** — `layout.tsx` 中将固定 344×882 容器改为 CSS `scale` 动态缩放，监听 `resize` 事件自动计算缩放比例，确保在任何屏幕上都能一屏完整展示。保留 40px 边距呼吸空间，缩放比例不超过 1（不放大）。外层增加 `rounded-[20px]` 圆角和 `ring` 边框模拟真实手机外观
- [x] **全局顶部间距收紧** — StatusBar 从 `py-3` 缩减为 `pt-1.5 pb-1`，字号 `text-xs`。Home 页 header sticky 偏移 `top-[22px]`，字号 `text-lg`，移除多余 padding。移除所有 `pt-safe-top` / `pb-safe`
- [x] **修复 scale 缩放后容器白色空白** — 外层 wrapper 宽高改为 `DESIGN_W * scale` / `DESIGN_H * scale`，`transformOrigin` 从 `center` 改为 `top left`，消除缩放后的布局空间差异

### 2026-03-03 — 游戏加载页重构（竖屏）

- [x] **分阶段加载流程** — 重构 `game/[id]/page.tsx`，实现完整的游戏加载体验：
  1. **0-2s**: 进度条从 0% 匀速增长到 60%，圆形头像外圈紫色进度环同步
  2. **1s 后**: 广告组件淡入展示（BannerAd）
  3. **2s 后**: 模拟加载失败，显示 "Loading failed" + "Try again" 按钮
  4. **3s 后**: 推荐游戏组件淡入展示（4 个推荐游戏），带 slide-in-from-bottom 动画，将上方内容顶上去
  5. **点击 Try again**: 进度从 60% 恢复增长到 100%，完成后跳转游戏页
- [x] **游戏头像改为圆形** — 匹配设计稿中的圆形头像 + 白色边框样式
- [x] **推荐游戏组件** — "Play games below instantly now!" 标题 + "We will continue loading [游戏名] in the background" 提示 + 4 列游戏网格
- [x] **加载页布局重构** — 改为全绝对定位布局（无滚动）：游戏信息通过 `top` transition 上移，广告固定中部不动，推荐游戏从底部滑入，Jolibox logo 固定底部。缩小头像（w-16）、进度环、文案尺寸，消除进度环与头像间隙

### 2026-03-03 — 横屏游戏加载页

- [x] **Game 数据新增 orientation 字段** — `mockGames.ts` 的 `Game` 接口新增可选字段 `orientation: "portrait" | "landscape"`，默认 portrait。Pokémon GO 设为 landscape 作为测试游戏
- [x] **横屏加载页布局** — 当 `game.orientation === "landscape"` 时渲染横屏布局：
  - 初始状态：游戏信息居中偏上
  - 广告出现：游戏信息向左平移至左侧（`left: 18%`），广告在右侧（`right: 4`）
  - 推荐游戏出现：游戏信息上移（`top: 10%`），推荐游戏在游戏信息下方展示
  - Jolibox logo 固定底部中央
- [x] **抽取共享子组件** — `ProgressRing` 和 `JoliboxWatermark` 提取为独立组件，竖屏/横屏复用
- [x] **模拟器横屏切换** — 横屏游戏加载时模拟器容器从 344×882 切换为 882×344，退出时恢复竖屏。移除 CSS `rotate(90deg)` hack，改为通过 `MockStateContext` 中的 `simulatorOrientation` 状态驱动 `layout.tsx` 动态切换容器尺寸和 scale 计算。`SimulatorShell` 组件从 Context 读取方向并带 `transition-all` 过渡动画

---

## 待处理

- [ ] Video 页高级功能（Auto 开关、底部进度条、Shop 按钮）— 属于游戏画面内容，暂不实现

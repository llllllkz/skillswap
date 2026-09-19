import type { SkillPost, User, SwapRequest, Review } from '@/types'

export const CURRENT_USER_ID = 'me'

export const seedUsers: User[] = [
  { id: 'me', name: '我', emoji: '🦊', color: '#f97316', title: '前端工程师 · 吉他爱好者', city: '上海', credit: 96, rating: 4.8, ratingCount: 6, taughtCount: 4, learnedCount: 2, tags: ['Python', '吉他'] },
  { id: 'u1', name: '林小满', emoji: '🎸', color: '#8b5cf6', title: '独立音乐人', city: '上海', credit: 98, rating: 4.9, ratingCount: 32, taughtCount: 41, learnedCount: 7, tags: ['吉他', '编曲'] },
  { id: 'u2', name: '陈一帆', emoji: '📷', color: '#0ea5e9', title: '商业摄影师', city: '杭州', credit: 95, rating: 4.7, ratingCount: 21, taughtCount: 18, learnedCount: 5, tags: ['人像摄影', 'Lightroom'] },
  { id: 'u3', name: '苏珊', emoji: '🗣️', color: '#10b981', title: '外企市场总监', city: '上海', credit: 99, rating: 5.0, ratingCount: 45, taughtCount: 52, learnedCount: 9, tags: ['英语口语', '演讲'] },
  { id: 'u4', name: '阿凯', emoji: '🍳', color: '#f43f5e', title: '私房菜主理人', city: '上海', credit: 92, rating: 4.6, ratingCount: 17, taughtCount: 23, learnedCount: 3, tags: ['川菜', '烘焙'] },
  { id: 'u5', name: 'Momo', emoji: '🎨', color: '#eab308', title: 'UI 设计师', city: '北京', credit: 94, rating: 4.8, ratingCount: 26, taughtCount: 15, learnedCount: 11, tags: ['Figma', '插画'] },
  { id: 'u6', name: '老周', emoji: '🏸', color: '#6366f1', title: '羽毛球教练', city: '上海', credit: 97, rating: 4.9, ratingCount: 58, taughtCount: 76, learnedCount: 2, tags: ['羽毛球', '体能训练'] },
  { id: 'u7', name: '何晓', emoji: '💻', color: '#14b8a6', title: '数据分析师', city: '深圳', credit: 93, rating: 4.5, ratingCount: 12, taughtCount: 9, learnedCount: 6, tags: ['Python', 'Excel'] },
  { id: 'u8', name: 'Yuki', emoji: '🌸', color: '#ec4899', title: '日语翻译', city: '上海', credit: 96, rating: 4.8, ratingCount: 19, taughtCount: 22, learnedCount: 8, tags: ['日语', '动漫'] },
  { id: 'u9', name: '大树', emoji: '🪵', color: '#84cc16', title: '木工手艺人', city: '苏州', credit: 91, rating: 4.7, ratingCount: 9, taughtCount: 6, learnedCount: 4, tags: ['木作', '皮具'] },
  { id: 'u10', name: '思思', emoji: '📊', color: '#f97316', title: '咨询顾问', city: '上海', credit: 95, rating: 4.6, ratingCount: 14, taughtCount: 11, learnedCount: 10, tags: ['PPT', '结构化表达'] },
  { id: 'u11', name: 'Allen', emoji: '🏊', color: '#06b6d4', title: '软件架构师', city: '上海', credit: 90, rating: 4.4, ratingCount: 8, taughtCount: 5, learnedCount: 7, tags: ['游泳', 'Java'] },
]

export const seedPosts: SkillPost[] = [
  // 我自己
  { id: 'p-me-1', userId: 'me', type: 'teach', title: 'Python 数据分析入门到实战', category: '编程', level: '进阶', description: '8 次课带你从 pandas 基础到完成一个真实数据项目，提供练习数据集与作业点评。', mode: 'online', city: '上海', durationMin: 60, priceCoins: 30, acceptSwap: true, wantsInReturn: ['吉他', '摄影'], createdAt: Date.now() - 86400000 * 2 },
  { id: 'p-me-2', userId: 'me', type: 'learn', title: '想学吉他弹唱（零基础）', category: '音乐', level: '入门', description: '目标是三个月内能完整弹唱 5 首歌，希望每周一次课，可以教你 Python 作为交换。', mode: 'both', city: '上海', durationMin: 60, priceCoins: 0, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 2 },
  { id: 'p-me-3', userId: 'me', type: 'learn', title: '想提升人像摄影构图', category: '摄影', level: '进阶', description: '已有微单，主要想学习人像布光与引导模特，线上看案例或线下实拍都可以。', mode: 'both', city: '上海', durationMin: 90, priceCoins: 20, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 1 },
  // 林小满
  { id: 'p1-t', userId: 'u1', type: 'teach', title: '吉他弹唱零基础速成', category: '音乐', level: '入门', description: '12 年教学经验，独创「三和弦起步法」，第一节课就能弹出完整歌曲。提供练习吉他。', mode: 'both', city: '上海', durationMin: 60, priceCoins: 40, acceptSwap: true, wantsInReturn: ['Python', '编程'], createdAt: Date.now() - 86400000 * 5 },
  { id: 'p1-l', userId: 'u1', type: 'learn', title: '想用 Python 做演出数据统计', category: '编程', level: '入门', description: '想把各平台演出和粉丝数据自动汇总成报表，完全零基础，希望手把手带。', mode: 'online', city: '上海', durationMin: 60, priceCoins: 30, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 3 },
  // 陈一帆
  { id: 'p2-t', userId: 'u2', type: 'teach', title: '人像摄影布光与构图实战', category: '摄影', level: '进阶', description: '商业摄影师带实拍，影棚+外景各一次，教你用一支灯打出杂志感。', mode: 'offline', city: '杭州', durationMin: 120, priceCoins: 60, acceptSwap: true, wantsInReturn: ['英语', '设计'], createdAt: Date.now() - 86400000 * 4 },
  { id: 'p2-l', userId: 'u2', type: 'learn', title: '想练英语口语（商务场景）', category: '外语', level: '进阶', description: '经常要接待国外客户，想练商务口语和 presentation，周末线上最佳。', mode: 'online', city: '杭州', durationMin: 45, priceCoins: 35, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 2 },
  // 苏珊
  { id: 'p3-t', userId: 'u3', type: 'teach', title: '外教级商务英语口语陪练', category: '外语', level: '进阶', description: '10 年外企经验，模拟真实会议、谈判、汇报场景，附赠发音纠正和表达模板。', mode: 'online', city: '上海', durationMin: 45, priceCoins: 45, acceptSwap: true, wantsInReturn: ['川菜', '烹饪'], createdAt: Date.now() - 86400000 * 6 },
  { id: 'p3-l', userId: 'u3', type: 'learn', title: '想学几道拿手的川菜', category: '烹饪', level: '入门', description: '想学麻婆豆腐、回锅肉这类家常菜，厨房小白，希望线下手把手教。', mode: 'offline', city: '上海', durationMin: 120, priceCoins: 40, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 1 },
  // 阿凯
  { id: 'p4-t', userId: 'u4', type: 'teach', title: '川菜家常菜私厨课', category: '烹饪', level: '入门', description: '在我家厨房上课，一次学会 3 道菜，食材我包，学完直接开吃。', mode: 'offline', city: '上海', durationMin: 120, priceCoins: 50, acceptSwap: true, wantsInReturn: ['英语', '摄影'], createdAt: Date.now() - 86400000 * 7 },
  // Momo
  { id: 'p5-t', userId: 'u5', type: 'teach', title: 'Figma  UI 设计入门', category: '设计', level: '入门', description: '从零到做出第一个 App 界面，讲设计规范、组件库和作品集搭建。', mode: 'online', city: '北京', durationMin: 90, priceCoins: 40, acceptSwap: true, wantsInReturn: ['摄影', '编程'], createdAt: Date.now() - 86400000 * 3 },
  { id: 'p5-l', userId: 'u5', type: 'learn', title: '想学手机摄影和调色', category: '摄影', level: '入门', description: '想提升日常记录和旅行出片率，主要用手机拍摄。', mode: 'online', city: '北京', durationMin: 60, priceCoins: 25, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 2 },
  // 老周
  { id: 'p6-t', userId: 'u6', type: 'teach', title: '羽毛球步伐与发力纠正', category: '运动', level: '进阶', description: '国家二级运动员，针对业余爱好者常见错误动作做纠正，球场可约在浦东。', mode: 'offline', city: '上海', durationMin: 90, priceCoins: 55, acceptSwap: true, wantsInReturn: ['Python', 'Excel'], createdAt: Date.now() - 86400000 * 8 },
  { id: 'p6-l', userId: 'u6', type: 'learn', title: '想用 Excel 管理学员排课', category: '职场', level: '入门', description: '学员多了排课很乱，想学 Excel 排课表和简单的数据统计。', mode: 'online', city: '上海', durationMin: 60, priceCoins: 20, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 2 },
  // 何晓
  { id: 'p7-t', userId: 'u7', type: 'teach', title: 'Excel 自动化与可视化', category: '职场', level: '进阶', description: '教你用函数、透视表和一点 VBA 把周报从 2 小时缩到 10 分钟。', mode: 'online', city: '深圳', durationMin: 60, priceCoins: 30, acceptSwap: true, wantsInReturn: ['羽毛球', '英语'], createdAt: Date.now() - 86400000 * 4 },
  { id: 'p7-l', userId: 'u7', type: 'learn', title: '想学羽毛球（会一点）', category: '运动', level: '入门', description: '会打但动作不标准，想系统学步伐和发力，周末可以线下。', mode: 'offline', city: '上海', durationMin: 90, priceCoins: 0, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 1 },
  // Yuki
  { id: 'p8-t', userId: 'u8', type: 'teach', title: '日语零基础到 N4 陪伴计划', category: '外语', level: '入门', description: '专业翻译带你用动漫和日剧学日语，每次课都有跟读练习和打卡反馈。', mode: 'online', city: '上海', durationMin: 60, priceCoins: 35, acceptSwap: true, wantsInReturn: ['设计', '烹饪'], createdAt: Date.now() - 86400000 * 5 },
  // 大树
  { id: 'p9-t', userId: 'u9', type: 'teach', title: '木作入门：做一个自己的勺子', category: '手工', level: '入门', description: '工作室在苏州，工具木料全包，一下午带走自己做的木勺，非常解压。', mode: 'offline', city: '苏州', durationMin: 180, priceCoins: 70, acceptSwap: true, wantsInReturn: ['摄影'], createdAt: Date.now() - 86400000 * 9 },
  // 思思
  { id: 'p10-t', userId: 'u10', type: 'teach', title: '咨询级 PPT 与结构化表达', category: '职场', level: '进阶', description: '前 MBB 顾问，教你金字塔原理和咨询式排版，适合经常做汇报的职场人。', mode: 'online', city: '上海', durationMin: 90, priceCoins: 50, acceptSwap: true, wantsInReturn: ['Python'], createdAt: Date.now() - 86400000 * 3 },
  { id: 'p10-l', userId: 'u10', type: 'learn', title: '想学 Python 处理调研数据', category: '编程', level: '入门', description: '咨询项目里大量问卷数据想自动化处理，希望实战导向教学。', mode: 'online', city: '上海', durationMin: 60, priceCoins: 30, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 1 },
  // Allen
  { id: 'p11-t', userId: 'u11', type: 'teach', title: '游泳蛙泳零基础包会', category: '运动', level: '入门', description: '持救生员证，耐心型教学，4 次课包会蛙泳，场馆在静安。', mode: 'offline', city: '上海', durationMin: 60, priceCoins: 45, acceptSwap: true, wantsInReturn: ['吉他', '摄影'], createdAt: Date.now() - 86400000 * 6 },
  { id: 'p11-l', userId: 'u11', type: 'learn', title: '想学吉他指弹', category: '音乐', level: '进阶', description: '有弹唱基础，想转向指弹，学《天空之城》这类曲子。', mode: 'both', city: '上海', durationMin: 60, priceCoins: 40, acceptSwap: true, wantsInReturn: [], createdAt: Date.now() - 86400000 * 2 },
]

export const seedSwaps: SwapRequest[] = [
  { id: 's1', fromUserId: 'u6', toUserId: 'me', teachPostId: 'p-me-1', givePostId: undefined, payCoins: 30, message: '你好！看到你的 Python 课，我想给学员做排课数据统计，可以约这周末线上吗？', status: 'pending', createdAt: Date.now() - 3600000 * 5 },
  { id: 's2', fromUserId: 'u8', toUserId: 'me', teachPostId: 'p-me-1', givePostId: undefined, payCoins: 30, message: '想用日语课换你的 Python 入门～我妹妹也想一起听可以吗？', status: 'pending', createdAt: Date.now() - 3600000 * 26 },
  { id: 's3', fromUserId: 'me', toUserId: 'u1', teachPostId: 'p1-t', givePostId: 'p-me-1', payCoins: 0, message: '你好小满！我用 Python 数据分析课换你的吉他弹唱课，正好你想学 Python 做演出统计，完美互补！', status: 'accepted', createdAt: Date.now() - 86400000 * 1 },
  { id: 's4', fromUserId: 'u10', toUserId: 'me', teachPostId: 'p-me-1', givePostId: 'p10-t', payCoins: 0, message: 'Python 换 PPT 表达课，互不花钱，我已接受，期待第一课！', status: 'done', createdAt: Date.now() - 86400000 * 4 },
]

export const seedReviews: Review[] = [
  { id: 'r1', swapId: 's4', fromUserId: 'me', toUserId: 'u10', score: 5, comment: '思思的 PPT 课太值了，金字塔原理一讲就通，改了我的汇报模板直接被老板夸。', skillTitle: '咨询级 PPT 与结构化表达', createdAt: Date.now() - 86400000 * 3 },
  { id: 'r2', swapId: 's4', fromUserId: 'u10', toUserId: 'me', score: 5, comment: '讲得很细，pandas 作业点评特别认真，已经能自己处理问卷数据了！', skillTitle: 'Python 数据分析入门到实战', createdAt: Date.now() - 86400000 * 3 },
  { id: 'r3', swapId: 'x1', fromUserId: 'u3', toUserId: 'u1', score: 5, comment: '小满老师第一节课就让我弹出了《晴天》，太有成就感了！', skillTitle: '吉他弹唱零基础速成', createdAt: Date.now() - 86400000 * 10 },
  { id: 'r4', swapId: 'x2', fromUserId: 'u1', toUserId: 'u3', score: 5, comment: '苏珊的口语课像真实会议现场，三周下来开会敢抢话了。', skillTitle: '外教级商务英语口语陪练', createdAt: Date.now() - 86400000 * 8 },
]

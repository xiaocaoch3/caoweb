export type ProjectCategory = "product" | "hardware" | "research";

export interface ProjectSection {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  titleEn?: string;
  category: ProjectCategory;
  year: string;
  role: string;
  summary: string;
  cover: string;
  featured: boolean;
  overview: string;
  background: string;
  goals: string[];
  responsibilities: string[];
  problem: string;
  insights: string[];
  analysis: ProjectSection[];
  solutions: string[];
  flow: string[];
  prototypes: ProjectSection[];
  results: string[];
  reflections: string[];
}

export const projects: Project[] = [
  {
    slug: "focus-workspace",
    title: "专注工作台",
    titleEn: "Focus Workspace",
    category: "product",
    year: "2026",
    role: "产品经理 · 0→1",
    summary: "把散落在多个工具里的目标、任务与复盘，整合成可持续的个人工作流。",
    cover: "amber",
    featured: true,
    overview:
      "一款面向高频知识工作者的轻量工作台。我从用户访谈出发，完成机会识别、需求优先级、核心流程、原型验证与版本规划。",
    background:
      "用户每天在待办、日历、文档和即时通讯之间频繁切换。工具越多，信息越完整，但“今天真正要推进什么”反而更模糊。",
    goals: ["降低任务切换成本", "让目标与日常行动建立关联", "形成轻量、可持续的复盘闭环"],
    responsibilities: ["主导用户研究与需求定义", "搭建信息架构和核心流程", "协同设计与研发完成 MVP 规划", "制定上线指标与迭代节奏"],
    problem:
      "问题不在于用户缺少记录工具，而在于记录、执行和反馈分散。产品需要在不增加维护负担的前提下，帮助用户建立行动上下文。",
    insights: [
      "用户最需要的不是更多功能，而是一个可信赖的今日视图。",
      "目标必须能被拆到具体行动，否则只会变成低频查看的装饰。",
      "复盘输入应尽量由系统自动生成，用户只补充判断。",
    ],
    analysis: [
      { title: "场景拆解", description: "围绕晨间规划、工作切换、临时插单、晚间回顾四个高频时刻建立场景地图。" },
      { title: "机会排序", description: "使用用户价值、业务价值、实现成本三维评分，确定 MVP 边界。" },
      { title: "指标设计", description: "以次周留存、计划完成率和复盘触发率衡量工作流是否成立。" },
    ],
    solutions: [
      "以“今日舱”聚合目标、日程和三项关键任务。",
      "用上下文卡片保留任务相关文档、协作者与最近进展。",
      "自动生成周度行动轨迹，帮助用户用最少输入完成复盘。",
    ],
    flow: ["设定阶段目标", "系统建议本周行动", "选择今日关键任务", "专注执行与记录", "生成复盘摘要"],
    prototypes: [
      { title: "今日舱", description: "把最重要的信息压缩到一屏，默认只呈现三项关键任务。" },
      { title: "上下文抽屉", description: "不离开当前任务即可查看资料、记录阻塞并同步进展。" },
      { title: "复盘仪表", description: "用行动分布而非完成数量，帮助用户判断精力是否投入正确方向。" },
    ],
    results: ["完成 12 位目标用户访谈与 2 轮可用性测试", "核心流程任务成功率由 67% 提升至 91%", "形成 MVP 范围与三个迭代阶段的产品路线图"],
    reflections: ["进一步验证长期使用中的提醒疲劳", "为不同工作类型提供更灵活的今日视图", "将定性反馈与行为数据结合，校准留存假设"],
  },
  {
    slug: "ambient-desk-hub",
    title: "环境感知桌面中枢",
    titleEn: "Ambient Desk Hub",
    category: "hardware",
    year: "2025",
    role: "硬件产品经理",
    summary: "围绕桌面专注场景，定义一款兼顾环境感知、轻交互与隐私的软硬件产品。",
    cover: "teal",
    featured: false,
    overview:
      "从真实桌面场景切入，定义硬件形态、传感器能力、交互反馈和配套应用，并在成本、功耗与体验之间做系统权衡。",
    background:
      "用户希望了解环境是否适合长时间工作，却不愿再增加一个需要持续操作和维护的屏幕设备。",
    goals: ["用环境反馈帮助用户建立更健康的工作节奏", "降低设备存在感和学习成本", "在隐私与智能感知间取得平衡"],
    responsibilities: ["场景研究与产品定义", "功能规格与优先级", "软硬件交互流程", "工程约束与成本权衡"],
    problem:
      "硬件产品不能只堆叠传感能力。如何把有限的检测能力转译成可信、低打扰且有行动意义的反馈，是核心产品问题。",
    insights: ["桌面设备的价值发生在余光，而不是持续注视。", "用户接受环境传感器，但对摄像头高度敏感。", "灯光反馈比通知更适合表达可被忽略的状态。"],
    analysis: [
      { title: "需求边界", description: "聚焦光照、温湿度、噪声与久坐时长，不引入图像采集。" },
      { title: "工程约束", description: "围绕传感器精度、采样频率、功耗和 BOM 成本建立取舍表。" },
      { title: "生态角色", description: "硬件负责即时反馈，应用负责趋势解释与个性化设置。" },
    ],
    solutions: ["环形柔光表达环境综合状态", "敲击和旋转构成两种零学习成本交互", "本地完成数据计算，仅同步用户主动开启的趋势数据"],
    flow: ["设备自动感知", "本地计算状态", "柔光给出轻反馈", "用户按需查看原因", "应用提供改善建议"],
    prototypes: [
      { title: "状态光环", description: "用亮度、色温和节奏表达不同状态，避免复杂颜色编码。" },
      { title: "旋钮交互", description: "旋转切换状态维度，按压确认专注时段。" },
      { title: "趋势页", description: "将传感数据转译为可行动的改善建议，而非堆叠图表。" },
    ],
    results: ["完成两轮外观与交互原型", "在目标成本内收敛核心传感器组合", "建立 PRD、状态机与软硬件联调清单"],
    reflections: ["真实办公环境中的误判仍需更长周期测试", "后续应强化异常状态的可解释性", "将隐私承诺转化为用户可感知的硬件设计"],
  },
  {
    slug: "smart-device-research",
    title: "智能桌面设备机会研究",
    titleEn: "Smart Device Research",
    category: "research",
    year: "2025",
    role: "产品研究 · 策略",
    summary: "从用户任务而非品类参数出发，识别智能桌面设备的差异化机会。",
    cover: "rose",
    featured: false,
    overview:
      "围绕目标用户、关键任务、竞品格局和技术趋势展开研究，输出机会地图、产品策略与验证建议。",
    background:
      "同类产品普遍围绕参数和连接能力竞争，却难以形成稳定使用习惯。团队需要判断下一个版本应继续扩展能力，还是收缩到明确场景。",
    goals: ["梳理用户未被满足的高频任务", "识别竞品同质化与空白地带", "形成可验证的产品机会方向"],
    responsibilities: ["桌面研究与竞品框架", "用户访谈和信息归纳", "机会地图与策略建议", "验证计划设计"],
    problem:
      "市场供给丰富并不等于需求被满足。需要区分“看起来智能”的演示能力与真正能持续创造价值的日常任务。",
    insights: ["用户更关注减少分心，而非增加信息入口。", "跨设备协同价值取决于连续性，不取决于连接数量。", "隐私感知与设备摆放位置高度相关。"],
    analysis: [
      { title: "竞品地图", description: "按主动操作程度与环境理解能力建立二维定位，观察品类聚集区。" },
      { title: "任务聚类", description: "将访谈内容归纳为进入状态、维持节奏、恢复上下文三类核心任务。" },
      { title: "机会评估", description: "结合需求强度、替代方案、技术成熟度和组织能力筛选方向。" },
    ],
    solutions: ["优先探索低打扰的环境反馈", "把跨设备协同收敛到上下文恢复", "通过可见的隐私机制建立信任"],
    flow: ["定义研究问题", "扫描市场与技术", "访谈并聚类任务", "形成机会假设", "设计低成本验证"],
    prototypes: [
      { title: "机会地图", description: "把竞品位置、用户痛点和能力空白放在同一张图中讨论。" },
      { title: "概念卡片", description: "用统一结构描述目标用户、使用时刻、价值主张和关键风险。" },
      { title: "验证路线", description: "从假门测试到情境原型，逐步提高证据成本。" },
    ],
    results: ["覆盖 18 款竞品与 8 位目标用户", "收敛出 3 个机会方向和优先验证顺序", "研究结论进入下一阶段概念设计"],
    reflections: ["需持续跟踪技术能力变化对机会窗口的影响", "样本应增加不同办公形态用户", "下一阶段用行为实验验证口头偏好"],
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  product: "互联网产品",
  hardware: "硬件产品",
  research: "产品研究",
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

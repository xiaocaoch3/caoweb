export const profileContent = {
  photoAlt: "个人照片占位",
  education: [
    {
      period: "20XX — 20XX",
      school: "学校名称 · 专业名称",
      detail: "在这里补充学位、主修方向或与你目标岗位相关的课程。",
    },
  ],
  practice: [
    {
      period: "20XX.XX — 20XX.XX",
      organization: "公司 / 团队名称",
      role: "产品相关岗位",
      detail: "用一句话概括你负责的问题、采取的行动和产生的结果。",
    },
    {
      period: "20XX.XX — 20XX.XX",
      organization: "实践项目 / 校园组织",
      role: "项目角色",
      detail: "补充一次能体现协作、研究或落地能力的实践经历。",
    },
  ],
  skills: ["用户研究", "需求分析", "产品策略", "原型设计", "数据分析", "软硬件协同"],
};

export type ArchiveFolder = {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  year: string;
  role: string;
  summary: string;
  work: string[];
  result: string;
  position: { x: string; y: string };
};

export const archiveFolders: ArchiveFolder[] = [
  {
    id: "strategy",
    code: "FILE 01",
    title: "体验策略档案",
    titleEn: "Experience Strategy",
    year: "20XX",
    role: "产品策略 / 用户体验",
    summary: "围绕一个真实使用场景，识别问题并把洞察转化为可落地的产品方向。",
    work: ["梳理用户任务与关键痛点", "定义产品机会与优先级", "协同设计和研发推进验证"],
    result: "在这里填写项目结果、数据变化或最终交付物。",
    position: { x: "56.4%", y: "44.5%" },
  },
  {
    id: "hardware",
    code: "FILE 02",
    title: "软硬件协同档案",
    titleEn: "Hardware Collaboration",
    year: "20XX",
    role: "硬件产品 / 项目推进",
    summary: "从使用场景出发，在体验、成本、工程约束之间完成产品定义。",
    work: ["拆解核心场景与功能边界", "整理硬件规格和交互状态", "跟进样机测试与问题闭环"],
    result: "在这里填写样机、版本节点或跨团队协作成果。",
    position: { x: "57.5%", y: "44.5%" },
  },
  {
    id: "research",
    code: "FILE 03",
    title: "研究洞察档案",
    titleEn: "Research Notes",
    year: "20XX",
    role: "用户研究 / 产品分析",
    summary: "通过用户、市场和竞品研究，把零散信息组织成清晰的判断依据。",
    work: ["制定研究问题与样本计划", "归纳行为模式与机会点", "输出策略建议和验证路径"],
    result: "在这里填写研究覆盖范围和被采纳的关键结论。",
    position: { x: "58.6%", y: "44.5%" },
  },
];

export type InterestItem = {
  id: string;
  title: string;
  label: string;
  icon: "bike" | "swim" | "badminton" | "run" | "fitness" | "yoga" | "camera" | "microphone";
  summary: string;
  position: { x: string; y: string };
};

export const interestItems: InterestItem[] = [
  { id: "bike", title: "骑行", label: "自行车", icon: "bike", summary: "用稳定的节奏观察城市，也训练长距离目标下的耐心与规划。", position: { x: "35%", y: "58%" } },
  { id: "swim", title: "游泳", label: "泳镜与泳帽", icon: "swim", summary: "在水中专注呼吸和动作，让我重新获得安静、连续的注意力。", position: { x: "25%", y: "68%" } },
  { id: "badminton", title: "羽毛球", label: "羽毛球拍", icon: "badminton", summary: "快速判断、即时反馈和与搭档配合，是我喜欢这项运动的原因。", position: { x: "31%", y: "72%" } },
  { id: "run", title: "跑步", label: "跑鞋", icon: "run", summary: "把大目标拆成一次次出发，用可感知的进步保持长期行动。", position: { x: "34%", y: "81%" } },
  { id: "fitness", title: "力量训练", label: "健身器材", icon: "fitness", summary: "记录训练、调整动作并持续复盘，是另一种产品式的自我迭代。", position: { x: "50%", y: "68%" } },
  { id: "yoga", title: "瑜伽", label: "瑜伽垫", icon: "yoga", summary: "放慢呼吸、感受身体状态，也为高密度的工作留出恢复空间。", position: { x: "39%", y: "68%" } },
  { id: "camera", title: "摄影", label: "相机", icon: "camera", summary: "通过构图和光线留意被忽略的细节，也练习更准确地表达观察。", position: { x: "70%", y: "33%" } },
  { id: "microphone", title: "表达", label: "话筒", icon: "microphone", summary: "把复杂问题讲清楚，尝试用更有结构、也更有人情味的方式沟通。", position: { x: "65%", y: "32%" } },
];

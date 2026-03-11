import { Injectable, OnModuleInit } from '@nestjs/common';

/**
 * Mock Database Service
 * 模拟数据库服务（用于快速原型开发，无需真实数据库）
 */
@Injectable()
export class MockDatabaseService implements OnModuleInit {
  // 模拟数据仓库
  private readonly strategies: any[] = [];
  private readonly segments: any[] = [];
  private readonly kpis: any[] = [];
  private readonly keyMessages: any[] = [];
  private readonly contentMappings: any[] = [];
  private readonly barriers: any[] = [];
  private readonly hcpBarriers: any[] = [];
  private readonly nbaRecommendations: any[] = [];
  private readonly hcpInternal: any[] = [];

  async onModuleInit() {
    console.log('📝 初始化模拟数据库...');
    this.initializeMockData();
    console.log('✅ 模拟数据库初始化完成');
  }

  /**
   * 初始化模拟数据
   */
  private initializeMockData() {
    // 1. 创建替尔泊肽品牌策略
    const strategy = {
      id: 'strategy-1',
      brandName: '替尔泊肽',
      strategyName: '2025 Q1 替尔泊肽市场策略',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      targetDrugs: [{ name: '替尔泊肽' }],
      indications: [{ name: '2 型糖尿病' }, { name: '肥胖' }],
      competitors: [{ name: '司美格鲁肽 (诺和泰)' }, { name: '度拉糖肽 (度易达)' }],
      status: 'active',
      version: 1,
      createdAt: new Date(),
    };
    this.strategies.push(strategy);

    // 2. 创建 4 个观念阶梯层级（替尔泊肽领域）
    const segments = [
      {
        id: 'segment-1',
        strategyId: strategy.id,
        segmentName: '传统治疗型医生',
        cognitionLevel: '传统治疗型',
        hcpDescription: '依赖口服降糖药，对注射制剂有顾虑，担心低血糖和体重增加',
        priority: 1,
      },
      {
        id: 'segment-2',
        strategyId: strategy.id,
        segmentName: 'GLP-1 认知型医生',
        cognitionLevel: 'GLP-1 认知型',
        hcpDescription: '接受 GLP-1 受体激动剂，但单靶点思维，对双靶点机制不了解',
        priority: 2,
      },
      {
        id: 'segment-3',
        strategyId: strategy.id,
        segmentName: '双靶点认同型医生',
        cognitionLevel: '双靶点认同型',
        hcpDescription: '理解 GIP/GLP-1 双靶点协同优势，关注血糖和体重双重获益',
        priority: 3,
      },
      {
        id: 'segment-4',
        strategyId: strategy.id,
        segmentName: '积极处方型医生',
        cognitionLevel: '积极处方型',
        hcpDescription: '已积极处方替尔泊肽，关注个体化治疗方案优化',
        priority: 4,
      },
    ];
    this.segments.push(...segments);

    // 3. 创建 KPI
    const kpis = [
      {
        id: 'kpi-1',
        strategyId: strategy.id,
        dimension: '会议讲者',
        statistic: '次数',
        targetValue: 10,
        hcpClass: 'A',
      },
      {
        id: 'kpi-2',
        strategyId: strategy.id,
        dimension: '覆盖率',
        statistic: '比例',
        targetValue: 85,
      },
    ];
    this.kpis.push(...kpis);

    // 4. 创建障碍点字典
    const barriers = [
      {
        id: 'barrier-1',
        strategyId: strategy.id,
        segmentId: segments[0].id,
        barrierName: '不考虑注射制剂',
        barrierCategory: '认知局限',
        barrierDescription: '医生依赖口服药，对注射制剂有顾虑',
        severity: 'high',
        cognitionLevel: '传统治疗型',
        isCrossCutting: false,
      },
      {
        id: 'barrier-2',
        strategyId: strategy.id,
        barrierName: '三通道机制理解不深',
        barrierCategory: '理解不足',
        barrierDescription: '医生对替尔泊肽三通道机制有初步认知，但理解不够深入',
        severity: 'medium',
        cognitionLevel: null,
        isCrossCutting: true,
        suggestedActions: [
          {
            action_type: 'visit',
            content: '深入讲解三通道机制',
            talking_points: [
              'GIP/GLP-1 双受体激动剂机制详解',
              '三通道带来的血糖 + 体重 + 食欲三重获益',
            ],
          },
        ],
      },
      {
        id: 'barrier-3',
        strategyId: strategy.id,
        barrierName: '缺乏与患者沟通的学术话术',
        barrierCategory: '工具不足',
        barrierDescription: '医生缺乏可以给患者看的资料',
        severity: 'medium',
        cognitionLevel: null,
        isCrossCutting: true,
      },
    ];
    this.barriers.push(...barriers);

    // 5. 创建示例医生
    const hcps = [
      {
        hcpId: '1',
        name: '王存川',
        title: '主任医师',
        hospitalName: '暨南大学附属第一医院',
        department: '肥胖与代谢病外科',
        city: '广州市',
        province: '广东省',
        hcpClass: 'A',
      },
      {
        hcpId: '2',
        name: '李玲',
        title: '主任医师',
        hospitalName: '中国医科大学附属盛京医院',
        department: '内分泌科',
        city: '沈阳市',
        province: '辽宁省',
        hcpClass: 'A',
      },
      {
        hcpId: '3',
        name: '武晓泓',
        title: '主任医师',
        hospitalName: '浙江省人民医院',
        department: '内分泌科',
        city: '杭州市',
        province: '浙江省',
        hcpClass: 'B',
      },
      {
        hcpId: '4',
        name: '徐潮',
        title: '主任医师',
        hospitalName: '山东省立医院',
        department: '内分泌科',
        city: '济南市',
        province: '山东省',
        hcpClass: 'B',
      },
      {
        hcpId: '5',
        name: '孟化',
        title: '主任医师',
        hospitalName: '中日友好医院',
        department: '普外科代谢减重中心',
        city: '北京市',
        province: '北京市',
        hcpClass: 'A',
      },
      {
        hcpId: '6',
        name: '黄庆先',
        title: '主治医师',
        hospitalName: '山东大学齐鲁第三医院',
        department: '内分泌科',
        city: '青岛市',
        province: '山东省',
        hcpClass: 'B',
      },
    ];
    this.hcpInternal.push(...hcps);

    // 6. 创建示例 NBA 推荐
    const nba = [
      {
        id: 'nba-1',
        hcpId: '6', // 黄庆先
        strategyId: strategy.id,
        segmentId: segments[2].id, // EOS 型
        barrierIds: ['barrier-2', 'barrier-3'],
        actionType: 'visit',
        actionTitle: '替尔泊肽三通道机制深度解读',
        actionReason: '医生在问诊中已主动向患者提及"三通道"概念，但解释较简略',
        talkingPoints: [
          'GIP/GLP-1 双受体激动剂机制详解，补充医生"三通道"认知',
          '三通道机制带来的血糖 + 体重 + 食欲三重获益数据',
          '相比单通道 GLP-1RA 的差异化优势临床证据',
        ],
        priority: 1,
        status: 'pending',
        source: 'barrier_analysis',
        isNew: true,
        isAutoAdjusted: true,
        generatedAt: new Date(),
      },
      {
        id: 'nba-2',
        hcpId: '6',
        strategyId: strategy.id,
        segmentId: segments[2].id,
        barrierIds: ['barrier-3'],
        actionType: 'content_delivery',
        actionTitle: '企业微信推送三通道机制视频',
        actionReason: '医生对 GIP 通路获益认知不深',
        talkingPoints: [
          'GIP 通路在食欲调节和脂肪代谢中的独特作用',
          '三通道协同效应演示',
          '可用于患者教育',
        ],
        priority: 2,
        status: 'pending',
        source: 'feedback_generated',
        isNew: true,
        isAutoAdjusted: false,
        generatedAt: new Date(),
      },
    ];
    this.nbaRecommendations.push(...nba);

    // 7. 创建 HCP 障碍点实例
    const hcpBarriers = [
      {
        id: 'hcp-barrier-1',
        hcpId: '6',
        sourceBarrierId: 'barrier-2',
        barrierName: '三通道机制理解不深',
        barrierDescription: '医生对 GIP 通路获益感兴趣但不太清楚',
        source: 'ai_detected',
        confidence: 0.85,
        cognitionLevelAtDetection: '双靶点认同型',
        status: 'active',
        createdAt: new Date(),
      },
      {
        id: 'hcp-barrier-2',
        hcpId: '6',
        sourceBarrierId: 'barrier-3',
        barrierName: '缺乏与患者沟通的学术话术',
        barrierDescription: '医生缺乏可以给患者看的资料',
        source: 'ai_detected',
        confidence: 0.92,
        cognitionLevelAtDetection: '双靶点认同型',
        status: 'active',
        createdAt: new Date(),
      },
    ];
    this.hcpBarriers.push(...hcpBarriers);

    console.log(`  - 策略：${this.strategies.length}个`);
    console.log(`  - 分群：${this.segments.length}个`);
    console.log(`  - KPI: ${this.kpis.length}个`);
    console.log(`  - 障碍点：${this.barriers.length}个`);
    console.log(`  - 医生：${this.hcpInternal.length}个`);
    console.log(`  - NBA 推荐：${this.nbaRecommendations.length}个`);
  }

  // ==================== 查询方法 ====================

  getAllStrategies() {
    return this.strategies;
  }

  getStrategyById(id: string) {
    return this.strategies.find(s => s.id === id);
  }

  getAllHCPs() {
    return this.hcpInternal;
  }

  getHCPById(hcpId: string) {
    return this.hcpInternal.find(h => h.hcpId === hcpId);
  }

  getNBAByHCP(hcpId: string) {
    return this.nbaRecommendations.filter(n => n.hcpId === hcpId);
  }

  getBarriersByHCP(hcpId: string) {
    return this.hcpBarriers.filter(b => b.hcpId === hcpId);
  }

  getAllBarriers() {
    return this.barriers;
  }

  // ==================== 创建方法 ====================

  createStrategy(data: any) {
    const strategy = {
      id: `strategy-${Date.now()}`,
      ...data,
      status: 'draft',
      version: 1,
      createdAt: new Date(),
    };
    this.strategies.push(strategy);
    return strategy;
  }

  createNBA(data: any) {
    const nba = {
      id: `nba-${Date.now()}`,
      ...data,
      status: 'pending',
      generatedAt: new Date(),
    };
    this.nbaRecommendations.push(nba);
    return nba;
  }

  createHCPBarrier(data: any) {
    const barrier = {
      id: `hcp-barrier-${Date.now()}`,
      ...data,
      status: 'active',
      createdAt: new Date(),
    };
    this.hcpBarriers.push(barrier);
    return barrier;
  }
}

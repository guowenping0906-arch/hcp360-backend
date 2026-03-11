import { Injectable } from '@nestjs/common';

@Injectable()
export class NbaService {
  // 模拟数据
  private nbas = new Map<string, any>();
  private idCounter = 1;

  async getHcpNbas(hcpId: string) {
    const all = Array.from(this.nbas.values());
    return all.filter(nba => nba.hcpId === hcpId && nba.status !== 'dismissed');
  }

  async create(dto: any) {
    const id = String(this.idCounter++);
    const nba = {
      id,
      ...dto,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.nbas.set(id, nba);
    return nba;
  }

  async getById(id: string) {
    const nba = this.nbas.get(id);
    if (!nba) {
      throw new Error('NBA not found');
    }
    return nba;
  }

  async update(id: string, dto: any) {
    const nba = this.nbas.get(id);
    if (!nba) {
      throw new Error('NBA not found');
    }
    const updated = { ...nba, ...dto, updatedAt: new Date().toISOString() };
    this.nbas.set(id, updated);
    return updated;
  }

  async delete(id: string) {
    const deleted = this.nbas.delete(id);
    return { success: deleted };
  }

  async execute(id: string, dto: any) {
    const nba = this.nbas.get(id);
    if (!nba) {
      throw new Error('NBA not found');
    }
    const updated = {
      ...nba,
      status: 'executed' as const,
      executedAt: new Date().toISOString(),
      executeNotes: dto.notes,
      updatedAt: new Date().toISOString()
    };
    this.nbas.set(id, updated);
    return updated;
  }

  async dismiss(id: string, dto: any) {
    const nba = this.nbas.get(id);
    if (!nba) {
      throw new Error('NBA not found');
    }
    const updated = {
      ...nba,
      status: 'dismissed' as const,
      dismissReason: dto.reason,
      dismissedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.nbas.set(id, updated);
    return updated;
  }

  async getBatch(hcpIds: string[]) {
    const all = Array.from(this.nbas.values());
    const result = new Map<string, any[]>();
    
    for (const hcpId of hcpIds) {
      result.set(hcpId, all.filter(nba => nba.hcpId === hcpId));
    }
    
    return Object.fromEntries(result);
  }

  async getPending(filters: { limit?: number; priority?: string }) {
    let result = Array.from(this.nbas.values())
      .filter(nba => nba.status === 'pending');
    
    if (filters.priority) {
      result = result.filter(nba => String(nba.priority) === filters.priority);
    }
    
    result.sort((a, b) => b.priority - a.priority);
    
    if (filters.limit) {
      result = result.slice(0, filters.limit);
    }
    
    return result;
  }

  /**
   * 基于障碍点生成 NBA 推荐
   */
  async generateFromBarriers(hcpId: string, barrierIds: string[]) {
    // 模拟 AI 生成 NBA
    const talkingPointsMap: Record<string, string[]> = {
      '1': ['分享最新安全性数据', '介绍 III 期临床试验结果'],
      '2': ['对比传统药物疗效', '展示指南更新内容'],
      '3': ['介绍医保报销政策', '说明患者援助项目']
    };

    const recommendations = barrierIds.map(barrierId => ({
      hcpId,
      barrierIds: [barrierId],
      actionType: 'visit' as const,
      actionTitle: `针对障碍点 ${barrierId} 的拜访`,
      actionReason: '基于 AI 分析的个性化推荐',
      talkingPoints: talkingPointsMap[barrierId] || ['常规学术推广'],
      priority: 80,
      isAutoAdjusted: true
    }));

    return Promise.all(recommendations.map(dto => this.create(dto)));
  }
}

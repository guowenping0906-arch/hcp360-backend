import { Injectable } from '@nestjs/common';

@Injectable()
export class BarrierService {
  // 模拟数据（替尔泊肽领域）
  private dictionary = [
    {
      id: '1',
      barrierName: '对注射制剂有顾虑',
      barrierCategory: '治疗方式顾虑',
      segmentId: '1',
      isCrossCutting: false,
      cognitionLevel: '传统治疗型',
      suggestedActions: ['介绍替尔泊肽笔式注射器便利性', '分享患者使用体验'],
      description: '担心注射麻烦或疼痛'
    },
    {
      id: '2',
      barrierName: '担心低血糖风险',
      barrierCategory: '安全性顾虑',
      segmentId: '1',
      isCrossCutting: false,
      cognitionLevel: '传统治疗型',
      suggestedActions: ['提供 SURPASS 研究低血糖数据', '对比其他药物安全性'],
      description: '担心替尔泊肽导致低血糖'
    },
    {
      id: '3',
      barrierName: '对双靶点机制不了解',
      barrierCategory: '机制认知不足',
      segmentId: '2',
      isCrossCutting: false,
      cognitionLevel: 'GLP-1 认知型',
      suggestedActions: ['GIP/GLP-1 协同作用解读', '三通道机制可视化展示'],
      description: '只了解 GLP-1，不清楚 GIP 的额外获益'
    },
    {
      id: '4',
      barrierName: '三通道机制理解不深',
      barrierCategory: '理解不足',
      segmentId: null,
      isCrossCutting: true,
      cognitionLevel: null,
      suggestedActions: ['提供机制动画视频', '学术文献解读'],
      description: '医生对替尔泊肽三通道机制有初步认知，但理解不够深入'
    },
    {
      id: '5',
      name: '担心患者经济负担',
      barrierCategory: '经济因素',
      segmentId: null,
      isCrossCutting: true,
      cognitionLevel: null,
      suggestedActions: ['医保政策解读', '患者援助项目'],
      description: '关注药物可及性'
    }
  ];

  private hcpBarriers = new Map<string, any[]>();

  async getDictionary(filters: { segmentId?: string; category?: string }) {
    let result = [...this.dictionary];
    
    if (filters.segmentId) {
      result = result.filter(item => item.segmentId === filters.segmentId || item.isCrossCutting);
    }
    
    if (filters.category) {
      result = result.filter(item => item.barrierCategory === filters.category);
    }
    
    return result;
  }

  async createDictionary(dto: any) {
    const newBarrier = {
      id: String(this.dictionary.length + 1),
      ...dto
    };
    this.dictionary.push(newBarrier);
    return newBarrier;
  }

  async getHcpBarriers(hcpId: string) {
    return this.hcpBarriers.get(hcpId) || [];
  }

  async addHcpBarrier(hcpId: string, dto: any) {
    const barriers = this.hcpBarriers.get(hcpId) || [];
    const newBarrier = {
      id: String(barriers.length + 1),
      hcpId,
      ...dto,
      status: 'active' as const,
      createdAt: new Date().toISOString()
    };
    barriers.push(newBarrier);
    this.hcpBarriers.set(hcpId, barriers);
    return newBarrier;
  }

  async updateHcpBarrier(hcpId: string, barrierId: string, dto: any) {
    const barriers = this.hcpBarriers.get(hcpId) || [];
    const index = barriers.findIndex(b => b.id === barrierId);
    if (index === -1) {
      throw new Error('Barrier not found');
    }
    barriers[index] = { ...barriers[index], ...dto };
    this.hcpBarriers.set(hcpId, barriers);
    return barriers[index];
  }

  async deleteHcpBarrier(hcpId: string, barrierId: string) {
    const barriers = this.hcpBarriers.get(hcpId) || [];
    const filtered = barriers.filter(b => b.id !== barrierId);
    this.hcpBarriers.set(hcpId, filtered);
    return { success: true };
  }

  async batchAddBarriers(hcpId: string, barriers: any[]) {
    const existing = this.hcpBarriers.get(hcpId) || [];
    const newBarriers = barriers.map((b, i) => ({
      id: String(existing.length + i + 1),
      hcpId,
      ...b,
      status: 'active' as const,
      createdAt: new Date().toISOString()
    }));
    this.hcpBarriers.set(hcpId, [...existing, ...newBarriers]);
    return newBarriers;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackService {
  // 模拟数据
  private feedbacks = new Map<string, any>();
  private idCounter = 1;

  async getHcpFeedbacks(hcpId: string) {
    const all = Array.from(this.feedbacks.values());
    return all.filter(f => f.hcpId === hcpId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async create(dto: any) {
    const id = String(this.idCounter++);
    const feedback = {
      id,
      ...dto,
      aiAnalysisStatus: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.feedbacks.set(id, feedback);
    
    // 模拟 AI 分析
    setTimeout(() => {
      this.autoAnalyze(id, dto.feedbackText);
    }, 1000);
    
    return feedback;
  }

  async getById(id: string) {
    const feedback = this.feedbacks.get(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    return feedback;
  }

  async analyze(dto: any) {
    // 模拟 AI 分析障碍点
    const barriers = this.extractBarriers(dto.feedbackText || dto.voiceTranscript);
    return {
      detectedBarriers: barriers,
      sentiment: 'neutral',
      urgency: 'medium',
      suggestedActions: ['跟进拜访', '提供学术资料']
    };
  }

  async update(id: string, dto: any) {
    const feedback = this.feedbacks.get(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    const updated = { ...feedback, ...dto, updatedAt: new Date().toISOString() };
    this.feedbacks.set(id, updated);
    return updated;
  }

  async getRelatedNba(feedbackId: string) {
    const feedback = this.feedbacks.get(feedbackId);
    if (!feedback || !feedback.nbaId) {
      return null;
    }
    // 这里应该调用 NBA service
    return { id: feedback.nbaId, title: '关联的 NBA 推荐' };
  }

  async transcribe(dto: { audioUrl: string; language?: string }) {
    // 模拟语音转文字
    return {
      transcript: '医生表示对替尔泊肽的安全性还有顾虑，需要更多临床数据支持。',
      confidence: 0.95,
      duration: 15.3
    };
  }

  /**
   * 自动分析反馈中的障碍点
   */
  private autoAnalyze(feedbackId: string, text: string) {
    const barriers = this.extractBarriers(text);
    const feedback = this.feedbacks.get(feedbackId);
    if (feedback) {
      feedback.detectedBarriers = barriers;
      feedback.aiAnalysisStatus = 'completed';
      feedback.updatedAt = new Date().toISOString();
      this.feedbacks.set(feedbackId, feedback);
    }
  }

  /**
   * 简单关键词提取障碍点（模拟 AI）
   */
  private extractBarriers(text: string) {
    const barrierKeywords: Record<string, string> = {
      '安全性': '对生物制剂安全性存疑',
      '副作用': '担心药物副作用',
      '价格': '担心患者经济负担',
      '医保': '医保报销限制',
      '习惯': '习惯现有治疗方案',
      '数据': '缺乏长期使用数据'
    };

    const detected: Array<{ barrierName: string; confidence: number }> = [];
    
    for (const [keyword, barrier] of Object.entries(barrierKeywords)) {
      if (text.includes(keyword)) {
        detected.push({
          barrierName: barrier,
          confidence: 0.8 + Math.random() * 0.15
        });
      }
    }
    
    return detected;
  }
}

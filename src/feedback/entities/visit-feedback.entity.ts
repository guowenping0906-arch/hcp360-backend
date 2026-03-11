import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Visit Feedback Entity
 * 拜访反馈表
 */
@Entity('visit_feedbacks')
export class VisitFeedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'hcp_id' })
  hcpId: string; // 医生 ID

  @Column({ type: 'uuid', name: 'nba_id', nullable: true })
  nbaId: string; // 关联的 NBA ID

  @Column({ type: 'uuid', name: 'nba_ids', array: true, nullable: true })
  nbaIds: string[]; // 关联的 NBA ID 数组

  @Column({ type: 'text', nullable: true })
  feedbackText: string; // 反馈内容

  @Column({
    type: 'varchar',
    length: 20,
    default: 'text',
  })
  feedbackType: 'voice' | 'text'; // 反馈类型

  @Column({ type: 'varchar', length: 500, nullable: true })
  audioUrl: string; // 语音反馈 URL

  @Column({
    type: 'varchar',
    length: 20,
    default: 'pending',
  })
  aiAnalysisStatus: 'pending' | 'analyzing' | 'completed' | 'failed'; // AI 分析状态

  @Column({ type: 'jsonb', nullable: true })
  detectedBarriers: {
    name: string;
    description: string;
    confidence?: number;
  }[]; // AI 识别的障碍点

  @Column({ type: 'jsonb', nullable: true })
  sentimentAnalysis: {
    sentiment: 'positive' | 'neutral' | 'negative';
    score?: number;
  }; // 情感分析

  @Column({ type: 'jsonb', nullable: true })
  followUpSuggestions: {
    action: string;
    content: string;
    reason: string;
  }[]; // 后续建议

  @Column({ type: 'jsonb', nullable: true })
  newBarriers: string[]; // 新识别的障碍点

  @Column({ type: 'varchar', length: 100, nullable: true })
  createdBy: string; // 创建人（销售代表 ID）

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

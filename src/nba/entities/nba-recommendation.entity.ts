import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

/**
 * NBA Recommendation Entity
 * NBA 推荐记录表（Next Best Action）
 */
@Entity('nba_recommendations')
export class NBARecommendation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'hcp_id' })
  hcpId: string; // 医生 ID

  @Column({ type: 'uuid', name: 'strategy_id', nullable: true })
  strategyId: string; // 关联的品牌策略 ID

  @Column({ type: 'uuid', name: 'segment_id', nullable: true })
  segmentId: string; // 关联的 HCP 分群 ID

  @Column({ type: 'uuid', name: 'barrier_ids', array: true, nullable: true })
  barrierIds: string[]; // 关联的障碍点 ID 数组

  @Column({ type: 'varchar', length: 50 })
  actionType: string; // 行动类型：visit/meeting/content_delivery

  @Column({ type: 'varchar', length: 300, nullable: true })
  actionTitle: string; // 行动标题

  @Column({ type: 'text', nullable: true })
  actionReason: string; // 推荐原因

  @Column({ type: 'jsonb', nullable: true })
  talkingPoints: string[]; // 谈话要点

  @Column({ type: 'jsonb', nullable: true })
  recommendedContent: {
    contentType: string;
    contentTitle: string;
    sourceUrl?: string;
  }[]; // 推荐内容

  @Column({ type: 'integer', default: 1 })
  priority: number; // 优先级（1=最高）

  @Column({
    type: 'varchar',
    length: 20,
    default: 'pending',
  })
  status: 'pending' | 'completed' | 'dismissed'; // 状态

  @Column({ type: 'varchar', length: 50, nullable: true })
  source: string; // 来源：barrier_analysis/external_data/feedback_generated

  @Column({ type: 'boolean', default: false })
  isNew: boolean; // 是否新生成

  @Column({ type: 'boolean', default: false })
  isAutoAdjusted: boolean; // 是否已自动调整

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date; // 过期时间

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date; // 完成时间

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  generatedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

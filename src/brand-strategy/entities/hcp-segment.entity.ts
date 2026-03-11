import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BrandStrategy } from './brand-strategy.entity';
import { KeyMessage } from './key-message.entity';

/**
 * HCP Segment Entity
 * HCP 分群策略实体表（医生观念阶梯）
 */
@Entity('hcp_segments')
export class HCPSegment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'strategy_id' })
  strategyId: string;

  @Column({ type: 'varchar', length: 200 })
  segmentName: string; // 分群名称

  @Column({ type: 'varchar', length: 100, nullable: true })
  cognitionLevel: string; // 医生认知层级/观念阶梯（传统治疗型/GLP-1 认知型/双靶点认同型/积极处方型）

  @Column({ type: 'text', nullable: true })
  hcpDescription: string; // HCP 自然语言描述

  @Column({ type: 'jsonb', nullable: true })
  hcpTagsJson: { category: string; tag: string }[]; // HCP 标签组合

  @Column({ type: 'jsonb', nullable: true })
  requiredActivities: string[]; // 必须的活动形式

  @Column({ type: 'jsonb', nullable: true })
  activityFrequency: {
    visit?: number; // 拜访次数/月
    meeting?: number; // 会议次数/季
    content?: number; // 内容推送/周
  };

  @Column({ type: 'text', nullable: true })
  objections: string; // 常见异议及应对

  @Column({ type: 'jsonb', nullable: true })
  materials: { type: string; title: string; url: string }[]; // 支持材料

  @Column({ type: 'integer', default: 1 })
  priority: number; // 优先级

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => BrandStrategy, (strategy) => strategy.segments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_id' })
  strategy: BrandStrategy;

  @OneToMany(() => KeyMessage, (message) => message.segment, { cascade: true })
  keyMessages: KeyMessage[];
}

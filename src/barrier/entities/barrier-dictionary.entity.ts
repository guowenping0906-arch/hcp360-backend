import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BarrierLevelMapping } from './barrier-level-mapping.entity';

/**
 * Barrier Dictionary Entity
 * 障碍点字典表（品牌策略预定义的障碍点）
 */
@Entity('barrier_dictionary')
export class BarrierDictionary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'strategy_id', nullable: true })
  strategyId: string; // 关联的品牌策略 ID

  @Column({ type: 'uuid', name: 'segment_id', nullable: true })
  segmentId: string; // 关联的 HCP 分群 ID（层级专属障碍点）

  @Column({ type: 'varchar', length: 200 })
  barrierName: string; // 障碍点名称

  @Column({ type: 'varchar', length: 50, nullable: true })
  barrierCategory: string; // 分类：理解不足/工具不足/认知不足/证据不足

  @Column({ type: 'text', nullable: true })
  barrierDescription: string; // 详细描述

  @Column({
    type: 'varchar',
    length: 20,
    default: 'medium',
  })
  severity: 'low' | 'medium' | 'high'; // 严重程度

  @Column({ type: 'varchar', length: 100, nullable: true })
  cognitionLevel: string; // 主要关联的观念阶梯层级

  @Column({ type: 'boolean', default: false })
  isCrossCutting: boolean; // 是否交叉障碍点（可出现在多个层级）

  @Column({ type: 'jsonb', nullable: true })
  suggestedActions: {
    action_type: string; // visit/meeting/content_delivery
    content: string;
    talking_points: string[];
  }[]; // 建议行动

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relations
  @OneToMany(() => BarrierLevelMapping, (mapping) => mapping.barrier, { cascade: true })
  levelMappings: BarrierLevelMapping[];
}

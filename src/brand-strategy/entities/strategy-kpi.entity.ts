import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BrandStrategy } from './brand-strategy.entity';

/**
 * Strategy KPI Entity
 * 策略 KPI 配置实体表
 */
@Entity('strategy_kpis')
export class StrategyKPI {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'strategy_id' })
  strategyId: string;

  @Column({ type: 'varchar', length: 50 })
  dimension: string; // 维度：会议讲者/拜访次数/覆盖率/观念升级

  @Column({ type: 'varchar', length: 50 })
  statistic: string; // 统计方式：次数/比例/人数

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  targetValue: number; // 目标值

  @Column({ type: 'varchar', length: 10, nullable: true })
  hcpClass: string; // 适用 HCP 分类：A/B/C

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => BrandStrategy, (strategy) => strategy.kpis, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_id' })
  strategy: BrandStrategy;
}

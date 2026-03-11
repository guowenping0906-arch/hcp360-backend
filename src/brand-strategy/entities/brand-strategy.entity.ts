import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { StrategyKPI } from './strategy-kpi.entity';
import { HCPSegment } from './hcp-segment.entity';

/**
 * Brand Strategy Entity
 * 品牌策略实体表
 */
@Entity('brand_strategies')
export class BrandStrategy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  brandName: string; // 品牌名称（如：替尔泊肽）

  @Column({ type: 'varchar', length: 300, nullable: true })
  strategyName: string; // 策略名称

  @Column({ type: 'date' })
  startDate: Date; // 开始日期

  @Column({ type: 'date' })
  endDate: Date; // 结束日期

  @Column({ type: 'jsonb', nullable: true })
  targetDrugs: { name: string; id?: string }[]; // 目标药品

  @Column({ type: 'jsonb', nullable: true })
  indications: { name: string; id?: string }[]; // 适应症

  @Column({ type: 'jsonb', nullable: true })
  competitors: { name: string; id?: string }[]; // 竞争对手

  // HCP 全局配置
  @Column({ type: 'text', nullable: true })
  hcpDescription: string; // HCP 描述

  @Column({ type: 'jsonb', nullable: true })
  hcpTags: string[]; // HCP 标签

  // 对应内容
  @Column({ type: 'text', nullable: true })
  coreValueProposition: string; // 核心价值主张

  @Column({ type: 'jsonb', nullable: true })
  scenarios: {
    id?: string;
    scenarioName?: string;
    strategyContent?: string;
    contentTags?: string[];
  }[]; // 细分场景

  @Column({
    type: 'varchar',
    length: 20,
    default: 'draft',
  })
  status: 'draft' | 'active' | 'archived'; // 状态：草稿/生效/归档

  @Column({ type: 'integer', default: 1 })
  version: number; // 版本号

  @Column({ type: 'varchar', length: 100, nullable: true })
  createdBy: string; // 创建人

  @Column({ type: 'varchar', length: 100, nullable: true })
  updatedBy: string; // 更新人

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  // Relations
  @OneToMany(() => StrategyKPI, (kpi) => kpi.strategy, { cascade: true })
  kpis: StrategyKPI[];

  @OneToMany(() => HCPSegment, (segment) => segment.strategy, { cascade: true })
  segments: HCPSegment[];
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BarrierDictionary } from './barrier-dictionary.entity';

/**
 * HCP Barrier Entity
 * HCP 障碍点实例表（每位医生的具体障碍点）
 */
@Entity('hcp_barriers')
export class HCPBarrier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'hcp_id' })
  hcpId: string; // 医生 ID

  @Column({ type: 'uuid', name: 'source_barrier_id', nullable: true })
  sourceBarrierId: string; // 来源障碍点字典 ID

  @Column({ type: 'varchar', length: 200 })
  barrierName: string; // 障碍点名称

  @Column({ type: 'text', nullable: true })
  barrierDescription: string; // 障碍点描述

  @Column({
    type: 'varchar',
    length: 50,
    default: 'ai_detected',
  })
  source: 'ai_detected' | 'manual_add' | 'external_data'; // 来源

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  confidence: number; // AI 置信度 (0-1)

  @Column({ type: 'varchar', length: 100, nullable: true })
  cognitionLevelAtDetection: string; // 检测时的医生观念阶梯层级

  @Column({
    type: 'varchar',
    length: 20,
    default: 'active',
  })
  status: 'active' | 'resolved' | 'dismissed'; // 状态

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date; // 确认时间

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date; // 解决时间

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => BarrierDictionary, { nullable: true })
  @JoinColumn({ name: 'source_barrier_id' })
  sourceBarrier: BarrierDictionary;
}

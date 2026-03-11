import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { BarrierDictionary } from './barrier-dictionary.entity';

/**
 * Barrier Level Mapping Entity
 * 障碍点 - 观念阶梯层级映射表
 */
@Entity('barrier_level_mapping')
@Unique(['barrierId', 'cognitionLevel'])
export class BarrierLevelMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'barrier_id' })
  barrierId: string;

  @Column({ type: 'varchar', length: 100 })
  cognitionLevel: string; // 观念阶梯层级（传统治疗型/GLP-1 认知型/双靶点认同型/积极处方型）

  @Column({ type: 'boolean', default: false })
  isExclusive: boolean; // 是否专属该层级（TRUE=挂钩，FALSE=交叉）

  @Column({ type: 'integer', default: 1 })
  priority: number; // 优先级

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => BarrierDictionary, (barrier) => barrier.levelMappings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'barrier_id' })
  barrier: BarrierDictionary;
}

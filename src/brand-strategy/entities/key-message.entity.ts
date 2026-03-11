import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { HCPSegment } from './hcp-segment.entity';
import { ContentMapping } from './content-mapping.entity';

/**
 * Key Message Entity
 * 关键信息实体表
 */
@Entity('key_messages')
export class KeyMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'segment_id' })
  segmentId: string;

  @Column({ type: 'text' })
  messageText: string; // 关键信息内容

  @Column({ type: 'varchar', length: 50, nullable: true })
  messageType: string; // 消息类型：academic/sales/digital

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  targetReachRate: number; // 目标覆盖率 %

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  targetUpgradeRate: number; // 目标观念升级率 %

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => HCPSegment, (segment) => segment.keyMessages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'segment_id' })
  segment: HCPSegment;

  @OneToMany(() => ContentMapping, (content) => content.message, { cascade: true })
  contents: ContentMapping[];
}

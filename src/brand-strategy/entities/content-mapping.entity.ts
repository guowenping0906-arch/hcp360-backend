import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { KeyMessage } from './key-message.entity';

/**
 * Content Mapping Entity
 * 内容/话术映射实体表
 */
@Entity('content_mapping')
export class ContentMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'message_id' })
  messageId: string;

  @Column({ type: 'varchar', length: 50 })
  contentType: string; // 内容类型：academic/sales_script/digital

  @Column({ type: 'varchar', length: 300, nullable: true })
  contentTitle: string; // 内容标题

  @Column({ type: 'text', nullable: true })
  contentText: string; // 内容正文

  @Column({ type: 'jsonb', nullable: true })
  contentTags: string[]; // 内容标签

  @Column({ type: 'varchar', length: 500, nullable: true })
  sourceUrl: string; // 内容源链接

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => KeyMessage, (message) => message.contents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  message: KeyMessage;
}

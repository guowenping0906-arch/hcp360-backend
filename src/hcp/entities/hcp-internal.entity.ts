import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * HCP Internal Entity
 * 内部 HCP 主表（企业 CRM 数据）
 */
@Entity('hcp_internal')
export class HCPInternal {
  @PrimaryColumn({ type: 'varchar', length: 100, name: 'hcp_id' })
  hcpId: string;

  @Column({ type: 'varchar', length: 200 })
  name: string; // 姓名

  @Column({ type: 'varchar', length: 300, nullable: true })
  hospitalName: string; // 医院名称

  @Column({ type: 'varchar', length: 50, nullable: true })
  hospitalLevel: string; // 医院等级（三级甲等等）

  @Column({ type: 'varchar', length: 100, nullable: true })
  department: string; // 科室

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string; // 职称

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string; // 城市

  @Column({ type: 'varchar', length: 100, nullable: true })
  province: string; // 省份

  @Column({ type: 'varchar', length: 20, nullable: true })
  consentStatus: string; // 同意状态 (AB Consent)

  @Column({ type: 'varchar', length: 10, nullable: true })
  hcpClass: string; // A/B/C 分类

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

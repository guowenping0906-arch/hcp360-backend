import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateStrategyDto, UpdateStrategyDto } from './dto/create-strategy.dto';

@Injectable()
export class BrandStrategyService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * 获取品牌策略列表
   */
  async findAll() {
    const query = `
      SELECT * FROM brand_strategies
      ORDER BY created_at DESC
    `;
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  /**
   * 获取品牌策略详情
   */
  async findOne(id: string) {
    const query = `
      SELECT * FROM brand_strategies WHERE id = $1
    `;
    const result = await this.databaseService.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * 创建品牌策略
   */
  async create(createStrategyDto: CreateStrategyDto) {
    const {
      brandName,
      strategyName,
      startDate,
      endDate,
      targetDrugs,
      indications,
      competitors,
      kpis,
      hcpDescription,
      hcpTags,
      coreValueProposition,
      scenarios,
      segments,
    } = createStrategyDto;

    const query = `
      INSERT INTO brand_strategies (
        brand_name, strategy_name, start_date, end_date,
        target_drugs, indications, competitors,
        hcp_description, hcp_tags, core_value_proposition, scenarios,
        status, version, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
      RETURNING *
    `;

    const values = [
      brandName,
      strategyName,
      startDate,
      endDate,
      JSON.stringify(targetDrugs),
      JSON.stringify(indications),
      JSON.stringify(competitors),
      hcpDescription || null,
      hcpTags ? JSON.stringify(hcpTags) : null,
      coreValueProposition || null,
      scenarios ? JSON.stringify(scenarios) : null,
      'draft',
      1,
    ];

    const result = await this.databaseService.query(query, values);
    const strategy = result.rows[0];

    // 如果有关联的 KPIs 和 Segments，需要插入到关联表
    if (kpis && kpis.length > 0) {
      await this.createKpis(strategy.id, kpis);
    }

    if (segments && segments.length > 0) {
      await this.createSegments(strategy.id, segments);
    }

    return strategy;
  }

  /**
   * 更新品牌策略
   */
  async update(id: string, updateStrategyDto: UpdateStrategyDto) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Brand strategy with ID ${id} not found`);
    }

    const {
      brandName,
      strategyName,
      startDate,
      endDate,
      targetDrugs,
      indications,
      competitors,
      kpis,
      hcpDescription,
      hcpTags,
      coreValueProposition,
      scenarios,
      segments,
    } = updateStrategyDto;

    // 构建动态更新 SQL
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (brandName !== undefined) {
      updates.push(`brand_name = $${paramIndex++}`);
      values.push(brandName);
    }
    if (strategyName !== undefined) {
      updates.push(`strategy_name = $${paramIndex++}`);
      values.push(strategyName);
    }
    if (startDate !== undefined) {
      updates.push(`start_date = $${paramIndex++}`);
      values.push(startDate);
    }
    if (endDate !== undefined) {
      updates.push(`end_date = $${paramIndex++}`);
      values.push(endDate);
    }
    if (targetDrugs !== undefined) {
      updates.push(`target_drugs = $${paramIndex++}`);
      values.push(JSON.stringify(targetDrugs));
    }
    if (indications !== undefined) {
      updates.push(`indications = $${paramIndex++}`);
      values.push(JSON.stringify(indications));
    }
    if (competitors !== undefined) {
      updates.push(`competitors = $${paramIndex++}`);
      values.push(JSON.stringify(competitors));
    }
    if (hcpDescription !== undefined) {
      updates.push(`hcp_description = $${paramIndex++}`);
      values.push(hcpDescription);
    }
    if (hcpTags !== undefined) {
      updates.push(`hcp_tags = $${paramIndex++}`);
      values.push(JSON.stringify(hcpTags));
    }
    if (coreValueProposition !== undefined) {
      updates.push(`core_value_proposition = $${paramIndex++}`);
      values.push(coreValueProposition);
    }
    if (scenarios !== undefined) {
      updates.push(`scenarios = $${paramIndex++}`);
      values.push(JSON.stringify(scenarios));
    }

    if (updates.length === 0) {
      return existing;
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE brand_strategies
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.databaseService.query(query, values);
    const strategy = result.rows[0];

    // 如果有关联的 KPIs 和 Segments，需要更新
    if (kpis !== undefined) {
      await this.updateKpis(strategy.id, kpis);
    }

    if (segments !== undefined) {
      await this.updateSegments(strategy.id, segments);
    }

    return strategy;
  }

  /**
   * 删除品牌策略
   */
  async remove(id: string) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Brand strategy with ID ${id} not found`);
    }

    const query = `
      DELETE FROM brand_strategies WHERE id = $1
    `;
    await this.databaseService.query(query, [id]);
    return { success: true };
  }

  /**
   * 创建 KPIs
   */
  private async createKpis(strategyId: string, kpis: any[]) {
    for (const kpi of kpis) {
      const query = `
        INSERT INTO strategy_kpis (
          strategy_id, dimension, statistic, target_value, hcp_class, created_at
        ) VALUES ($1, $2, $3, $4, $5, NOW())
      `;
      await this.databaseService.query(query, [
        strategyId,
        kpi.dimension,
        kpi.statistic,
        kpi.targetValue,
        kpi.hcpClass || null,
      ]);
    }
  }

  /**
   * 创建 Segments
   */
  private async createSegments(strategyId: string, segments: any[]) {
    for (const segment of segments) {
      const query = `
        INSERT INTO hcp_segments (
          strategy_id, segment_name, cognition_level, hcp_description,
          hcp_tags, required_activities, activity_frequency, key_messages,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        RETURNING id
      `;
      const result = await this.databaseService.query(query, [
        strategyId,
        segment.segmentName,
        segment.cognitionLevel || null,
        segment.hcpDescription || null,
        segment.hcpTags ? JSON.stringify(segment.hcpTags) : null,
        segment.requiredActivities ? JSON.stringify(segment.requiredActivities) : null,
        segment.activityFrequency ? JSON.stringify(segment.activityFrequency) : null,
        segment.keyMessages ? JSON.stringify(segment.keyMessages) : null,
      ]);
      const segmentId = result.rows[0].id;

      // 如果有障碍点，创建关联
      if (segment.barriers && segment.barriers.length > 0) {
        await this.createSegmentBarriers(segmentId, segment.barriers);
      }
    }
  }

  /**
   * 更新 KPIs
   */
  private async updateKpis(strategyId: string, kpis: any[]) {
    // 先删除旧的
    await this.databaseService.query(
      'DELETE FROM strategy_kpis WHERE strategy_id = $1',
      [strategyId],
    );
    // 再创建新的
    if (kpis && kpis.length > 0) {
      await this.createKpis(strategyId, kpis);
    }
  }

  /**
   * 更新 Segments
   */
  private async updateSegments(strategyId: string, segments: any[]) {
    // 先删除旧的
    await this.databaseService.query(
      'DELETE FROM hcp_segments WHERE strategy_id = $1',
      [strategyId],
    );
    // 再创建新的
    if (segments && segments.length > 0) {
      await this.createSegments(strategyId, segments);
    }
  }

  /**
   * 创建障碍点关联
   */
  private async createSegmentBarriers(segmentId: string, barriers: any[]) {
    for (const barrier of barriers) {
      const query = `
        INSERT INTO hcp_barriers (
          segment_id, barrier_id, barrier_text, created_at
        ) VALUES ($1, $2, $3, NOW())
      `;
      await this.databaseService.query(query, [
        segmentId,
        barrier.barrierId || null,
        barrier.barrierText || null,
      ]);
    }
  }

  /**
   * 获取医生的观念阶梯分群
   */
  async findHcpSegment(did: string) {
    const query = `
      SELECT 
        sm.hcp_id,
        sm.segment_id,
        sm.confidence_score,
        s.matrix_type,
        s.matrix_type_en,
        s.segment_name,
        s.segment_name_en,
        s.hcp_description,
        s.hcp_description_en,
        s.clinical_characteristics,
        s.clinical_characteristics_en
      FROM hcp_segment_mapping sm
      JOIN hcp_segments s ON sm.segment_id = s.id
      WHERE sm.hcp_id = $1
    `;
    const result = await this.databaseService.query(query, [did]);
    return result.rows[0] || null;
  }

  /**
   * 获取品牌策略下的观念阶梯分群
   */
  async findSegmentsByStrategy(strategyId: string) {
    const query = `
      SELECT * FROM hcp_segments
      WHERE strategy_id = $1
      ORDER BY created_at
    `;
    const result = await this.databaseService.query(query, [strategyId]);
    return result.rows;
  }

  /**
   * 获取障碍点字典
   */
  async findBarrierDictionary() {
    const query = `
      SELECT * FROM barrier_dictionary
      ORDER BY barrier_type, barrier_name
    `;
    const result = await this.databaseService.query(query);
    return result.rows;
  }
}

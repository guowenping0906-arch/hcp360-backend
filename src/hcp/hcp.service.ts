import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class HcpService {
  constructor(private readonly db: DatabaseService) {}

  async getList(filters: any) {
    const offset = (filters.page - 1) * filters.pageSize;
    const query = `
      SELECT h.hcp_id as "hcpId", h.name, h.title, h.department, h.hospital_name as "hospital",
             h.hospital_level as "hospitalLevel", h.city, h.hcp_class as "segmentId", h.hcp_class as segment,
             COALESCE(json_agg(DISTINCT jsonb_build_object('id', ht.id, 'name', ht.tag_name, 'color', '#14b8a6')) FILTER (WHERE ht.id IS NOT NULL), '[]') as tags
      FROM hcp_internal h LEFT JOIN hcp_tags ht ON ht.hcp_id = h.hcp_id
      GROUP BY h.hcp_id, h.name, h.title, h.department, h.hospital_name, h.hospital_level, h.city
      ORDER BY h.created_at DESC LIMIT $1 OFFSET $2`;
    const result = await this.db.query(query, [filters.pageSize, offset]);
    const count = await this.db.query('SELECT COUNT(*) as total FROM hcp_internal');
    return { data: result.rows, total: parseInt(count.rows[0].total), page: filters.page, pageSize: filters.pageSize };
  }

  async getProfile(hcpId: string) {
    const query = `SELECT h.hcp_id as "hcpId", h.name, h.title, h.department, h.hospital_name as "hospital",
      h.hospital_level as "hospitalLevel", h.city, h.hcp_class as segment, h.hcp_class as "segmentId",
      COALESCE(json_agg(DISTINCT jsonb_build_object('id', ht.id, 'name', ht.tag_name, 'color', '#14b8a6')) FILTER (WHERE ht.id IS NOT NULL), '[]') as tags
      FROM hcp_internal h LEFT JOIN hcp_tags ht ON ht.hcp_id = h.hcp_id WHERE h.hcp_id = $1 GROUP BY h.hcp_id`;
    const result = await this.db.query(query, [hcpId]);
    if (result.rows.length === 0) throw new Error('HCP not found');
    return result.rows[0];
  }

  async create(dto: any) {
    const hcpId = dto.hcpId || `HCP${Date.now()}`;
    const r = await this.db.query('INSERT INTO hcp_internal (hcp_id,name,title,department,hospital_name,hospital_level,city,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW()) RETURNING *',
      [hcpId, dto.name, dto.title||'', dto.department||'', dto.hospital||'', dto.hospitalLevel||'', dto.city||'']);
    return r.rows[0];
  }

  async update(hcpId: string, dto: any) { return this.getProfile(hcpId); }
  async delete(hcpId: string) { await this.db.query('DELETE FROM hcp_internal WHERE hcp_id=$1',[hcpId]); return {success:true}; }
  async search(q: string, limit: number) { const r=await this.db.query('SELECT hcp_id as "hcpId",name,department,hospital_name as hospital FROM hcp_internal WHERE name ILIKE $1 LIMIT $2',[`%${q}%`,limit]); return r.rows; }
  async updateTags(hcpId: string, tags: any[]) { await this.db.query('DELETE FROM hcp_tags WHERE hcp_id=$1',[hcpId]); return this.getProfile(hcpId); }
  async updateSegment(hcpId: string, dto: any) { return this.getProfile(hcpId); }
  async batchImport(hcps: any[]) { const r=[]; for(const h of hcps) r.push(await this.create(h)); return {success:true,count:r.length}; }

  async getActivities(hcpId: string) {
    const query = `
      SELECT 
        id, hcp_id as "hcpId", activity_type as "activityType", activity_date as "activityDate",
        activity_name as "activityName", brand, feedback, created_at as "createdAt"
      FROM activities_internal
      WHERE hcp_id = $1
      ORDER BY activity_date DESC, created_at DESC
      LIMIT 50`;
    const result = await this.db.query(query, [hcpId]);
    return result.rows;
  }

  async getNetwork(hcpId: string) {
    const query = `
      SELECT 
        ea.id, 
        ea.source_id as "sourceId",
        ea.target_id as "targetId",
        ea.edge_type as "edgeType",
        ea.weight as "weight",
        ea.is_bidirectional as "isBidirectional",
        ed.description,
        h.hcp_id as "targetHcpId",
        h.name as "targetName",
        h.hospital_name as "targetHospital",
        h.department as "targetDepartment",
        h.hcp_class as "targetSegment"
      FROM edge_all ea
      LEFT JOIN edge_details ed ON ea.id = ed.edge_id
      LEFT JOIN hcp_internal h ON ea.target_id = h.hcp_id
      WHERE ea.source_id = $1
      ORDER BY ea.weight DESC, ea.created_at DESC`;
    const result = await this.db.query(query, [hcpId]);
    return result.rows;
  }

  async getPrescriptions(hcpId: string) {
    const query = `
      SELECT 
        drug_name as "drugName", drug_category as "drugCategory",
        prescription_count as "prescriptionCount", percentage, trend,
        month
      FROM hcp_prescriptions
      WHERE hcp_id = $1
      ORDER BY percentage DESC`;
    const result = await this.db.query(query, [hcpId]);
    return result.rows;
  }
}

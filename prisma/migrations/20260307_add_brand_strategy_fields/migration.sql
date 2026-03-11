-- Add HCP global configuration and content fields to brand_strategies table
-- 2026-03-07

ALTER TABLE brand_strategies
ADD COLUMN IF NOT EXISTS hcp_description TEXT,
ADD COLUMN IF NOT EXISTS hcp_tags JSONB,
ADD COLUMN IF NOT EXISTS core_value_proposition TEXT,
ADD COLUMN IF NOT EXISTS scenarios JSONB;

-- Add comment for documentation
COMMENT ON COLUMN brand_strategies.hcp_description IS 'HCP 全局描述';
COMMENT ON COLUMN brand_strategies.hcp_tags IS 'HCP 标签列表';
COMMENT ON COLUMN brand_strategies.core_value_proposition IS '核心价值主张';
COMMENT ON COLUMN brand_strategies.scenarios IS '细分场景拜访策略';

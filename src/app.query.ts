export const historyQuery = (
  {
    organizationId,
    cursorDir,
    cursorId,
    pageSize,
  }): string => `
with historyQuery as (
  select
      --row_number() over (order by base.created_date desc) as cursor_id,
      --to_char(base.created_date, 'YYYYMMDDHH24MISSMS')::bigint as cursor_id,
      extract(epoch from base.created_date) as cursor_id,
      base.id,
      base.correlation_id,
      base.organization_id,
      base.user_email,
      base.type,
      base.entity_type,
      dh.number as contract_number,
      base.created_date as start_date,
      age(max(ext.created_date), base.created_date) as duration,
      count(ext) as changed_entities
  from
      public.audit_log base
  join
      public.audit_log ext on base.correlation_id = ext.correlation_id
  left join
      public.document_header dh on (base.entity_id = dh.id and base.entity_type = 1)
  where
      base.parent_id is null
      
      ${organizationId ? `and base.organization_id = '${organizationId}'` : ''}
      
  group by 
      base.id, base.correlation_id, base.organization_id, base.type, base.entity_type, dh.number, base.user_email, base.created_date
  order by
      base.created_date desc
)

select * from historyQuery where 1 = 1

    ${cursorId && cursorDir === 'next' ? `and cursor_id < ${+cursorId}` : ''}

    ${cursorId && cursorDir === 'prev' ? `and cursor_id > ${+cursorId}` : ''}

    order by cursor_id ${cursorDir === 'prev' ? 'asc' : 'desc'}
 
    limit ${pageSize}
`;

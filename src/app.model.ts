export const Type = {
  Added: 1,
  Deleted: 2,
  Modified: 3,
} as const;

export const EntityType = {
  Unknown: 0,
  ContractHeaderEntity: 1,
  AnnexHeaderEntity: 2,
  AnnexChangeEntity: 3,
  FileEntity: 4,
  InvoiceEntity: 5,
  PaymentScheduleEntity: 6,
  ContractFundingEntity: 7
} as const;

export interface HistoryData {
  cursor_id: number;
  id: number;
  correlation_id: string;
  organization_id: string;
  user_email: string;
  type: number;
  entity_type: number;
  contract_number: string;
  start_date: string;
  duration: {
    milliseconds: number;
  };
  changed_entities: number;
}

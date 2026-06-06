export interface ServiceResponse {
  success: boolean;
  message: string;
  metadata: { status: number; total_data?: number };
  data?: unknown;
}

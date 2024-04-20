export interface Fail {
  success: false;
  error: Record<string, any>;
  status: number;
}

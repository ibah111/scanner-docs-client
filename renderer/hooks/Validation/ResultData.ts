export interface ResultData<T extends object, K extends keyof T> {
  value: T[K] | string;
  onChange: (value: T[K] | null | undefined) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

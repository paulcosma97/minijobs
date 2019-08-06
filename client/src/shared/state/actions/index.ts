export type ActionDispatcher = (
  action: { type: string; payload?: any } | Function
) => void;

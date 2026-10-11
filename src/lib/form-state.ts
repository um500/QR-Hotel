// Shared shape for every useFormState-backed server action in this app.
// Keeping one type means the client component's initialState always
// matches what the action actually returns.
export type FormState = { error?: string; success: boolean };
export const initialFormState: FormState = { success: false };

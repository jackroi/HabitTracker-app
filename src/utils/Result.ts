export type Ok<T,E> = { success: true, value: T };
export type Err<T,E> = { success: false, error: E };
export type Result<T,E> = Ok<T,E> | Err<T,E>;

export const ok = <T, E>(value: T): Result<T, E> => ({ success: true, value: value });
export const err = <T, E>(error: E): Result<T, E> => ({ success: false, error: error });


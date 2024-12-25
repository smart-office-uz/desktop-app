type Ok<Success> = { ok: true; data: Success };
type Err<Failure> = { ok: false; error: Failure };
type Result<Success, Failure> = Ok<Success> | Err<Failure>;

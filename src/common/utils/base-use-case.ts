export interface IBaseUseCase<Input, Output> {
  execute(payload: Input): Promise<Output>;
}

export abstract class DataTransferBaseModel<T>{

  public toDto(): T {
    return {} as T;
  }
}

/* tslint:disable interface-name */
class Pool<T> {
  private pool: T[];
  private Func: Pool.Resettable<T>;

  constructor(Func: Pool.Resettable<T>) {
    this.pool = [];
    this.Func = Func;
  }

  public get(): T {
    if (this.pool.length) {
      return this.pool.splice(0, 1)[0];
    }
    return new this.Func();
  }

  public release(obj: T): void {
    if (this.Func.reset) {
      this.Func.reset(obj);
    }
    this.pool.push(obj);
  }
}

namespace Pool {
  export interface Resettable<T> {
    // constructor
    new (): T;
    // static
    reset?(obj: T): void;
  }
}

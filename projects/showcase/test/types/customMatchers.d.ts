declare namespace jasmine {
    interface Matchers<T> {
      toBeLocatedAs(expected: number, tolerance?: number): boolean;
      toBeSizedAs(expected: number, tolerance?: number): boolean;
    }
  }
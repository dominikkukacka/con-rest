/**
 * Created by sschacherl on 29.05.2015.
 */
module Modules {
  export interface IAceConfig {
    theme: string;
    mode: string;
  }

  export var aceConfig: IAceConfig = {
    theme: 'con-rest',
    mode: 'json'
  };
}
import type { ExplainerSpec } from '../spec';
import { spec as b2c01 } from './book2-01';
import { spec as b2c02 } from './book2-02';
import { spec as b2c03 } from './book2-03';
import { spec as b2c04 } from './book2-04';
import { spec as b2c05 } from './book2-05';
import { spec as b2c06 } from './book2-06';
import { spec as b2c07 } from './book2-07';
import { spec as b2c08 } from './book2-08';
import { spec as b3c01 } from './book3-01';
import { spec as b3c02 } from './book3-02';
import { spec as b3c03 } from './book3-03';
import { spec as b3c04 } from './book3-04';
import { spec as b3c05 } from './book3-05';
import { spec as b3c06 } from './book3-06';
import { spec as b3c07 } from './book3-07';
import { spec as b3c08 } from './book3-08';
import { spec as b3c09 } from './book3-09';
import { spec as b3c10 } from './book3-10';
import { spec as b3c11 } from './book3-11';
import { spec as b3c12 } from './book3-12';

/** Every book 2/3 explainer. Root registers one composition per spec. */
export const draftSpecs: ExplainerSpec[] = [
  b2c01, b2c02, b2c03, b2c04, b2c05, b2c06, b2c07, b2c08,
  b3c01, b3c02, b3c03, b3c04, b3c05, b3c06, b3c07, b3c08, b3c09, b3c10, b3c11, b3c12,
];

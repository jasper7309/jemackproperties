import { describe,expect,it } from 'vitest';
import { publicPolicy } from '@/data/launch';
describe('Public information exclusions',()=>{
 it('disables financial figures across public views',()=>{expect(publicPolicy.showFinancialFigures).toBe(false);});
 it('disables internal document links',()=>{expect(publicPolicy.showInternalDocuments).toBe(false);});
});

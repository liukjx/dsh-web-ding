
import { buildConfigSchema, DEFAULTS } from '../src/core/settings.js'
const C = await buildConfigSchema()
console.log('Config built:', C !== undefined)
const want = {
  questionEnabled: true, questionVolume: 0.7, questionFreq: 880, questionDecayMs: 900,
  turnEndEnabled: true, turnEndVolume: 0.7, turnEndFreq: 880, turnEndDecayMs: 900,
  subagentEnabled: false, subagentDistinctTone: false,
  subagentVolume: 0.7, subagentFreq: 440, subagentDecayMs: 900,
}
let bad = 0
for (const [k, v] of Object.entries(want)) {
  const node = C.__shape[k]
  const got = node === undefined ? 'MISSING' : node.__def
  const ok = got === v
  if (!ok) bad += 1
  console.log((ok ? '  ok   ' : '  BAD  ') + k.padEnd(22) + 'default=' + String(got) + ' (want ' + v + ')')
}
console.log('  signal field present:', C.__shape.signal !== undefined)
console.log(bad === 0 ? '\nAll schema defaults correct' : '\n' + bad + ' WRONG')
if (bad !== 0) process.exitCode = 1

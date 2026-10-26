import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
// Vocabulario oficial descargado; no se envía el sitio a servicios externos.
const vocabularyPath = process.argv[2];
if (!vocabularyPath)
  throw new Error('Uso: node tests/seo-schema.mjs <schemaorg-current-https.jsonld>');
const source = await fs.readFile(vocabularyPath, 'utf8');
const vocabulary = JSON.parse(source);
const terms = new Map(vocabulary['@graph'].map((x) => [x['@id'], x]));
const arr = (x) => (x ? (Array.isArray(x) ? x : [x]) : []);
function inherits(type, ancestor, seen = new Set()) {
  if (type === ancestor) return true;
  if (seen.has(type)) return false;
  seen.add(type);
  return arr(terms.get(type)?.['rdfs:subClassOf']).some((x) => inherits(x['@id'], ancestor, seen));
}
let checked = 0;
function validate(node) {
  if (Array.isArray(node)) {
    node.forEach(validate);
    return;
  }
  if (!node || typeof node !== 'object') return;
  const type = node['@type'] && 'schema:' + node['@type'];
  if (type) {
    assert(terms.has(type), `Tipo inexistente ${type}`);
    for (const [name, value] of Object.entries(node)) {
      if (name.startsWith('@')) continue;
      const property = terms.get('schema:' + name);
      assert(property, `Propiedad inexistente ${name}`);
      assert(
        arr(property['schema:domainIncludes']).some((d) => inherits(type, d['@id'])),
        `${name} no pertenece a ${type}`,
      );
      const ranges = arr(property['schema:rangeIncludes']).map((x) => x['@id']);
      for (const item of arr(value)) {
        if (item && typeof item === 'object') {
          if (item['@type'])
            assert(
              ranges.some((r) => inherits('schema:' + item['@type'], r)),
              `${name}: rango inválido ${item['@type']}`,
            );
          else assert(item['@id'] && new URL(item['@id']), `${name}: referencia inválida`);
        } else if (typeof item === 'number')
          assert(
            ranges.some((r) => ['schema:Integer', 'schema:Number', 'schema:Float'].includes(r)),
            `${name}: no admite número`,
          );
        else if (typeof item === 'string') {
          // Schema.org permite identificar nodos Thing mediante su URL (p. ej. ListItem.item).
          const isReference = (() => {
            try {
              return Boolean(new URL(item)) && ranges.some((r) => inherits(r, 'schema:Thing'));
            } catch {
              return false;
            }
          })();
          assert(
            isReference || ranges.some((r) => ['schema:Text', 'schema:URL'].includes(r)),
            `${name}: no admite texto/URL`,
          );
        }
      }
      checked++;
    }
  }
  Object.values(node).forEach(validate);
}
const result = JSON.parse(await fs.readFile('screenshots/seo/verification.json', 'utf8'));
for (const row of result.rows) row.json.forEach(validate);
// Se comprueba el escape del propio componente con texto capaz de cerrar un script.
const component = await fs.readFile('src/components/JsonLd.tsx', 'utf8');
const expression = component.match(/__html:\s*(JSON\.stringify\(data\)\.replace\([^\n]+\))/)[1];
const serialize = new Function('data', `return ${expression}`);
const unsafe = { text: '</script><img src=x onerror=alert(1)>' };
const serialized = serialize(unsafe);
assert(!serialized.includes('<'));
assert.deepEqual(JSON.parse(serialized), unsafe);
const output = {
  vocabulary: 'https://schema.org/version/latest/schemaorg-current-https.jsonld',
  sha256: crypto.createHash('sha256').update(source).digest('hex'),
  propertiesChecked: checked,
  routes: result.rows.length,
  checks: ['tipos', 'propiedades', 'dominios heredados', 'rangos de valores', 'escape de <'],
  result: 'PASS',
};
await fs.writeFile('screenshots/seo/schema-validation.json', JSON.stringify(output, null, 2));
console.log(output);

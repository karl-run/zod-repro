# zod-repro for generics with transformed sub schema issue

## repro steps
1. install deps: `yarn`
2. run compilation: `yarn repro`

Observe the following type error:

```
error TS2322: Type 'ZodObject<{ a: ZodString; date: ZodEffects<ZodEffects<ZodString, string, string>, Date, string>; c: ZodString; }, "strip", ZodTypeAny, { ...; }, { ...; }>' is not assignable to type 'ZodType<{ a: string; date: Date; c: string; }, ZodTypeDef, { a: string; date: Date; c: string; }>'.
  The types of '_input.date' are incompatible between these types.
    Type 'string' is not assignable to type 'Date'.

45     schema: SchemaWithDate,
       ~~~~~~

  index.ts:54:3
    54   schema: ZodType<SchemaType>;
         ~~~~~~
    The expected type comes from property 'schema' which is declared here on type '{ path: string; schema: ZodType<{ a: string; date: Date; c: string; }, ZodTypeDef, { a: string; date: Date; c: string; }>; }'


Found 1 error.
```

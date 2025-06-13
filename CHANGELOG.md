# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-13

### Added

- Initial release with core utilities:
  - `deepPartial` - Make any Zod schema deeply optional
  - `deepRequired` - Make any Zod schema deeply required
  - `deepOmit` - Deeply omit keys from any Zod schema
  - `deepPick` - Deeply pick only certain keys from any Zod schema
  - `mergeSchemas` - Deeply merge two Zod object schemas
  - `zodToJsonSchema` - Convert a Zod schema to JSON Schema
  - `zodInferType` - Infer TypeScript type from a Zod schema
  - `zodDefault` - Set a default value for any Zod schema
  - `emailPasswordSchema` - Flexible email-password schema generator
  - `flattenErrors` - Simplify Zod errors into readable form
  - `refineObject` - Add cross-field validation to Zod objects
  - `smartEnum` - Create safe enums from string arrays
- Comprehensive test suite with 80%+ coverage
- Full TypeScript support with accurate type inference
- Detailed documentation and examples

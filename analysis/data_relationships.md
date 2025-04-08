# NYCDB Data Relationships Analysis

## Property Identifiers and Their Relationships

### BBL (Borough-Block-Lot)
- Primary identifier for properties across most datasets
- Format: 10-digit code (1 digit borough + 5 digit block + 4 digit lot)
- Used in: PLUTO, DOB datasets, HPD datasets, financial datasets

### BIN (Building Identification Number)
- Identifies specific buildings (a property/BBL may have multiple buildings)
- Format: 7-digit code
- Used in: DOB datasets, HPD datasets

### Address Components
- Borough, street name, house number
- Used when BBL/BIN are not available
- Less reliable for joining (due to formatting inconsistencies)

## Cross-Dataset Relationships

### Property Information Flow
1. **Base Property Data**: PLUTO provides the foundation with physical characteristics
2. **Building Regulatory Data**: DOB datasets track construction, violations, complaints
3. **Housing Quality Data**: HPD datasets track violations, complaints, litigation
4. **Financial Data**: DOF datasets track sales, tax information
5. **Tenant Impact Data**: Eviction datasets track displacement

### Key Join Paths

#### Property-Based Analysis
- PLUTO → DOB Violations (via BBL)
- PLUTO → HPD Violations (via BBL)
- PLUTO → DOF Sales (via BBL)

#### Building-Based Analysis
- DOB Jobs → DOB Violations (via BIN)
- DOB Jobs → Certificates of Occupancy (via BIN)
- HPD Registrations → HPD Violations (via BIN)

#### Owner-Based Analysis
- HPD Registrations → ACRIS (via owner name, requires fuzzy matching)
- HPD Registrations → DOF Exemptions (via BBL)

#### Geographic Analysis
- PLUTO → Boundaries (via spatial join)
- Any BBL-based dataset → Boundaries (via lookup tables)

## Data Volumes and Update Frequency

Based on the repository information:
- Large datasets: PLUTO (~1 million records), DOB Violations (~2 million records)
- Medium datasets: HPD Violations, DOF Sales (~500k-1M records)
- Smaller datasets: Evictions, NYCHA (~10k-100k records)

Update frequency varies:
- Some datasets updated daily (complaints, violations)
- Others updated quarterly or annually (PLUTO, tax data)

## Query Complexity Analysis

### Simple Queries
- Property lookup by BBL/BIN/Address
- Violations for a specific property
- Sales history for a specific property

### Medium Complexity
- Properties with violations in a specific neighborhood
- Buildings with active litigation
- Recent sales in a price range by neighborhood

### Complex Queries
- Properties with patterns of violations and litigation
- Landlords with multiple properties having violations
- Geographic clustering of evictions or violations

## Data Quality Considerations

- Inconsistent formatting of addresses across datasets
- Missing BBL/BIN values in some records
- Historical data may use different schemas
- Some datasets require transformations (as seen in dataset_transformations.py)

## Implications for Query Design

1. **Indexing Requirements**
   - Primary indices on BBL, BIN across all tables
   - Secondary indices on date fields, borough, neighborhood
   - Full-text search indices for address and owner name fields

2. **Join Optimization**
   - Pre-compute common joins for performance
   - Use materialized views for complex aggregations
   - Implement caching for frequently accessed queries

3. **Search Strategies**
   - Implement fuzzy matching for addresses and owner names
   - Support partial BBL searches (by borough, block)
   - Enable geographic radius searches

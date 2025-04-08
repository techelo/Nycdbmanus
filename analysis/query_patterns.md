# NYCDB Query Patterns Analysis

## Common Query Scenarios

### Property-Specific Queries
- **Lookup by BBL**: Retrieve all information about a specific property
- **Lookup by Address**: Find property information using street address
- **Lookup by BIN**: Get building-specific information
- **History Tracking**: View changes to a property over time (violations, sales, etc.)

### Geographic Area Queries
- **Neighborhood Analysis**: Data aggregation by neighborhood or community district
- **Borough-wide Statistics**: Comparisons across boroughs
- **Radius Search**: Find properties within a certain distance of a point
- **Zip Code Analysis**: Data aggregation by postal code

### Owner/Landlord Queries
- **Portfolio Analysis**: Find all properties owned by a specific entity
- **Violation Patterns**: Identify landlords with high violation counts
- **Litigation History**: Track legal actions against specific owners

### Temporal Queries
- **Recent Activity**: Violations, complaints, or sales within a time period
- **Trend Analysis**: Changes in violations or sales over time
- **Seasonal Patterns**: Identifying seasonal trends in complaints or violations

### Regulatory Compliance Queries
- **Active Violations**: Properties with open violations
- **Severe Violations**: Properties with high-severity or hazardous conditions
- **Compliance Tracking**: Monitor violation resolution timelines

## Query Complexity Factors

### Data Volume Considerations
- PLUTO: ~1 million records
- DOB Violations: ~2 million records
- HPD Violations: ~1 million records
- Sales records: Hundreds of thousands of records
- Multiple years of historical data

### Join Complexity
- Simple joins: 2-3 tables (e.g., PLUTO + HPD Violations)
- Medium joins: 4-6 tables (e.g., PLUTO + HPD Violations + DOB Violations + Sales)
- Complex joins: 7+ tables with multiple conditions

### Aggregation Requirements
- Count aggregations (violations per building, sales per neighborhood)
- Statistical aggregations (average sale price, median violation count)
- Temporal aggregations (monthly, quarterly, yearly trends)
- Geographic aggregations (by neighborhood, borough, zip code)

## Performance Optimization Strategies

### Indexing Strategy
- Primary keys: BBL, BIN
- Foreign keys: All BBL and BIN references
- Date fields: For temporal queries
- Text fields: Address components, owner names
- Geographic fields: For spatial queries

### Materialized Views
Potential candidates for materialized views:
- Property summary (combining PLUTO with violation counts)
- Neighborhood statistics (aggregations by geographic area)
- Owner portfolios (properties grouped by owner)
- Violation history (time-series data for common queries)

### Caching Approach
- Frequently accessed properties
- Popular geographic areas
- Common aggregation results
- Recent activity queries

## API Design Implications

### RESTful Endpoints
- `/properties/{bbl}` - Property details by BBL
- `/buildings/{bin}` - Building details by BIN
- `/addresses/{borough}/{street}/{number}` - Property lookup by address
- `/owners/{name}` - Properties by owner
- `/neighborhoods/{id}/properties` - Properties in a neighborhood
- `/violations?property={bbl}&start_date={date}&end_date={date}` - Filtered violations

### GraphQL Considerations
A GraphQL API could efficiently handle:
- Complex nested queries across multiple datasets
- Selective field retrieval for bandwidth optimization
- Batched requests for multiple properties
- Custom aggregations and filters

### Query Parameters
Common filter parameters:
- Geographic: borough, neighborhood, zip, radius
- Temporal: start_date, end_date, year
- Property: bbl, bin, address
- Regulatory: violation_type, severity, status
- Financial: sale_price_min, sale_price_max

## Web App Query Interface Requirements

Based on this analysis, the web app should provide:

1. **Flexible Search Interface**
   - Address search with autocomplete
   - BBL/BIN direct lookup
   - Owner name search
   - Geographic area selection (map-based)

2. **Filtering Capabilities**
   - Date range filters
   - Data type filters (violations, sales, complaints)
   - Status filters (open/closed, active/resolved)
   - Severity/priority filters

3. **Result Presentation**
   - Tabular data with sorting and pagination
   - Map visualization for geographic context
   - Time-series charts for temporal patterns
   - Summary statistics and aggregations

4. **Export Functionality**
   - CSV/Excel export for data analysis
   - PDF reports for documentation
   - API access for programmatic use

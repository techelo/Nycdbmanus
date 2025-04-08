# NYCDB Database Structure Analysis

## Overview
NYCDB is a comprehensive database of NYC housing data that includes multiple datasets from various city agencies. The database is designed to be loaded into PostgreSQL and provides a rich set of housing-related data for analysis and application development.

## Database Schema
Based on the repository exploration, the database consists of multiple tables, each corresponding to a dataset defined in the YAML configuration files. The schema is defined in SQL files located in the `src/nycdb/sql` directory.

### Key Datasets and Tables

1. **PLUTO** (Department of City Planning's Primary Land Use Tax Lot Output)
   - Contains extensive property and building information
   - Multiple versions available (latest and historical)
   - Primary key: BBL (Borough-Block-Lot)

2. **DOB Datasets**
   - `dob_jobs`: Department of Buildings job filings
   - `dob_complaints`: Complaints filed with DOB
   - `dob_violations`: Violations issued by DOB
   - `dob_certificate_occupancy`: Certificates of Occupancy
   - `dob_safety_violations`: Safety violations
   - `dob_vacate_orders`: Vacate orders issued by DOB

3. **HPD Datasets** (Housing Preservation and Development)
   - `hpd_violations`: Housing code violations
   - `hpd_registrations`: Building registrations with HPD
   - `hpd_complaints`: Complaints filed with HPD
   - `hpd_litigations`: Housing litigation cases
   - `hpd_charges`: Fee charges for violations
   - `hpd_affordable_production`: Affordable housing projects

4. **Financial Datasets**
   - `dof_sales`: Department of Finance property sales
   - `dof_annual_sales`: Annualized sales data
   - `dof_exemptions`: Property tax exemptions
   - `rentstab`: Rent stabilization unit counts
   - `dof_tax_lien_sale_list`: Tax lien sales

5. **Eviction Data**
   - `evictions`: Executed evictions
   - `marshal_evictions`: Marshal evictions

6. **Other Datasets**
   - `acris`: Property records from ACRIS
   - `oath_hearings`: Hearing records
   - `pad`: Property Address Directory
   - `nycha`: NYC Housing Authority developments
   - `boundaries`: Geographic boundaries (boroughs, neighborhoods, etc.)

## Common Data Fields and Relationships

### Primary Identifiers
- **BBL (Borough-Block-Lot)**: The most common identifier used across datasets
- **BIN (Building Identification Number)**: Used for building-specific data
- **Address**: Street address information (often normalized)

### Common Relationships
- Most datasets can be joined using BBL as the primary key
- Building-specific datasets can be joined using BIN
- Address fields can be used for fuzzy matching when BBL/BIN are not available

## Data Types and Formats

Based on the YAML configuration files, the database uses these common data types:
- `text`: For text of any length
- `char(n)`: For fixed-length text
- `date`: For date fields
- `integer`, `smallint`, `bigint`: For non-decimal numbers
- `numeric`: For decimal numbers
- `boolean`: For true/false values
- Spatial data types (for boundary datasets)

## Database Access Patterns

The repository includes information about using PostgREST to create an API for the database. This suggests that the primary access pattern is through SQL queries, which can be exposed via a REST API.

Key query patterns likely include:
1. Property-specific queries (by BBL, BIN, or address)
2. Geographic area queries (by borough, neighborhood, zip code)
3. Time-based queries (violations or sales within a date range)
4. Aggregate queries (counts, averages, etc. for reporting)
5. Complex joins across multiple datasets

## Implications for Web App Design

Based on this analysis, our web app should:

1. **Provide a unified interface** to query across multiple datasets
2. **Support property-centric views** that aggregate data from multiple tables for a specific property
3. **Enable geographic exploration** through maps and area-based filtering
4. **Implement efficient search** by BBL, BIN, address, and other identifiers
5. **Support data visualization** for trends and patterns
6. **Enable complex filtering** across multiple dimensions (time, location, data type)
7. **Optimize for performance** when joining large datasets

The database structure suggests a web app architecture with:
- A robust backend API that can handle complex SQL queries
- A flexible frontend that can display different types of housing data
- Caching mechanisms for frequently accessed data
- Visualization components for geographic and statistical data

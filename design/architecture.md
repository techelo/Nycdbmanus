# NYCDB Web App Architecture

## Overview

The NYCDB Web App will be a modern, responsive application that provides an intuitive interface for accessing and analyzing NYC housing data. The architecture is designed to handle complex queries across multiple datasets while maintaining performance and usability.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Application                     │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    React    │  │   Redux     │  │      UI Components      │  │
│  │  Components │  │   Store     │  │  (Maps, Charts, Tables) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                           API Gateway                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Backend Services                         │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Property   │  │ Violation   │  │   Search    │              │
│  │   Service   │  │  Service    │  │   Service   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ Geographic  │  │  Analytics  │  │    Auth     │              │
│  │   Service   │  │   Service   │  │   Service   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Data Access Layer                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │    Query    │  │    Cache    │  │  PostgREST  │              │
│  │  Builder    │  │   Manager   │  │   Client    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Database Layer                           │
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│  │      PostgreSQL         │  │         PostGIS             │   │
│  │    (NYCDB Database)     │  │  (Spatial Data Extension)   │   │
│  └─────────────────────────┘  └─────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React.js with Next.js for server-side rendering
- **State Management**: Redux Toolkit for global state
- **UI Components**: Material-UI for clean, modern interface
- **Maps**: Mapbox GL JS for interactive maps
- **Charts**: D3.js and Recharts for data visualization
- **Tables**: React Table for data display with sorting/filtering
- **API Client**: Axios for HTTP requests
- **Type Safety**: TypeScript for improved developer experience

### Backend
- **Framework**: Node.js with Express.js
- **API Design**: RESTful API with GraphQL support for complex queries
- **Authentication**: JWT-based authentication (optional)
- **Database Access**: PostgREST for direct SQL access
- **Caching**: Redis for query caching
- **Performance**: Node.js clustering for horizontal scaling

### Database
- **Primary Database**: PostgreSQL (existing NYCDB database)
- **Spatial Extension**: PostGIS for geographic queries
- **Indexing**: Custom indexes for performance optimization
- **Views**: Materialized views for common query patterns

### DevOps
- **Containerization**: Docker for consistent environments
- **Deployment**: Docker Compose for local development, Kubernetes for production
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Monitoring**: Prometheus and Grafana for performance monitoring

## Component Details

### Frontend Components

1. **Layout Components**
   - Header with navigation and search
   - Responsive sidebar for filters
   - Main content area with tabs
   - Footer with links and information

2. **Search Components**
   - Address search with autocomplete
   - BBL/BIN direct lookup
   - Owner name search
   - Advanced search with multiple criteria

3. **Map Components**
   - Interactive city map with property markers
   - Neighborhood/borough overlays
   - Heatmaps for violation density
   - Property selection and highlighting

4. **Data Display Components**
   - Property detail cards
   - Violation tables with filtering
   - Timeline visualizations
   - Statistical charts and graphs

5. **Filter Components**
   - Date range selectors
   - Category filters (violations, sales, etc.)
   - Status filters (open/closed)
   - Geographic area selectors

### Backend Services

1. **Property Service**
   - Retrieve property details by BBL/BIN
   - Get property history
   - Fetch related properties

2. **Violation Service**
   - Get violations by property
   - Search violations by type/severity
   - Track violation status

3. **Search Service**
   - Address geocoding and normalization
   - Full-text search across datasets
   - Owner name resolution

4. **Geographic Service**
   - Neighborhood boundary data
   - Spatial queries and aggregations
   - Map data preparation

5. **Analytics Service**
   - Statistical aggregations
   - Trend analysis
   - Report generation

### Data Access Layer

1. **Query Builder**
   - Construct optimized SQL queries
   - Handle complex joins across datasets
   - Apply security filters

2. **Cache Manager**
   - Cache frequent queries
   - Invalidate cache on updates
   - Manage cache size and TTL

3. **PostgREST Client**
   - Interface with PostgREST API
   - Handle authentication
   - Manage connections

## API Design

### RESTful Endpoints

```
GET /api/properties?q={search_term}                # Search properties
GET /api/properties/{bbl}                          # Get property by BBL
GET /api/properties/{bbl}/violations               # Get violations for property
GET /api/properties/{bbl}/sales                    # Get sales history for property

GET /api/buildings/{bin}                           # Get building by BIN
GET /api/buildings/{bin}/violations                # Get violations for building

GET /api/owners/{name}/properties                  # Get properties by owner

GET /api/violations?property={bbl}&type={type}     # Search violations

GET /api/neighborhoods                             # List neighborhoods
GET /api/neighborhoods/{id}/properties             # Get properties in neighborhood
GET /api/neighborhoods/{id}/stats                  # Get stats for neighborhood

GET /api/map/tiles/{z}/{x}/{y}                     # Get map tiles
GET /api/map/geojson?layer={layer}                 # Get GeoJSON for map layer
```

### GraphQL Schema (Optional)

For complex queries, a GraphQL endpoint will be provided:

```
/api/graphql
```

Example GraphQL query:

```graphql
query {
  property(bbl: "1000010001") {
    address
    borough
    block
    lot
    buildingCount
    violations {
      count
      open
      severe
      recent(days: 90)
    }
    buildings {
      bin
      stories
      units
      yearBuilt
    }
    sales(limit: 5) {
      date
      price
      buyer
      seller
    }
  }
}
```

## User Experience Flow

1. **Landing Page**
   - Quick search bar (address, BBL, BIN)
   - Featured neighborhoods
   - Recent activity dashboard
   - Quick links to common queries

2. **Search Results**
   - List view with key property details
   - Map view showing property locations
   - Filters for refining results
   - Sorting options

3. **Property Detail**
   - Property summary card
   - Tabs for different data categories:
     - Building Information
     - Violations & Complaints
     - Ownership & Sales
     - Tenant Information
   - Timeline of property events
   - Map showing property location

4. **Data Exploration**
   - Interactive maps for geographic analysis
   - Charts for trend visualization
   - Comparison tools for multiple properties
   - Export options for data

## Performance Considerations

1. **Query Optimization**
   - Use materialized views for common queries
   - Implement efficient joins based on analysis
   - Apply appropriate indexing strategy

2. **Caching Strategy**
   - Cache property details (high reuse, low change frequency)
   - Cache search results with short TTL
   - Cache map tiles and GeoJSON

3. **Pagination and Lazy Loading**
   - Implement cursor-based pagination for large result sets
   - Lazy load related data on demand
   - Use infinite scrolling for long lists

4. **Frontend Optimization**
   - Code splitting for faster initial load
   - Memoization of expensive calculations
   - Virtualized lists for large datasets

## Security Considerations

1. **API Security**
   - Rate limiting to prevent abuse
   - Input validation and sanitization
   - CORS configuration

2. **Data Privacy**
   - Filter sensitive information
   - Respect data usage policies
   - Implement appropriate access controls

## Accessibility Features

1. **WCAG Compliance**
   - Proper contrast ratios
   - Keyboard navigation
   - Screen reader support

2. **Responsive Design**
   - Mobile-friendly layouts
   - Touch-optimized controls
   - Adaptive content based on device

## Future Expansion

The architecture is designed to be extensible for future features:

1. **User Accounts**
   - Saved searches
   - Watchlists for properties
   - Custom dashboards

2. **Notifications**
   - Alerts for new violations
   - Updates on property status changes
   - Custom notification criteria

3. **Advanced Analytics**
   - Predictive models for violations
   - Landlord behavior analysis
   - Neighborhood trend forecasting

4. **Integration with Other Systems**
   - Court records
   - City planning data
   - Census demographic data

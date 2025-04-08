# NYCDB Web App UI Design

## Design Principles

### 1. Clean and Intuitive
- Minimalist design with clear visual hierarchy
- Consistent UI patterns throughout the application
- Intuitive navigation with breadcrumbs and context awareness

### 2. Data-Focused
- Prioritize data visibility and readability
- Effective use of typography to distinguish data types
- Clear data relationships through visual connections

### 3. Responsive and Accessible
- Fully responsive design for all device sizes
- WCAG 2.1 AA compliance for accessibility
- Touch-friendly interface elements

### 4. Performance-Oriented
- Progressive loading of content
- Optimized rendering for large datasets
- Visual feedback for loading states

## Color Palette

### Primary Colors
- **Primary Blue**: #1976d2 - Main brand color, primary actions
- **Secondary Teal**: #00796b - Secondary actions, highlights
- **Neutral Gray**: #f5f5f5 - Backgrounds, containers

### Semantic Colors
- **Success Green**: #4caf50 - Positive status, confirmations
- **Warning Amber**: #ff9800 - Alerts, warnings
- **Error Red**: #f44336 - Errors, critical violations
- **Info Blue**: #2196f3 - Informational elements

### Data Visualization Colors
- **Chart Primary**: #3f51b5
- **Chart Secondary**: #009688
- **Chart Tertiary**: #ff5722
- **Chart Quaternary**: #9c27b0
- **Chart Quinary**: #607d8b

## Typography

### Font Families
- **Primary Font**: Roboto - Clean, modern sans-serif for general UI
- **Monospace Font**: Roboto Mono - For code, BBL/BIN numbers

### Type Scale
- **Display**: 34px/2.125rem - Page titles
- **Heading 1**: 24px/1.5rem - Section headers
- **Heading 2**: 20px/1.25rem - Subsection headers
- **Heading 3**: 16px/1rem - Card titles
- **Body 1**: 16px/1rem - Primary content
- **Body 2**: 14px/0.875rem - Secondary content
- **Caption**: 12px/0.75rem - Supporting text

## Layout Components

### App Shell
```
┌─────────────────────────────────────────────────────────────────┐
│                           Header                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────┐  ┌─────────────────────────────────────────────┐ │
│  │           │  │                                             │ │
│  │           │  │                                             │ │
│  │           │  │                                             │ │
│  │ Sidebar   │  │             Main Content                    │ │
│  │           │  │                                             │ │
│  │           │  │                                             │ │
│  │           │  │                                             │ │
│  └───────────┘  └─────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                           Footer                                │
└─────────────────────────────────────────────────────────────────┘
```

### Header
- Logo and app name
- Global search bar
- Navigation menu
- User account menu (if applicable)

### Sidebar
- Collapsible for mobile views
- Filter controls
- Dataset selection
- Quick navigation links

### Main Content
- Tab navigation for different views
- Content cards for data display
- Data tables with sorting/filtering
- Maps and visualizations

### Footer
- Links to documentation
- Attribution information
- Version information

## Key UI Components

### Search Interface
```
┌─────────────────────────────────────────────────────────────────┐
│  Search NYC Housing Data                                     🔍  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ By Address              │ │ By BBL          │ │ By Owner        │
└─────────────────────────┘ └─────────────────┘ └─────────────────┘
```

### Property Card
```
┌─────────────────────────────────────────────────────────────────┐
│ 123 Main Street, Manhattan                                  ⋮   │
│ BBL: 1001230045                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Building Type: Multi-Family Residential                        │
│  Year Built: 1930                                               │
│  Stories: 6                                                     │
│  Units: 24                                                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────────┐ │
│ │ Violations│ │ Complaints│ │ Sales     │ │ View Full Details │ │
│ └───────────┘ └───────────┘ └───────────┘ └───────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Data Table
```
┌─────────────────────────────────────────────────────────────────┐
│ Violations (24)                                     Export ⋮    │
├────────────┬──────────────┬────────────┬────────────┬───────────┤
│ Date ▼     │ Type         │ Status     │ Severity   │ Details   │
├────────────┼──────────────┼────────────┼────────────┼───────────┤
│ 2025-03-15 │ Heat/Hot     │ OPEN       │ Class C    │ 🔍        │
│            │ Water        │            │            │           │
├────────────┼──────────────┼────────────┼────────────┼───────────┤
│ 2025-02-28 │ Mold         │ OPEN       │ Class B    │ 🔍        │
├────────────┼──────────────┼────────────┼────────────┼───────────┤
│ 2025-01-10 │ Window Guard │ CLOSED     │ Class A    │ 🔍        │
└────────────┴──────────────┴────────────┴────────────┴───────────┘
                         1-3 of 24 ◀ 1 ▶
```

### Map Interface
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │                                                             │ │
│ │                                                             │ │
│ │                      Interactive Map                        │ │
│ │                                                             │ │
│ │                                                             │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│ │ Violations    │ │ Sales         │ │ Complaints    │          │
│ └───────────────┘ └───────────────┘ └───────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Filter Panel
```
┌─────────────────────────────────────────────────────────────────┐
│ Filters                                           Clear All     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Date Range                                                      │
│ ┌─────────────────┐   ┌─────────────────┐                       │
│ │ From            │   │ To              │                       │
│ └─────────────────┘   └─────────────────┘                       │
│                                                                 │
│ Borough                                                         │
│ ☑ Manhattan  ☑ Brooklyn  ☑ Queens  ☑ Bronx  ☑ Staten Island    │
│                                                                 │
│ Violation Type                                                  │
│ ☑ Heat/Hot Water                                                │
│ ☐ Mold                                                          │
│ ☐ Lead                                                          │
│ ☐ Pests                                                         │
│ ☐ Other                                                         │
│                                                                 │
│ Violation Status                                                │
│ ☑ Open  ☐ Closed                                                │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                      Apply Filters                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Data Visualization
```
┌─────────────────────────────────────────────────────────────────┐
│ Violation Trends                                      ⟳  ⋮      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │                                                         │    │
│  │                                                         │    │
│  │                     Line Chart                          │    │
│  │                                                         │    │
│  │                                                         │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Jan   Feb   Mar   Apr   May   Jun   Jul   Aug   Sep   Oct     │
│                                                                 │
│  ● Heat/Hot Water  ● Mold  ● Lead  ● Pests  ● Other            │
└─────────────────────────────────────────────────────────────────┘
```

## Page Designs

### Landing Page
- Hero section with search bar
- Quick stats dashboard
- Featured neighborhoods
- Recent activity feed
- Quick links to common queries

### Search Results Page
- Results count and summary
- Toggle between list and map views
- Sorting and filtering options
- Pagination controls
- Export functionality

### Property Detail Page
- Property header with key information
- Tab navigation:
  - Overview
  - Building Details
  - Violations & Complaints
  - Ownership & Sales
  - Tenant Information
- Related properties section
- Timeline visualization

### Data Explorer Page
- Interactive map as primary interface
- Data layer controls
- Advanced filtering panel
- Statistics and aggregations
- Comparison tools

### Analytics Dashboard
- Customizable widget layout
- Violation trend charts
- Geographic distribution maps
- Top landlords by violations
- Neighborhood comparison tools

## Mobile Adaptations

### Mobile Navigation
- Bottom navigation bar for primary actions
- Hamburger menu for secondary navigation
- Collapsible filters
- Full-width cards and tables

### Touch Optimizations
- Larger touch targets (minimum 44x44px)
- Swipe gestures for navigation
- Pull-to-refresh for data updates
- Bottom sheets for filters and details

## Animation and Interaction

### Transitions
- Smooth page transitions (300ms)
- Card expansion animations
- Loading state animations
- Data update transitions

### Feedback
- Button state changes on interaction
- Toast notifications for actions
- Progress indicators for long operations
- Error states with recovery options

## Accessibility Features

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and landmarks
- Focus management
- Alternative text for visual elements

### Keyboard Navigation
- Logical tab order
- Keyboard shortcuts for common actions
- Focus indicators
- Skip navigation links

### Color and Contrast
- Minimum contrast ratio of 4.5:1
- Color not used as the only means of conveying information
- High contrast mode support
- Text resizing support up to 200%

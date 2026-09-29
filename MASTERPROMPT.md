# TRAVELMATE — MASTER SYSTEM PROMPT

## AI-POWERED ITINERARY PLANNING SYSTEM

> This document is the PRIMARY SOURCE OF TRUTH for the TravelMate codebase.
>
> All AI coding agents working on this repository must read and understand this document before creating, modifying, deleting, refactoring, or generating code.
>
> The system must remain aligned with the requirements, architecture, features, workflows, and constraints described in this document.

---

# 1. PROJECT IDENTITY

## Project Name

**TravelMate**

## Project Type

AI-Powered Web-Based Travel Planning and Itinerary Generation System

## Primary Goal

TravelMate simplifies and automates the process of planning a trip.

Instead of requiring users to manually visit multiple websites to:

- search for destinations
- search for flights
- search for hotels
- find tourist attractions
- compare prices
- check weather
- estimate travel expenses
- organize daily schedules

TravelMate should consolidate these tasks into one system.

The system generates a personalized day-by-day itinerary based on:

- Destination
- Travel dates
- Budget
- Interests
- User preferences
- Available travel options
- Weather conditions
- Crowd conditions when available

TravelMate must help users make better travel decisions while reducing the time and effort required to organize a trip.

---

# 2. SOURCE OF TRUTH RULE

This file represents the intended behavior of TravelMate.

When modifying the system, follow this priority:

1. Explicit instructions from the project owner
2. This `MASTERPROMPT.md`
3. Existing project architecture and conventions
4. Existing implementation
5. Developer assumptions

Existing code should NOT automatically be treated as correct.

If existing code conflicts with this master prompt, modify the implementation to follow this document unless doing so would destroy important working functionality.

Do not randomly redesign or restructure working parts of the project.

Before making major changes:

1. Inspect the existing repository.
2. Understand the current frontend.
3. Understand the current backend.
4. Understand the database schema.
5. Identify existing APIs.
6. Identify already completed features.
7. Compare them with this master prompt.
8. Implement only what is missing, incomplete, broken, or inconsistent.

DO NOT recreate the entire application from scratch if substantial working functionality already exists.

---

# 3. PROJECT DESCRIPTION

TravelMate is an AI-powered web-based trip planning system designed to simplify and automate travel planning.

The system allows users to provide their travel preferences and automatically creates a personalized travel itinerary.

Users should be able to specify information such as:

- Destination
- Start date
- End date
- Budget
- Interests
- Travel preferences

TravelMate then processes this information and generates a structured itinerary.

The application should also be capable of:

- retrieving travel-related data
- comparing travel options
- estimating costs
- monitoring weather
- considering crowd conditions
- optimizing recommendations around the user's budget
- allowing users to modify their itinerary
- saving itineraries to their account
- retrieving previously saved trips

TravelMate must function as a travel planning assistant rather than simply being an AI chatbot.

---

# 4. STATEMENT OF THE PROBLEM

Planning a trip can be time-consuming and stressful.

Travelers commonly need to use several different websites or applications when planning a single trip.

Users may separately search for:

- Flights
- Hotels
- Tourist attractions
- Activities
- Transportation
- Weather
- Prices
- Schedules

Users must then manually organize the collected information into a usable travel plan.

This introduces several problems:

### 4.1 Fragmented Travel Information

Travel information comes from different platforms and providers.

### 4.2 Difficult Price Comparison

Users must manually compare prices between different travel providers.

### 4.3 Budget Management

Travelers may struggle to determine whether their planned activities and accommodations fit their available budget.

### 4.4 Time-Consuming Itinerary Creation

Creating a complete day-by-day schedule manually requires significant effort.

### 4.5 Unexpected Conditions

Weather and crowd conditions may affect activities after the itinerary has been created.

### 4.6 Decision Overload

Travelers are presented with many choices without an easy way to determine which options best match their preferences and budget.

TravelMate exists to address these problems.

---

# 5. PROBLEMS THE SYSTEM MUST SOLVE

TravelMate must:

1. Reduce the amount of time required for manual trip planning.
2. Reduce the need to switch between multiple travel websites.
3. Help users remain within their travel budget.
4. Generate personalized travel itineraries.
5. Compare available travel options.
6. Estimate travel costs.
7. Provide weather information relevant to the trip.
8. Provide crowd information or crowd estimates when such information is available.
9. Allow plans to adapt when conditions change.
10. Allow users to save, retrieve, and modify trip plans.
11. Simplify travel-related decision-making.

Every major feature implemented in the application should support at least one of these goals.

---

# 6. TARGET USERS

The primary actor is:

## User

TravelMate may be used by different types of travelers, including:

- Students
- Families
- Professionals
- Budget travelers
- General leisure travelers

These categories are traveler profiles/personas.

They DO NOT automatically represent different authorization levels.

Unless explicitly required later, all normal users have the same application permissions.

The system may use traveler type as a personalization preference.

---

# 7. EXTERNAL SYSTEMS

TravelMate communicates with external systems.

Possible external systems include:

### Travel APIs

Used to retrieve:

- Flights
- Hotels
- Activities
- Attractions
- Travel-related pricing information

### Weather API

Used to retrieve:

- Current weather
- Weather forecasts
- Relevant weather conditions

### Crowd Data Provider

Used when available to obtain:

- Crowd levels
- Estimated visitor congestion
- Attraction popularity

Crowd information may not always be available.

NEVER fabricate real-time crowd information.

If crowd information is estimated rather than retrieved from a verified external source, clearly identify it as an estimate.

### AI Service

Used for:

- itinerary generation
- itinerary optimization
- recommendation generation
- converting travel information into a structured trip plan

Preferred AI provider:

**OpenAI API**

The AI provider must be abstracted enough that another compatible provider could be introduced later.

### Database

Used to store:

- user information
- travel preferences
- trips
- generated itineraries
- saved plans
- cost estimates
- relevant cached external information

---

# 8. CANONICAL TECHNOLOGY STACK

Unless the existing repository is already substantially implemented using another approved stack, use the following stack.

## Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Neon PostgreSQL when cloud hosting is required

## ORM

Preferred:

- Prisma ORM

If the existing project already uses a different PostgreSQL-compatible database layer successfully, do not replace it unnecessarily.

## AI

- OpenAI API

## Development Tools

- VS Code
- Git
- GitHub
- npm

---

# 9. APPROVED ALTERNATIVE TECHNOLOGIES

The original project specification allows:

Frontend:

- HTML
- CSS
- JavaScript
- Tailwind CSS
- React / Next.js

Backend:

- PHP with PDO
- Node.js with Express

Database:

- MySQL
- PostgreSQL
- Neon PostgreSQL

However, DO NOT mix architectures unnecessarily.

For example, do not create half of the backend in PHP and half in Express unless there is a legitimate architectural reason.

Maintain one coherent backend architecture.

If an existing implementation already uses PHP/PDO/MySQL and is significantly complete, preserve it unless the project owner requests migration.

---

# 10. HIGH-LEVEL SYSTEM ARCHITECTURE

The application should conceptually follow:

User

↓

Frontend Application

↓

Backend API

↓

Application Services

↓

- Database
- Travel Provider
- Weather Provider
- Crowd Provider
- AI Provider

Conceptually:

```text
User
  |
  v
TravelMate Frontend
  |
  v
TravelMate Backend API
  |
  +--------------------------+
  |                          |
  v                          v
Database                External Services
                             |
                 +-----------+------------+
                 |           |            |
                 v           v            v
             Travel API  Weather API   AI Service
                                       / Crowd Data
```

External APIs should NOT be called directly from client-side components when API keys or sensitive credentials are required.

Sensitive external API requests must go through the backend.

---

# 11. CORE USE CASES

The official TravelMate use cases are:

## USER-FACING USE CASES

### UC-01 — Register / Login

The user can:

- Create an account
- Login
- Logout
- Access authenticated TravelMate features

---

### UC-02 — Set Trip Preferences

The user provides information needed to plan the trip.

Required core preferences:

- Destination
- Start date
- End date
- Budget
- Interests

Additional fields may be introduced when useful, including:

- Number of travelers
- Travel style
- Preferred activities
- Accommodation preference
- Preferred pace
- Transportation preference
- Traveler type

Do not make unnecessary fields mandatory.

### Include relationship

`Set Trip Preferences`

includes:

`Process User Input`

---

### UC-03 — Generate Trip Itinerary

TravelMate generates a day-by-day trip itinerary using the user's preferences.

The itinerary should consider:

- destination
- travel dates
- interests
- available budget
- travel options
- weather data when available
- crowd data when available

### Include relationship

`Generate Trip Itinerary`

includes:

`Generate Itinerary Using AI`

---

### UC-04 — Compare Prices

Users should be able to compare available options for:

- Flights
- Hotels
- Activities

When real provider data is available, TravelMate should normalize the results so that options from different providers can be compared consistently.

### Include relationship

`Compare Prices`

includes:

`Fetch Travel Data`

Travel data includes:

- Flights
- Hotels
- Activities

---

### UC-05 — View Budget & Cost Prediction

Users should be able to see an estimated total cost for their trip.

The system should compare:

**Available Budget**

versus

**Estimated Trip Cost**

Possible categories can include:

- Flights / major transportation
- Accommodation
- Activities
- Local transportation
- Food estimate
- Miscellaneous estimate

The exact categories can be adapted depending on available information.

### Include relationship

`View Budget & Cost Prediction`

includes:

`Predict Costs & Optimize Budget`

---

### UC-06 — Check Weather & Crowd Conditions

Users should be able to check conditions relevant to their trip.

Weather may include:

- Temperature
- Weather condition
- Rain probability
- Forecast

Crowd information may include:

- Low
- Moderate
- High
- Unknown

### Include relationship

`Check Weather & Crowd Conditions`

includes:

`Fetch Weather & Crowd Data`

---

### UC-07 — View / Edit / Save Trip Plan

Users must be able to:

- View generated itinerary
- Edit itinerary
- Remove itinerary activities
- Add custom activities
- Modify itinerary items
- Save the trip
- Return to a saved trip later

### Include relationship

`View / Edit / Save Trip Plan`

includes:

`Store and Retrieve User Data`

---

### UC-08 — Manage Profile

Users should be able to manage account/profile information.

Possible editable information:

- Name
- Email
- Traveler type
- General interests
- Default travel preferences

Profile data must be stored persistently.

---

# 12. INTERNAL SYSTEM USE CASES

These are system responsibilities rather than standalone user pages.

## Process User Input

Responsible for:

- validating trip preferences
- normalizing inputs
- checking dates
- checking budget
- preparing data for subsequent services

---

## Generate Itinerary Using AI

Responsible for:

- constructing AI requests
- supplying relevant trip context
- generating itinerary structure
- validating AI output
- returning structured itinerary data

---

## Fetch Travel Data

Responsible for obtaining:

- flight options
- hotel options
- activities

through external providers.

---

## Fetch Weather & Crowd Data

Responsible for retrieving available condition information.

---

## Predict Costs & Optimize Budget

Responsible for:

- calculating estimated trip costs
- comparing estimated costs to budget
- identifying over-budget plans
- suggesting lower-cost alternatives
- assisting itinerary optimization

---

## Store and Retrieve User Data

Responsible for persistence of:

- users
- profiles
- preferences
- trips
- itineraries
- itinerary modifications
- saved plans

---

# 13. PRIMARY USER FLOW

The standard TravelMate workflow should be:

```text
Register / Login
       ↓
Dashboard
       ↓
Create New Trip
       ↓
Set Trip Preferences
       ↓
Validate Preferences
       ↓
Retrieve Travel Data
       ↓
Retrieve Weather / Crowd Information
       ↓
Estimate Trip Cost
       ↓
Generate Itinerary With AI
       ↓
Display Day-by-Day Itinerary
       ↓
Review Budget
       ↓
Compare Travel Options
       ↓
Edit / Regenerate if Necessary
       ↓
Save Trip
       ↓
Access Saved Trip Later
```

The UI does not have to force the user through every data source synchronously.

External information may load progressively.

---

# 14. CORE SYSTEM FEATURES

## 14.1 AI-Powered Itinerary Generator

This is a major feature.

The system automatically creates a structured day-by-day itinerary based on user preferences.

A generated itinerary should normally contain:

- Trip title
- Destination
- Travel dates
- Short overview
- Daily itinerary
- Activities
- Approximate activity times
- Locations
- Estimated costs when available
- Relevant notes
- Weather considerations when available

Example structure:

```json
{
  "destination": "Tokyo, Japan",
  "overview": "5-day cultural and food-focused trip",
  "days": [
    {
      "day": 1,
      "date": "2026-10-01",
      "activities": [
        {
          "time": "09:00",
          "title": "Visit Senso-ji",
          "location": "Asakusa",
          "estimatedCost": 0,
          "notes": "Recommended morning visit"
        }
      ]
    }
  ]
}
```

The exact schema may evolve, but AI output MUST be structured and validated.

Do not simply store uncontrolled AI-generated Markdown as the entire itinerary.

---

# 15. AI GENERATION RULES

The AI component must behave as a planning engine.

It must receive relevant information such as:

```text
Destination
Dates
Budget
Interests
Travel style
Number of travelers
Known travel prices
Weather
Crowd information
```

The AI should then generate an itinerary.

## Critical AI Rules

The AI MUST NOT:

- invent confirmed flight availability
- invent confirmed hotel availability
- invent real-time prices
- claim a price is live when it is not
- fabricate weather information
- fabricate crowd information
- imply bookings were completed
- imply reservations exist when they do not

If external provider data is supplied, use it.

If data is unavailable, the AI may provide reasonable estimates only when clearly labeled as:

**Estimated**

or

**Approximate**

---

# 16. AI OUTPUT VALIDATION

Never blindly trust AI output.

AI-generated results must be validated before saving.

Validate:

- JSON structure
- dates
- itinerary days
- missing required fields
- cost values
- duplicate days
- malformed activities

Use schema validation.

Preferred implementation:

- Zod

or another appropriate validation library already used by the project.

If AI output fails validation:

1. Attempt controlled repair/retry.
2. Do not save invalid data.
3. Return a useful error message if generation still fails.

---

# 17. BUDGET SYSTEM

Every trip has an optional or required travel budget depending on the trip creation flow.

The system should calculate:

```text
Estimated Trip Cost
```

and compare it with:

```text
User Budget
```

Example:

```text
Budget:            ₱50,000
Estimated Cost:    ₱43,500
Remaining Budget:   ₱6,500
```

If over budget:

```text
Budget:            ₱50,000
Estimated Cost:    ₱57,000
Over Budget By:     ₱7,000
```

The application should visually indicate whether the itinerary is:

- Within budget
- Near budget limit
- Over budget

Do not calculate costs only in the frontend.

Important cost calculations should be available through backend/domain logic so calculations remain consistent.

---

# 18. BUDGET OPTIMIZATION

If estimated cost exceeds the user's budget, TravelMate should be capable of suggesting alternatives such as:

- cheaper accommodation
- lower-priced activities
- free attractions
- different activity combinations
- lower-cost transportation options

The system should not silently remove itinerary items.

The user must be able to understand what changed.

---

# 19. PRICE COMPARISON

Price comparison should support:

## Flights

Possible fields:

- Provider
- Airline
- Origin
- Destination
- Departure
- Arrival
- Price
- Currency
- Stops
- Booking/reference URL when available

## Hotels

Possible fields:

- Hotel name
- Provider
- Location
- Nightly price
- Total price
- Rating when available
- Check-in
- Check-out
- Booking/reference URL when available

## Activities

Possible fields:

- Activity name
- Provider
- Location
- Date/time when available
- Price
- Currency
- Reference URL

Every price result should preferably contain a:

```text
fetchedAt
```

timestamp.

This helps distinguish current provider information from previously cached information.

---

# 20. EXTERNAL PROVIDER ARCHITECTURE

Do not tightly couple business logic to one external API.

Create provider/service abstractions.

Conceptual example:

```ts
interface TravelProvider {
  searchFlights(...)
  searchHotels(...)
  searchActivities(...)
}

interface WeatherProvider {
  getForecast(...)
}

interface CrowdProvider {
  getCrowdConditions(...)
}

interface AIProvider {
  generateItinerary(...)
}
```

The actual naming can follow the project's conventions.

The important requirement is separation of concerns.

Changing the travel API should not require rewriting the entire itinerary system.

---

# 21. DEVELOPMENT MOCK MODE

External travel APIs may require:

- paid accounts
- API keys
- quotas
- approval

Development must still be possible without these credentials.

Therefore provider integrations may support development/mock mode.

Example:

```env
USE_MOCK_TRAVEL_DATA=true
```

However:

MOCK DATA MUST NEVER BE PRESENTED AS LIVE DATA.

The interface should clearly identify development/sample data when mock mode is enabled.

Production behavior must not silently fall back to fake real-time information.

---

# 22. WEATHER HANDLING

Weather information should come from an actual weather provider whenever available.

Store useful information such as:

- Date
- Temperature
- Condition
- Rain probability
- Weather description
- Data source
- Time retrieved

Trips far in the future may not have reliable weather forecasts.

In such situations, do not fabricate forecasts.

Display something similar to:

```text
Weather forecast is not yet available for these travel dates.
```

The system can refresh forecasts when the trip becomes closer.

---

# 23. CROWD CONDITION HANDLING

Crowd data is optional because reliable crowd information may not exist for every destination.

Possible crowd status:

```text
LOW
MODERATE
HIGH
UNKNOWN
```

If crowd data is generated through historical patterns or heuristics rather than a real-time source, label it clearly as:

```text
Estimated Crowd Level
```

Never label estimated crowd data as live.

---

# 24. ITINERARY ADJUSTMENT

Weather and crowd information should have the ability to influence itinerary recommendations.

Examples:

### Weather

If heavy rain is predicted:

- recommend indoor attractions
- recommend moving outdoor activities
- explain the adjustment

### Crowds

If an attraction is expected to be crowded:

- suggest visiting earlier
- suggest another time
- suggest an alternative attraction

Do not automatically overwrite a user's manually edited itinerary without confirmation.

---

# 25. USER ACCOUNTS

The system must include authentication.

Required functionality:

- Register
- Login
- Logout
- Retrieve current user
- Protected routes

Passwords must NEVER be stored in plain text.

Use a secure hashing mechanism such as:

- bcrypt
- argon2

Never return password hashes to the frontend.

---

# 26. AUTHENTICATION SECURITY

Preferred authentication approach:

Secure server-managed session or JWT authentication using HTTP-only cookies.

Avoid storing sensitive authentication tokens in browser localStorage when a secure HTTP-only cookie architecture is available.

Production cookies should use appropriate:

- HttpOnly
- Secure
- SameSite

settings.

Authentication routes should have appropriate rate limiting.

---

# 27. USER PROFILE

Suggested profile structure:

```text
User
- id
- email
- passwordHash
- createdAt
- updatedAt

Profile
- id
- userId
- name
- travelerType
- defaultInterests
- createdAt
- updatedAt
```

Actual database naming may follow existing project conventions.

---

# 28. TRIP DATA MODEL

A trip is the central entity of TravelMate.

Conceptual structure:

```text
Trip
- id
- userId
- title
- destination
- startDate
- endDate
- budget
- currency
- status
- createdAt
- updatedAt
```

Suggested trip statuses:

```text
DRAFT
GENERATED
SAVED
COMPLETED
ARCHIVED
```

Do not over-engineer status management if the project only needs a subset.

---

# 29. TRIP PREFERENCES DATA MODEL

Conceptually:

```text
TripPreference
- id
- tripId
- interests
- travelerType
- numberOfTravelers
- travelStyle
- preferredActivities
- accommodationPreference
- transportationPreference
- notes
```

Only fields actually used by the application should be mandatory.

Destination, dates, budget, and interests remain the core planning inputs.

---

# 30. ITINERARY DATA MODEL

Recommended conceptual structure:

```text
Itinerary
- id
- tripId
- version
- summary
- totalEstimatedCost
- generatedByAI
- createdAt
- updatedAt
```

```text
ItineraryDay
- id
- itineraryId
- date
- dayNumber
- title
- notes
```

```text
ItineraryItem
- id
- itineraryDayId
- startTime
- endTime
- title
- description
- location
- category
- estimatedCost
- currency
- weatherSensitive
- sortOrder
```

The actual implementation may use relational records or structured JSON depending on existing architecture.

Prefer relational structures when users need frequent editing of individual itinerary items.

---

# 31. TRAVEL OPTION DATA MODEL

Possible normalized model:

```text
TravelOption
- id
- tripId
- type
- provider
- title
- price
- currency
- details
- externalUrl
- fetchedAt
```

Possible types:

```text
FLIGHT
HOTEL
ACTIVITY
```

Provider-specific information may be stored in structured JSON when necessary.

---

# 32. CONDITION DATA

Possible weather structure:

```text
WeatherSnapshot
- tripId
- location
- date
- condition
- temperature
- rainProbability
- source
- fetchedAt
```

Possible crowd structure:

```text
CrowdSnapshot
- tripId
- location
- date
- level
- isEstimate
- source
- fetchedAt
```

---

# 33. DATABASE RELATIONSHIPS

Conceptually:

```text
User
 |
 +---- Profile
 |
 +---- Trips
        |
        +---- TripPreference
        |
        +---- Itinerary
        |      |
        |      +---- ItineraryDays
        |                |
        |                +---- ItineraryItems
        |
        +---- TravelOptions
        |
        +---- WeatherSnapshots
        |
        +---- CrowdSnapshots
```

All user-specific trips must belong to a user.

Users must NEVER be allowed to retrieve or modify another user's trips simply by changing an ID in a URL.

Authorization must be checked on the backend.

---

# 34. FRONTEND PAGES

TravelMate should contain the following primary user interfaces.

## Public

### Landing Page

Explain:

- What TravelMate is
- Main benefits
- Main features
- Login/Register actions

### Login

### Register

---

## Authenticated

### Dashboard

The dashboard should provide a useful overview.

Possible content:

- Welcome message
- Create New Trip
- Upcoming trips
- Saved trips
- Recently generated trips

Do not overload the dashboard with every system feature.

---

### Create Trip / Trip Preferences

Collect:

- Destination
- Start date
- End date
- Budget
- Interests

Additional optional preferences can be shown progressively.

Primary action:

```text
Generate My Itinerary
```

---

### Trip Details

The trip experience may contain sections or tabs for:

- Overview
- Itinerary
- Budget
- Price Comparison
- Weather / Conditions

---

### Itinerary View

Display:

```text
Day 1
Morning
Afternoon
Evening

Day 2
Morning
Afternoon
Evening
```

or another clear timeline-based structure.

The user should be able to:

- edit activity
- delete activity
- add activity
- regenerate recommendations
- save changes

---

### Budget View

Display:

- Available budget
- Estimated total
- Remaining budget
- Category breakdown
- Budget status

---

### Price Comparison View

Allow users to browse relevant:

- flights
- hotels
- activities

Provide sorting/filtering when appropriate.

---

### Conditions View

Display:

- Weather
- Crowd information
- Relevant warnings
- Suggested itinerary adjustments

---

### Saved Trips

Display previously saved trips.

Users can:

- Open
- Edit
- Delete/Archive where appropriate

Deletion should require confirmation.

---

### Profile

Allow profile management.

---

# 35. FRONTEND DESIGN REQUIREMENTS

The user interface should be:

- Clean
- Modern
- Travel-oriented
- Easy to understand
- Responsive
- Mobile-friendly
- Desktop-friendly

Maintain consistent:

- spacing
- typography
- cards
- buttons
- forms
- loading indicators
- navigation
- dialog styles
- error states

Do not create inconsistent UI styles between pages.

Use Tailwind consistently if Tailwind is part of the existing frontend.

---

# 36. USER EXPERIENCE REQUIREMENTS

Every asynchronous operation should have:

- Loading state
- Success state where appropriate
- Error state
- Empty state when relevant

Examples:

Generating:

```text
Creating your personalized itinerary...
```

No trips:

```text
You haven't created any trips yet.
```

External provider unavailable:

```text
Travel pricing data is temporarily unavailable.
Your saved itinerary is still accessible.
```

Avoid leaving blank areas when API requests fail.

---

# 37. FORM VALIDATION

Validate user input on BOTH frontend and backend.

Examples:

Destination:

```text
Required
```

Dates:

```text
Start date must be before or equal to end date.
```

Budget:

```text
Must be a valid positive number.
```

Interests:

```text
At least one interest should be supplied if required by the generation flow.
```

Never rely only on client-side validation.

---

# 38. API DESIGN

If using Node.js + Express, use REST-style API routes.

Recommended conceptual routes:

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Profile

```text
GET   /api/profile
PATCH /api/profile
```

## Trips

```text
POST   /api/trips
GET    /api/trips
GET    /api/trips/:tripId
PATCH  /api/trips/:tripId
DELETE /api/trips/:tripId
```

## Preferences

```text
GET /api/trips/:tripId/preferences
PUT /api/trips/:tripId/preferences
```

## Itinerary

```text
POST  /api/trips/:tripId/generate
GET   /api/trips/:tripId/itinerary
PATCH /api/trips/:tripId/itinerary
```

Optional item-specific endpoints:

```text
POST   /api/trips/:tripId/itinerary/items
PATCH  /api/trips/:tripId/itinerary/items/:itemId
DELETE /api/trips/:tripId/itinerary/items/:itemId
```

## Travel Comparison

```text
GET /api/trips/:tripId/travel-options
POST /api/trips/:tripId/travel-options/refresh
```

## Budget

```text
GET /api/trips/:tripId/budget
```

## Conditions

```text
GET  /api/trips/:tripId/conditions
POST /api/trips/:tripId/conditions/refresh
```

Exact routes may be adapted to the repository's existing conventions.

Do not maintain duplicate routes that perform the same responsibility.

---

# 39. BACKEND ARCHITECTURE

Separate backend responsibilities.

Preferred conceptual structure:

```text
routes
   ↓
controllers
   ↓
services
   ↓
repositories / database
   ↓
external providers
```

Example:

```text
routes/
controllers/
services/
providers/
middleware/
validators/
repositories/
utils/
```

Responsibilities:

## Routes

Define endpoints.

## Controllers

Handle HTTP request/response behavior.

Controllers should remain thin.

## Services

Contain business logic.

Examples:

- TripService
- ItineraryService
- BudgetService
- TravelDataService
- WeatherService

## Providers

Handle external systems.

Examples:

- OpenAIProvider
- WeatherProvider
- TravelProvider

## Middleware

Examples:

- authentication
- authorization
- validation
- error handling
- rate limiting

## Database/Repositories

Handle persistence.

Do not place large business logic directly inside route files.

---

# 40. ERROR HANDLING

Use centralized backend error handling.

Errors should not expose:

- database credentials
- stack traces in production
- API keys
- internal secrets

Use appropriate HTTP statuses.

Examples:

```text
400 Invalid request
401 Authentication required
403 Forbidden
404 Resource not found
409 Conflict
422 Validation error
429 Rate limited
500 Server error
502 External provider failure
```

Error responses should have a predictable structure.

Example:

```json
{
  "success": false,
  "error": {
    "code": "TRIP_NOT_FOUND",
    "message": "Trip could not be found."
  }
}
```

---

# 41. API RESPONSE CONSISTENCY

Prefer predictable API responses.

Successful:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Readable message"
  }
}
```

If an existing API convention already exists, maintain it consistently rather than introducing a second format.

---

# 42. SECURITY REQUIREMENTS

Security is mandatory.

Implement:

- password hashing
- authentication
- backend authorization
- environment variables
- validation
- sanitization when necessary
- rate limiting for sensitive endpoints
- protected AI endpoints
- protected user data
- safe error messages
- production-safe CORS configuration

Never commit:

```text
.env
API keys
database passwords
JWT secrets
OpenAI keys
```

Provide:

```text
.env.example
```

with placeholder values.

---

# 43. ENVIRONMENT VARIABLES

Possible environment variables:

```env
NODE_ENV=

DATABASE_URL=

JWT_SECRET=

OPENAI_API_KEY=

WEATHER_API_KEY=

TRAVEL_API_KEY=

CROWD_API_KEY=

FRONTEND_URL=

NEXT_PUBLIC_API_URL=
```

Only include variables actually used by the implementation.

Never expose private API keys using `NEXT_PUBLIC_`.

---

# 44. DATA PRIVACY

Store only information required by the application.

Do not send unnecessary user information to external AI providers.

When generating an itinerary, primarily send trip information.

Example:

```text
Destination
Dates
Budget
Interests
Travel preferences
Relevant travel data
Relevant conditions
```

Do not send password information or authentication credentials to AI services.

---

# 45. PERFORMANCE

Avoid unnecessary API calls.

Examples:

- Cache travel results where appropriate.
- Cache weather information for a reasonable duration.
- Store `fetchedAt`.
- Avoid fetching the exact same external information on every component render.

Use loading strategies appropriately.

Do not unnecessarily regenerate an itinerary each time a page is refreshed.

Previously generated itineraries should be retrieved from the database.

---

# 46. DATA FRESHNESS

Travel prices, weather, and crowd conditions can change.

Therefore external information should have:

```text
source
fetchedAt
```

when practical.

The UI may show:

```text
Updated 20 minutes ago
```

or:

```text
Prices last checked: ...
```

Never make stale information appear guaranteed to be current.

---

# 47. SAVING ITINERARIES

Generated itineraries must persist in the database.

Refreshing the webpage must NOT erase the itinerary.

Users should be able to:

1. Generate a plan.
2. Save it.
3. Logout.
4. Login again.
5. Retrieve the same plan.

Manual itinerary modifications must also persist.

---

# 48. REGENERATION

Users may request itinerary regeneration.

Regeneration should NOT accidentally destroy existing plans without warning.

Possible strategies:

- Create a new itinerary version.
- Require user confirmation before replacement.
- Preserve the previous version until the new generation succeeds.

Never delete the currently valid itinerary before successful regeneration.

---

# 49. TRIP OWNERSHIP

Every authenticated trip operation must verify ownership.

This is INVALID:

```ts
findTrip(req.params.tripId)
```

followed by allowing updates regardless of owner.

The system must conceptually verify:

```text
trip.id = requestedTripId
AND
trip.userId = authenticatedUser.id
```

This applies to:

- viewing
- editing
- deleting
- itinerary generation
- budget access
- conditions access

---

# 50. OPENAI INTEGRATION

OpenAI requests should happen through a dedicated service/provider.

Do NOT scatter OpenAI API calls throughout:

- React components
- route handlers
- random utility functions

Conceptually:

```text
ItineraryService
       ↓
AIProvider
       ↓
OpenAI API
```

The AI provider should:

1. Construct the request.
2. Request structured output.
3. Parse the result.
4. Validate the result.
5. Return application-safe itinerary data.

---

# 51. AI PROMPT INPUT

The itinerary-generation prompt should contain enough information to make an appropriate plan.

Conceptually:

```text
Create a travel itinerary using the following information:

Destination:
{destination}

Travel dates:
{startDate} - {endDate}

Budget:
{budget} {currency}

Interests:
{interests}

Traveler preferences:
{preferences}

Available travel information:
{travelData}

Weather:
{weatherData}

Crowd conditions:
{crowdData}
```

The system prompt used internally should instruct the model to:

- respect travel dates
- respect budget
- prioritize preferences
- create realistic daily schedules
- avoid impossible scheduling
- identify estimated information
- return structured JSON

Do not allow arbitrary frontend input to overwrite the system-level AI instructions.

---

# 52. AI COST MANAGEMENT

AI calls may cost money.

Therefore:

- Do not generate on every page load.
- Do not call AI from React rendering functions.
- Require deliberate generation/regeneration actions.
- Store successful results.
- Avoid duplicate requests.
- Rate-limit generation when appropriate.

---

# 53. PRICE AND COST DISCLAIMERS

TravelMate provides planning estimates.

It is NOT a booking guarantee.

The UI should make it clear when information is estimated.

Suitable wording:

```text
Prices are estimates and may change depending on provider availability.
```

Do not place excessive disclaimers everywhere, but important price-related interfaces should make this clear.

---

# 54. OUT OF SCOPE UNLESS ADDED LATER

Do NOT automatically add these features unless explicitly requested:

- Actual airline ticket purchasing
- Actual hotel booking
- Payment processing
- Credit card storage
- Cryptocurrency payments
- Social media system
- Public travel feed
- Travel dating
- Driver tracking
- Full navigation/GPS application
- Visa approval system
- Passport processing
- Automated booking without user confirmation

TravelMate is primarily a:

**Trip Planning and Decision Support System.**

---

# 55. MVP DEFINITION

At minimum, a complete working TravelMate should support:

### Authentication

- Register
- Login
- Logout

### Profile

- View/update profile

### Trip Creation

- Destination
- Dates
- Budget
- Interests

### AI

- Generate day-by-day itinerary

### Trips

- View itinerary
- Edit itinerary
- Save itinerary
- Retrieve saved itinerary

### Budget

- Estimate cost
- Compare against budget

### Travel Information

At least a functioning integration architecture for:

- flights
- hotels
- activities

### Weather

- Retrieve weather when possible

### Conditions

- Support crowd status when a valid data source exists
- gracefully handle unavailable crowd data

### User Experience

- Loading
- errors
- empty states
- responsive design

---

# 56. FEATURE ACCEPTANCE CRITERIA

## Authentication is complete when:

- registration works
- login works
- password is securely hashed
- authenticated routes are protected
- logout works
- session persists appropriately

## Trip creation is complete when:

- required preferences can be entered
- inputs are validated
- a trip is persisted
- trip belongs to current user

## AI itinerary generation is complete when:

- user can deliberately request generation
- backend sends structured information to AI
- returned result is validated
- itinerary contains all requested trip dates
- result is saved
- saved itinerary can be reloaded

## Budget is complete when:

- estimated costs are calculated
- budget comparison works
- remaining/over-budget amount is accurate
- frontend displays the result clearly

## Price comparison is complete when:

- provider data can be normalized
- results can be displayed
- result source is known
- stale/mock information is not represented as live

## Weather is complete when:

- provider can be queried
- results display relevant dates
- unavailable future forecasts are handled safely

## Saving/editing is complete when:

- user can modify itinerary
- changes persist
- refresh does not remove changes

---

# 57. TESTING REQUIREMENTS

Important application logic must be testable.

Prioritize tests for:

- authentication
- authorization
- trip ownership
- trip validation
- budget calculations
- itinerary validation
- external provider transformations
- AI structured response parsing

Frontend tests should focus on critical user flows where the testing stack supports them.

At minimum, before considering a feature complete:

```text
Type checking passes
Linting passes
Relevant tests pass
Production build succeeds
```

Do not claim that the implementation works if the build is failing.

---

# 58. DATABASE MIGRATIONS

If using Prisma:

After changing the schema:

1. Update `schema.prisma`.
2. Generate the Prisma client.
3. Create/apply appropriate migration.
4. Update seed data when needed.

Do not manually change production tables without an appropriate migration strategy.

Do not delete existing user data simply because the schema changed.

---

# 59. DEVELOPMENT DATA

Seed/demo data may be provided for development.

Demo users, trips, prices, or itineraries must not become mandatory production dependencies.

Sample/mock data should be clearly separated from real persisted user data.

---

# 60. CODE QUALITY RULES

All generated code should:

- Use clear naming.
- Avoid unnecessary duplication.
- Keep functions reasonably focused.
- Keep controllers thin.
- Keep business logic in services/domain logic.
- Separate external providers.
- Use shared types when practical.
- Remove dead code.
- Avoid unnecessary abstractions.
- Avoid giant files where separation improves maintainability.
- Follow existing repository conventions.
- Prefer TypeScript typing over `any`.
- Handle null/undefined states safely.
- Never silently ignore errors.

Do not add large dependencies for trivial functionality.

---

# 61. TYPESCRIPT RULES

When TypeScript is used:

Avoid:

```ts
any
```

unless absolutely necessary.

Prefer:

```ts
type
interface
enum
zod schemas
generated Prisma types
```

Frontend and backend contracts should remain consistent.

Do not duplicate incompatible versions of the same domain type across multiple folders when shared types can solve the problem.

---

# 62. FRONTEND STATE MANAGEMENT

Do not introduce a large state-management library unless necessary.

Prefer built-in React behavior and the project's existing data-fetching architecture.

Server data and application data should be treated differently from temporary UI state.

Avoid storing authoritative trip data only in browser state.

The database/backend remains the source of truth for saved trips.

---

# 63. ACCESSIBILITY

Use reasonable accessibility practices.

Examples:

- labels for inputs
- semantic buttons
- keyboard-accessible actions
- alt text for meaningful images
- proper heading structure
- visible focus states
- understandable validation messages

---

# 64. RESPONSIVE DESIGN

Core functionality must remain usable on:

- Mobile
- Tablet
- Desktop

Do not create desktop-only interfaces.

Price tables that are too wide for mobile should have an appropriate responsive representation.

---

# 65. DATE AND TIME HANDLING

Travel dates are critical.

Use consistent date formats internally.

Prefer ISO representation:

```text
YYYY-MM-DD
```

Do not accidentally shift travel dates due to timezone conversion.

Display dates in a user-friendly format while keeping database/API representation consistent.

---

# 66. MONEY HANDLING

Never assume every trip uses PHP currency.

Trips should have a currency field.

Examples:

```text
PHP
USD
JPY
EUR
```

Avoid floating-point precision errors for stored monetary values.

Use an appropriate decimal representation.

Always display the associated currency.

---

# 67. OBSERVABILITY AND LOGGING

Log important backend failures such as:

- external API errors
- AI failures
- database failures

Do NOT log:

- passwords
- API keys
- authentication secrets

Production logging should provide useful debugging information without exposing sensitive information.

---

# 68. EXTERNAL API FAILURE BEHAVIOR

TravelMate must degrade gracefully.

Example:

If flight API fails:

```text
Unable to retrieve flight prices right now.
```

The system should still allow the user to:

- view saved itinerary
- view profile
- access other working features

One external provider failure should not crash the entire TravelMate application.

---

# 69. AI FAILURE BEHAVIOR

If AI itinerary generation fails:

- preserve existing itinerary
- display understandable error
- allow retry
- log technical error server-side

Do not leave a partially generated itinerary marked as complete.

---

# 70. LOADING BEHAVIOR

Long-running processes such as itinerary generation should provide clear feedback.

Example:

```text
Analyzing your preferences...
Checking travel information...
Creating your itinerary...
```

These messages should not falsely claim a step occurred if the application does not actually perform that step.

---

# 71. DASHBOARD PRINCIPLE

The dashboard is a summary.

It should NOT become a duplicate of every other page.

The dashboard should primarily help the user answer:

```text
What trips do I have?

What is my next trip?

What should I do next?
```

---

# 72. TRAVELMATE CORE DOMAIN RULE

The most important domain relationship is:

```text
USER PREFERENCES
        +
TRAVEL INFORMATION
        +
BUDGET
        +
CONDITIONS
        ↓
AI PLANNING
        ↓
PERSONALIZED ITINERARY
```

Any major feature must support this flow.

---

# 73. USE CASE DIAGRAM SOURCE OF TRUTH

The official use-case structure is:

```text
USER
 |
 +-- Register / Login
 |
 +-- Set Trip Preferences
 |      └── <<include>> Process User Input
 |
 +-- Generate Trip Itinerary
 |      └── <<include>> Generate Itinerary Using AI
 |
 +-- Compare Prices
 |      └── <<include>> Fetch Travel Data
 |                        ├── Flights
 |                        ├── Hotels
 |                        └── Activities
 |
 +-- View Budget & Cost Prediction
 |      └── <<include>> Predict Costs & Optimize Budget
 |
 +-- Check Weather & Crowd Conditions
 |      └── <<include>> Fetch Weather & Crowd Data
 |
 +-- View / Edit / Save Trip Plan
 |      └── <<include>> Store and Retrieve User Data
 |
 +-- Manage Profile
        └── Uses persistent user data
```

External systems include:

```text
Travel APIs
Weather API
AI Service
Database
Optional Crowd Data Provider
```

Implementation decisions should preserve these use cases.

---

# 74. REPOSITORY ANALYSIS INSTRUCTIONS FOR CODING AGENTS

Whenever starting a substantial TravelMate development task:

DO NOT immediately generate random code.

First inspect:

```text
package.json
frontend structure
backend structure
database schema
environment configuration
API routes
controllers
services
components
pages
types
existing migrations
README/documentation
```

Determine:

### Already Implemented

What features already work?

### Partially Implemented

What features exist but are incomplete?

### Missing

What features required by this master prompt do not exist?

### Broken

What existing implementations have errors?

### Conflicting

What existing code conflicts with this source of truth?

Then continue implementation from the current state.

---

# 75. DO NOT DESTROY WORKING CODE

When adding a feature:

DO NOT:

- replace the entire project
- remove working authentication
- delete existing database models unnecessarily
- rename hundreds of files without a reason
- change frameworks unnecessarily
- introduce a second backend
- create duplicate routes
- create duplicate models
- remove functioning features unrelated to the task

Prefer incremental development.

---

# 76. IMPLEMENTATION ORDER

If the project is incomplete, prioritize development in this order.

## PHASE 1 — Foundation

- Repository structure
- Environment configuration
- Database connection
- Error handling
- Shared types

## PHASE 2 — Authentication

- Register
- Login
- Logout
- Current user
- Protected routes
- Profile

## PHASE 3 — Trip Management

- Create trip
- Edit trip
- Delete/archive trip
- Trip preferences
- Saved trips

## PHASE 4 — Itinerary Foundation

- Itinerary data model
- Itinerary display
- Manual itinerary editing
- Saving

## PHASE 5 — AI

- OpenAI provider
- Structured itinerary generation
- Validation
- Persistence
- Regeneration

## PHASE 6 — Budget

- Cost calculation
- Budget comparison
- Optimization suggestions

## PHASE 7 — Travel APIs

- Flights
- Hotels
- Activities
- Normalization
- Comparison UI

## PHASE 8 — Conditions

- Weather
- Crowd information
- Condition-based recommendations

## PHASE 9 — Polish

- Loading states
- Error states
- Empty states
- Responsive UI
- Security review
- Testing
- Accessibility
- Production readiness

Do not build advanced optional features while critical core functionality is broken.

---

# 77. DEFINITION OF DONE FOR THE ENTIRE SYSTEM

TravelMate can be considered functionally complete when a user can perform this full flow:

```text
1. Open TravelMate.
2. Create an account.
3. Login.
4. Create a new trip.
5. Enter destination.
6. Enter travel dates.
7. Enter travel budget.
8. Select interests/preferences.
9. Submit preferences.
10. System validates the input.
11. System retrieves relevant available external data.
12. System estimates costs.
13. System requests an AI-generated itinerary.
14. System validates the AI response.
15. System displays a day-by-day itinerary.
16. User sees estimated budget usage.
17. User can inspect travel options.
18. User can inspect weather/conditions.
19. User can edit itinerary activities.
20. User can save the itinerary.
21. User can logout.
22. User can login again.
23. Saved trip still exists.
24. Saved itinerary modifications still exist.
25. User can update/regenerate the trip when desired.
```

If this complete workflow does not function end-to-end, the overall TravelMate implementation should not be considered complete.

---

# 78. FINAL PRODUCT PRINCIPLE

TravelMate is NOT merely:

```text
a CRUD application
```

and it is NOT merely:

```text
a chatbot
```

TravelMate is a complete AI-assisted travel planning system.

Its core value comes from combining:

```text
User Preferences
+
Travel Data
+
Budget Awareness
+
Weather / Crowd Conditions
+
Artificial Intelligence
=
Personalized Travel Plan
```

Every major architectural decision should support this product goal.

---

# 79. AGENT BEHAVIOR RULES

When an AI coding agent reads this file, it must:

1. Treat this file as the project specification.
2. Analyze the existing repository before making major changes.
3. Preserve working code whenever possible.
4. Follow the established project architecture.
5. Fix existing implementation if it contradicts this specification.
6. Implement features incrementally.
7. Do not invent major unrelated features.
8. Do not fabricate external travel information.
9. Never expose secrets.
10. Maintain database integrity.
11. Maintain authentication and authorization.
12. Validate user and AI-generated data.
13. Run tests/typecheck/lint/build after significant changes.
14. Fix errors caused by its changes.
15. Never report a feature as complete without verifying the relevant code path.
16. Explain major architecture changes when they are necessary.
17. Prefer simple, maintainable solutions over unnecessary complexity.
18. Keep frontend, backend, database, and AI behavior consistent.
19. Use this document to resolve ambiguous feature behavior.
20. Ask the project owner only when a decision is genuinely impossible to infer from this specification.

---

# 80. WHEN ASKED TO "CONTINUE THE SYSTEM"

When given a prompt such as:

```text
Continue building TravelMate.
```

the coding agent should:

1. Read this `MASTERPROMPT.md`.
2. Inspect the repository.
3. Determine the implementation status.
4. Identify the highest-priority incomplete feature.
5. Check dependencies for that feature.
6. Implement it using existing conventions.
7. Test the implementation.
8. Report:
   - files changed
   - functionality added
   - tests performed
   - remaining incomplete requirements

Do not randomly choose a feature.

Use the implementation priority defined in this document.

---

# 81. WHEN ASKED TO "CHECK IF THE SYSTEM IS COMPLETE"

Perform a feature audit against this master prompt.

Create a status report using:

```text
✅ Complete
🟡 Partially Implemented
❌ Missing
🔴 Broken
⚠️ Needs Verification
```

Audit at minimum:

```text
Authentication
Profile
Dashboard
Trip creation
Trip preferences
Trip persistence
AI itinerary generation
AI output validation
Itinerary viewing
Itinerary editing
Saving
Budget prediction
Budget optimization
Price comparison
Flight integration
Hotel integration
Activity integration
Weather integration
Crowd handling
External provider architecture
Loading states
Error handling
Authorization
Responsive design
Environment configuration
Database migrations
Testing
Production build
```

DO NOT mark something as complete just because a file with a matching name exists.

Inspect the actual implementation.

---

# 82. WHEN FIXING BUGS

When the project owner reports a bug:

1. Reproduce or trace the problem.
2. Locate the actual cause.
3. Check whether the bug originates from:
   - frontend
   - backend
   - database
   - external API
   - authentication
   - validation
   - configuration
4. Fix the root cause.
5. Avoid unrelated refactoring.
6. Test the affected flow.
7. Ensure the fix does not violate this master prompt.

Do not simply hide errors from the UI without fixing their source.

---

# 83. WHEN IMPLEMENTING A NEW FEATURE

Before creating code, determine:

```text
What user problem does this feature solve?
Which TravelMate use case does it belong to?
What frontend changes are required?
What backend changes are required?
What database changes are required?
Does it require an external provider?
Does it require authentication?
What validation is required?
What happens when it fails?
```

Then implement the smallest complete vertical slice.

Example:

```text
Frontend
  ↓
API
  ↓
Controller
  ↓
Service
  ↓
Database/Provider
  ↓
Response
  ↓
Frontend UI State
```

Avoid implementing only the UI if the feature requires persistence.

Avoid implementing only an API endpoint when users have no way to use it.

---

# 84. CAPSTONE QUALITY EXPECTATION

Although TravelMate is a capstone project, build it as a coherent software system.

The implementation should demonstrate:

- Software engineering structure
- Database design
- Authentication
- API design
- AI integration
- External API integration
- User-centered interface
- Data validation
- Error handling
- Security awareness
- Testing
- Maintainability

Avoid fake complexity solely to make the project look advanced.

The system should be understandable enough for the developers to explain during:

- Capstone defense
- Demonstration
- Technical questioning
- Code review

---

# 85. FINAL COMMAND TO THE CODING AGENT

You are working on **TravelMate — AI Itinerary Planning System**.

Use this document as your project-level source of truth.

Your objective is to progressively produce a stable, functional, secure, maintainable, and demonstrable TravelMate application.

Before changing code:

**UNDERSTAND THE EXISTING CODEBASE.**

Before creating a feature:

**VERIFY THAT IT DOES NOT ALREADY EXIST.**

Before replacing architecture:

**CONFIRM THAT REPLACEMENT IS ACTUALLY NECESSARY.**

When implementing:

**FOLLOW THE USER FLOW, DOMAIN RULES, AND FEATURE REQUIREMENTS DEFINED HERE.**

When using AI or external APIs:

**NEVER PRESENT FABRICATED DATA AS REAL-TIME DATA.**

When modifying user data:

**ENFORCE AUTHENTICATION AND OWNERSHIP.**

When declaring work complete:

**VERIFY IT THROUGH THE ACTUAL CODE, BUILD, AND RELEVANT TESTS.**

The final TravelMate system must allow users to move successfully from:

**Trip Idea → Preferences → Travel Information → AI Planning → Budget Analysis → Personalized Itinerary → Editing → Saving → Retrieval.**

That is the central purpose of the entire system.

# END OF TRAVELMATE MASTER SYSTEM PROMPT
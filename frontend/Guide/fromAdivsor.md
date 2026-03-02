Technical Summary: Frontend–Backend Design for Large-Scale Taxpayer Tracking System
1. Problem Statement

Dataset size: tens of thousands to hundreds of thousands of taxpayers

Current API pattern:

Load large taxpayer list

Loop through DLN

Call multiple APIs per DLN (common, taxpayer, pnd)

Result:

N+1 API calls

Long response times (minutes)

Frontend performing data aggregation (incorrect responsibility)

System does not scale

2. Core Design Principles

Frontend must not aggregate domain data

Frontend must not loop API calls per entity

List views require summary-level data only

Detail views may use full-detail APIs

All tables must be server-side driven

Pagination is mandatory; full dataset loading is forbidden

3. API Granularity Rules
3.1 List Page vs Detail Page
Page Type	Data Level	API Characteristics
List/Search	Summary	Lightweight, aggregated, pageable
Detail	Full	Complete domain fields

Rule:

List Page must never call detail-level APIs.

4. Required API Patterns
4.1 Server-Side Pagination

All list APIs must support:

page

size (restricted values: 20 / 50 / 100)

optional sort

optional filter

Frontend must not allow arbitrary size input.

4.2 Batch API Pattern (Mandatory)

Instead of:

GET /pnd90/findbydln/{dln}


Use:

POST /pnd90/findbydln
{
  "taxYear": 2566,
  "dlnList": ["DLN1", "DLN2", ...]
}


Constraints:

Maximum DLN per batch (e.g. 50–100)

Batch size aligned with page size

4.3 Summary Aggregation API (Recommended)

Purpose: supply list page with minimal required data.

Example:

POST /api/pnd90/summary


Response per record:

dln

taxYear

submission date

submission status (late / on-time)

tax balance status (pay / refund)

net tax amount

surcharge indicator

Do NOT include:

full income breakdown

all allowance fields

unused address fields

5. Frontend Data Flow (React)
User Search
  ↓
GET taxpayer list (page, size)
  ↓
Extract DLN from current page
  ↓
POST summary/batch API
  ↓
Merge via map (key = dln)
  ↓
Render table


Rules:

Only request data for visible page

Page change triggers new batch request

No preloading of other pages

6. State Management Rules

Store batch results in key-value map ({ dln: summary })

Avoid array searching / nested loops

Clear batch cache on page/filter change

7. DataTable Usage Constraints

DataTable allowed only as UI

Must be server-side controlled

Client-side sorting/filtering on large datasets is forbidden

Allowed:

TanStack Table (headless)

Custom Bootstrap table

Forbidden:

Client-side DataTable plugins

jQuery DataTable

Loading all rows into browser memory

8. UX Constraints that Enforce Architecture

Search requires at least one filter

No auto-load of full list on page load

Explicit “Search” action (no live querying per keystroke)

Display total count from backend

Show loading state per cell when batch data is pending

9. Backend Responsibilities

Aggregate domain data according to use case

Provide summary-level APIs

Enforce pagination and batch limits

Optimize queries and caching at service level

10. Non-Negotiable Rules

Frontend must not behave like ETL

No N+1 API patterns

No “load all then filter”

No client-side pagination for large datasets

11. Outcome if Applied

Predictable performance

Clear separation of responsibilities

Lower backend load

Scalable to hundreds of thousands of records

Maintainable frontend and backend codebases
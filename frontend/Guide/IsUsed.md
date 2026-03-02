# API Usage Status

## Legend

- **In Production**: ใช้งานจริงบนหน้าจอเรียบร้อยแล้ว (Implemented and working)
- **Integrating**: กำลังเขียนโค้ดต่อกับ API นี้อยู่
- **Bug Found**: เรียกแล้ว Error (404/500/etc.) -> *Updated based on runtime feedback*
- **Not Started**: ยังไม่ได้เริ่มนำมาใช้งาน (Not found in code)

| Category | API Path (from IsUsed.md) | Actual Path in Code | Status | Usage Location | Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PND 90** | `/report` | `/api/pnd90/{year}/report` | **Bug Found** | `useTaxpayerList` (Search) | User reported 404 (Not Found) |
| | `/report/top100` | `/api/pnd90/{year}/report/top100` | **In Production** | `useTaxpayerList` (Initial) | |
| | `/findbynid/{year}/{nid}` | - | **Not Started** | - | Use `findbytxpnid` instead? |
| | `/findbynidorname/{keyword}` | - | **Not Started** | - | |
| | `/{year}/taxpayer/findtaxamtgoe/{mintax}` | - | **Not Started** | - | |
| | `/{year}/taxpayer/findbytinnidname/{kw}` | `/api/pnd94/{year}/taxpayer/findbytinnidname/{kw}` | **In Production** (PND94 only) | `useTaxpayerList` | Found in PND94, not PND90 |
| | `/{year}/taxpayer/findbytxpnid/{txpNid}` | `/api/pnd90/{year}/taxpayer/findbytxpnid/{nid}` | **In Production** | `fetchPND90ByNid` | |
| | `/{year}/taxpayer/findbydln/{dln}` | `/api/pnd90/{year}/taxpayer/findbydln/{dln}` | **In Production** | `TaxpayerDetail90` | |
| | `/{year}/common/findbydln/{dln}` | `/api/pnd90/{year}/common/findbydln/{dln}` | **In Production** | `TaxpayerDetail90` | |
| | `/{year}/pnd/findbydln/{dln}` | `/api/pnd90/{year}/pnd/findbydln/{dln}` | **In Production** | `TaxpayerDetail90` & Enrichment | |
| **PND 94** | `/{year}/taxpayer/findbynid/{nid}` | `/api/pnd94/{year}/taxpayer/findbynid/{nid}` | **In Production** | `TaxpayerDetail90` (Unified) | |
| | `/{year}/taxpayer/findbydln/{dln}` | `/api/pnd94/{year}/taxpayer/findbydln/{dln}` | **In Production** | `TaxpayerDetail90` (Unified) | |
| | `/{year}/taxpayer/has/{nid}` | `/api/pnd94/{year}/taxpayer/has/{nid}` | **Not Started** | Defined in API, unused | |
| | `/{year}/taxpayer/findbytinnidname/{keyword}` | `/api/pnd94/{year}/taxpayer/findbytinnidname` | **In Production** | `useTaxpayerList` | |
| | `/{year}/common/findbydln/{dln}` | `/api/pnd94/{year}/common/findbydln/{dln}` | **In Production** | `TaxpayerDetail90` (Unified) | |
| | `/{year}/pnd/findbydln/{dln}` | `/api/pnd94/{year}/pnd/findbydln/{dln}` | **In Production** | `TaxpayerDetail90` (Unified) | |
| | `/{year}/sent94not90/{nid}` | `/api/pnd94/{year}/sent94not90/{dln}` | **In Production** | `TaxpayerDetail90` (Unified) | Uses DLN, not NID |
| | `/{year}/sent94not90list` | `/api/pnd94/{year}/sent94not90list` | **Bug Found** | `useTaxpayerList` | User reported 500 (Internal Server Error) |
| **RD10X** | `/isincome67lessthan66/{nid}` | `/api/rd10x/isincome67lessthan66/{nid}` | **In Production** | Enrichment | |
| | `/istaxamt67lessthan66/{nid}` | `/api/rd10x/istaxamt67lessthan66/{nid}` | **In Production** | Enrichment | |
| | `/issent66not67/{nid}` | `/api/rd10x/issent66not67/{nid}` | **In Production** | Enrichment | |
| | `/is90spohasincome/{nid}` | `/api/rd10x/is90spohasincome/{nid}` | **In Production** | Enrichment | |
| | `/is91spohasincome/{nid}` | - | **Not Started** | - | |
| | `/isdbdregistered/{nid}` | - | **Not Started** | - | |
| | `/findsentlessthan3m/{tin}` | - | **Not Started** | - | |
| **Address**| `/findbyid/{addId}` | `/api/address/findbyid/{id}` | **In Production** | `TaxpayerDetail90` | |
| **PND 91** | `/{year}/taxpayer/findbytxpnid/{txpNid}` | - | **Not Started** | - | |
| | `/{year}/taxpayer/findbydln/{dln}` | - | **Not Started** | - | |
| | `/{year}/common/findbydln/{dln}` | - | **Not Started** | - | |
| | `/{year}/pnd/findbydln/{dln}` | - | **Not Started** | - | |
| **PP 30** | `/{year}/findsentlessthan3m` | - | **Not Started** | - | |

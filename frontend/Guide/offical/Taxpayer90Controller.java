//ไม่สามารถแก้ไข หรือ ใช้งานโดยตรงได้ เป็นตัวอย่างหลังบ้านโดยตรงจากหลังบ้าน

package th.go.rd.taxpayertrack.controller;

import th.go.rd.taxpayertrack.entity.Taxpayer90;
import th.go.rd.taxpayertrack.service.Taxpayer90Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST Controller สำหรับจัดการ API ของ Taxpayer90
 * ให้บริการ 20+ API Endpoints
 * 
 * @author กรมสรรพากร ภาค 12
 * @version 1.0
 */
@RestController
@RequestMapping("/taxpayer90")
@CrossOrigin(origins = "*")
@Slf4j
public class Taxpayer90Controller {

    @Autowired
    private Taxpayer90Service service;

    // ==================== Basic CRUD Endpoints ====================

    /**
     * 1. GET /api/taxpayer90
     * ดึงข้อมูลทั้งหมด
     */
    @GetMapping("")
    public ResponseEntity<List<Taxpayer90>> getAllTaxpayers() {
        log.info("API: Get all taxpayers");
        List<Taxpayer90> taxpayers = service.findAll();
        System.out.println("Taxpayer Query : "+taxpayers.size());
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 2. GET /api/taxpayer90/page
     * ดึงข้อมูลทั้งหมดแบบแบ่งหน้า
     */
    @GetMapping("/page")
    public ResponseEntity<Page<Taxpayer90>> getAllTaxpayersWithPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "orderNo") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("API: Get all taxpayers with pagination - page: {}, size: {}", page, size);
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
                                   Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Page<Taxpayer90> result = service.findAll(pageable);
        return ResponseEntity.ok(result);
    }

    /**
     * 3. GET /api/taxpayer90/{id}
     * ดึงข้อมูลตาม ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaxpayerById(@PathVariable Integer id) {
        log.info("API: Get taxpayer by ID: {}", id);
        
        Optional<Taxpayer90> taxpayer = service.findById(id);
        if (taxpayer.isPresent()) {
            return ResponseEntity.ok(taxpayer.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                           .body(createErrorResponse("Taxpayer not found with ID: " + id));
    }

    /**
     * 4. GET /api/taxpayer90/count
     * นับจำนวนทั้งหมด
     */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countAllTaxpayers() {
        log.info("API: Count all taxpayers");
        
        long count = service.count();
        Map<String, Object> response = new HashMap<>();
        response.put("total", count);
        
        return ResponseEntity.ok(response);
    }

    /**
     * 5. POST /api/taxpayer90
     * สร้างข้อมูลใหม่
     */
    @PostMapping
    public ResponseEntity<Taxpayer90> createTaxpayer(@RequestBody Taxpayer90 taxpayer) {
        log.info("API: Create new taxpayer");
        
        Taxpayer90 saved = service.save(taxpayer);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * 6. PUT /api/taxpayer90/{id}
     * แก้ไขข้อมูล
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTaxpayer(
            @PathVariable Integer id, 
            @RequestBody Taxpayer90 taxpayer) {
        
        log.info("API: Update taxpayer ID: {}", id);
        
        Optional<Taxpayer90> existing = service.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                               .body(createErrorResponse("Taxpayer not found with ID: " + id));
        }
        
        taxpayer.setRecNo(id);
        Taxpayer90 updated = service.save(taxpayer);
        return ResponseEntity.ok(updated);
    }

    /**
     * 7. DELETE /api/taxpayer90/{id}
     * ลบข้อมูล
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTaxpayer(@PathVariable Integer id) {
        log.info("API: Delete taxpayer ID: {}", id);
        
        Optional<Taxpayer90> existing = service.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                               .body(createErrorResponse("Taxpayer not found with ID: " + id));
        }
        
        service.deleteById(id);
        return ResponseEntity.ok(createSuccessResponse("Taxpayer deleted successfully"));
    }

    // ==================== Find by Office Code Endpoints ====================

    /**
     * 8. GET /api/taxpayer90/st/{stCode}
     * ดึงข้อมูลตาม ST Office Code
     */
    @GetMapping("/st/{stCode}")
    public ResponseEntity<List<Taxpayer90>> getByStOfficeCode(@PathVariable String stCode) {
        log.info("API: Get taxpayers by ST Office Code: {}", stCode);
        
        List<Taxpayer90> taxpayers = service.findByStOfficeCode(stCode);
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 9. GET /api/taxpayer90/st/{stCode}/page
     * ดึงข้อมูลตาม ST Office Code แบบแบ่งหน้า
     */
    @GetMapping("/st/{stCode}/page")
    public ResponseEntity<Page<Taxpayer90>> getByStOfficeCodeWithPage(
            @PathVariable String stCode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("API: Get taxpayers by ST Office Code: {} with pagination", stCode);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderNo"));
        Page<Taxpayer90> result = service.findByStOfficeCode(stCode, pageable);
        
        return ResponseEntity.ok(result);
    }

    /**
     * 10. GET /api/taxpayer90/ss/{ssCode}
     * ดึงข้อมูลตาม SS Office Code
     */
    @GetMapping("/ss/{ssCode}")
    public ResponseEntity<List<Taxpayer90>> getBySsOfficeCode(@PathVariable String ssCode) {
        log.info("API: Get taxpayers by SS Office Code: {}", ssCode);
        
        List<Taxpayer90> taxpayers = service.findBySsOfficeCode(ssCode);
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 11. GET /api/taxpayer90/ss/{ssCode}/page
     * ดึงข้อมูลตาม SS Office Code แบบแบ่งหน้า
     */
    @GetMapping("/ss/{ssCode}/page")
    public ResponseEntity<Page<Taxpayer90>> getBySsOfficeCodeWithPage(
            @PathVariable String ssCode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("API: Get taxpayers by SS Office Code: {} with pagination", ssCode);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderNo"));
        Page<Taxpayer90> result = service.findBySsOfficeCode(ssCode, pageable);
        
        return ResponseEntity.ok(result);
    }

    /**
     * 12. GET /api/taxpayer90/region/{regionCode}
     * ดึงข้อมูลตาม Region Office Code
     */
    @GetMapping("/region/{regionCode}")
    public ResponseEntity<List<Taxpayer90>> getByRegionOfficeCode(@PathVariable String regionCode) {
        log.info("API: Get taxpayers by Region Office Code: {}", regionCode);
        
        List<Taxpayer90> taxpayers = service.findByRegionOfficeCode(regionCode);
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 13. GET /api/taxpayer90/st/{stCode}/ss/{ssCode}
     * ดึงข้อมูลตาม ST และ SS Office Code
     */
    @GetMapping("/st/{stCode}/ss/{ssCode}")
    public ResponseEntity<List<Taxpayer90>> getByStAndSsOfficeCode(
            @PathVariable String stCode,
            @PathVariable String ssCode) {
        
        log.info("API: Get taxpayers by ST: {} and SS: {}", stCode, ssCode);
        
        List<Taxpayer90> taxpayers = service.findByStAndSsOfficeCode(stCode, ssCode);
        return ResponseEntity.ok(taxpayers);
    }

    // ==================== Search Endpoints ====================

    /**
     * 14. GET /api/taxpayer90/search/tin/{tin}
     * ค้นหาตาม TIN
     */
    @GetMapping("/search/tin/{tin}")
    public ResponseEntity<?> getByTin(@PathVariable String tin) {
        log.info("API: Get taxpayer by TIN: {}", tin);
        
        Optional<Taxpayer90> taxpayer = service.findByTin(tin);
        if (taxpayer.isPresent()) {
            return ResponseEntity.ok(taxpayer.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                           .body(createErrorResponse("Taxpayer not found with TIN: " + tin));
    }

    /**
     * 15. GET /api/taxpayer90/search/nid/{nid}
     * ค้นหาตาม NID
     */
    @GetMapping("/search/nid/{nid}")
    public ResponseEntity<?> getByNid(@PathVariable String nid) {
        log.info("API: Get taxpayer by NID: {}", nid);
        
        Optional<Taxpayer90> taxpayer = service.findByNid(nid);
        if (taxpayer.isPresent()) {
            return ResponseEntity.ok(taxpayer.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                           .body(createErrorResponse("Taxpayer not found with NID: " + nid));
    }

    /**
     * 16. GET /api/taxpayer90/search/name
     * ค้นหาตามชื่อ (LIKE)
     */
    @GetMapping("/search/name")
    public ResponseEntity<List<Taxpayer90>> searchByName(@RequestParam String name) {
        log.info("API: Search taxpayers by name: {}", name);
        
        List<Taxpayer90> taxpayers = service.searchByName(name);
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 17. GET /api/taxpayer90/st/{stCode}/search
     * ค้นหาตามชื่อภายใน ST Office
     */
    @GetMapping("/st/{stCode}/search")
    public ResponseEntity<Page<Taxpayer90>> searchInStOffice(
            @PathVariable String stCode,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("API: Search in ST Office: {} with keyword: {}", stCode, keyword);
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Taxpayer90> result = service.searchInStOffice(stCode, keyword, pageable);
        
        return ResponseEntity.ok(result);
    }

    /**
     * 18. GET /api/taxpayer90/search
     * ค้นหาแบบละเอียด (ชื่อ, TIN, NID)
     */
    @GetMapping("/search")
    public ResponseEntity<Page<Taxpayer90>> searchByKeyword(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("API: Search by keyword: {}", keyword);
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Taxpayer90> result = service.searchByKeyword(keyword, pageable);
        
        return ResponseEntity.ok(result);
    }

    // ==================== Team Endpoints ====================

    /**
     * 19. GET /api/taxpayer90/team/{team}
     * ดึงข้อมูลตามทีม
     */
    @GetMapping("/team/{team}")
    public ResponseEntity<List<Taxpayer90>> getByTeam(@PathVariable String team) {
        log.info("API: Get taxpayers by team: {}", team);
        
        List<Taxpayer90> taxpayers = service.findByTeam(team);
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 20. GET /api/taxpayer90/subteam/{subteam}
     * ดึงข้อมูลตามทีมย่อย
     */
    @GetMapping("/subteam/{subteam}")
    public ResponseEntity<List<Taxpayer90>> getBySubteam(@PathVariable String subteam) {
        log.info("API: Get taxpayers by subteam: {}", subteam);
        
        List<Taxpayer90> taxpayers = service.findBySubteam(subteam);
        return ResponseEntity.ok(taxpayers);
    }

    // ==================== Count Endpoints ====================

    /**
     * 21. GET /api/taxpayer90/st/{stCode}/count
     * นับจำนวนตาม ST Office Code
     */
    @GetMapping("/st/{stCode}/count")
    public ResponseEntity<Map<String, Object>> countByStOfficeCode(@PathVariable String stCode) {
        log.info("API: Count taxpayers by ST Office Code: {}", stCode);
        
        long count = service.countByStOfficeCode(stCode);
        Map<String, Object> response = new HashMap<>();
        response.put("stOfficeCode", stCode);
        response.put("count", count);
        
        return ResponseEntity.ok(response);
    }

    /**
     * 22. GET /api/taxpayer90/ss/{ssCode}/count
     * นับจำนวนตาม SS Office Code
     */
    @GetMapping("/ss/{ssCode}/count")
    public ResponseEntity<Map<String, Object>> countBySsOfficeCode(@PathVariable String ssCode) {
        log.info("API: Count taxpayers by SS Office Code: {}", ssCode);
        
        long count = service.countBySsOfficeCode(ssCode);
        Map<String, Object> response = new HashMap<>();
        response.put("ssOfficeCode", ssCode);
        response.put("count", count);
        
        return ResponseEntity.ok(response);
    }

    // ==================== Filing Status Endpoints ====================

    /**
     * 23. GET /api/taxpayer90/st/{stCode}/filed-2569
     * ดึงข้อมูลผู้ที่ยื่นแบบในปี 2569
     */
    @GetMapping("/st/{stCode}/filed-2569")
    public ResponseEntity<List<Taxpayer90>> getFiledIn2569(@PathVariable String stCode) {
        log.info("API: Get taxpayers who filed in 2569 in ST Office: {}", stCode);
        
        List<Taxpayer90> taxpayers = service.findFiledIn2569ByStOffice(stCode);
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 24. GET /api/taxpayer90/st/{stCode}/not-filed-2569
     * ดึงข้อมูลผู้ที่ไม่ยื่นแบบในปี 2569
     */
    @GetMapping("/st/{stCode}/not-filed-2569")
    public ResponseEntity<List<Taxpayer90>> getNotFiledIn2569(@PathVariable String stCode) {
        log.info("API: Get taxpayers who did not file in 2569 in ST Office: {}", stCode);
        
        List<Taxpayer90> taxpayers = service.findNotFiledIn2569ByStOffice(stCode);
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 25. GET /api/taxpayer90/filed-all-years
     * ดึงข้อมูลผู้ที่ยื่นทุกปี (2564-2569)
     */
    @GetMapping("/filed-all-years")
    public ResponseEntity<List<Taxpayer90>> getFiledAllYears() {
        log.info("API: Get taxpayers who filed all years");
        
        List<Taxpayer90> taxpayers = service.findFiledAllYears();
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 26. GET /api/taxpayer90/never-filed
     * ดึงข้อมูลผู้ที่ไม่เคยยื่นเลย (2564-2569)
     */
    @GetMapping("/never-filed")
    public ResponseEntity<List<Taxpayer90>> getNeverFiled() {
        log.info("API: Get taxpayers who never filed");
        
        List<Taxpayer90> taxpayers = service.findNeverFiled();
        return ResponseEntity.ok(taxpayers);
    }

    /**
     * 27. GET /api/taxpayer90/st/{stCode}/stopped-filing-2569
     * ดึงข้อมูลผู้ที่หยุดยื่นในปี 2569
     */
    @GetMapping("/st/{stCode}/stopped-filing-2569")
    public ResponseEntity<List<Taxpayer90>> getStoppedFilingIn2569(@PathVariable String stCode) {
        log.info("API: Get taxpayers who stopped filing in 2569");
        
        List<Taxpayer90> taxpayers = service.findStoppedFilingIn2569(stCode);
        return ResponseEntity.ok(taxpayers);
    }

    // ==================== Statistics Endpoints ====================

    /**
     * 28. GET /api/taxpayer90/st/{stCode}/stats
     * สถิติการยื่นแบบตาม ST Office
     */
    @GetMapping("/st/{stCode}/stats")
    public ResponseEntity<Map<String, Object>> getFilingStats(@PathVariable String stCode) {
        log.info("API: Get filing statistics for ST Office: {}", stCode);
        
        Map<String, Object> stats = service.getFilingStatsByStOffice(stCode);
        return ResponseEntity.ok(stats);
    }

    /**
     * 29. GET /api/taxpayer90/st/{stCode}/total-stats
     * สถิติรวมทุกปี (2564-2569) ตาม ST Office
     */
    @GetMapping("/st/{stCode}/total-stats")
    public ResponseEntity<Map<String, Object>> getTotalStats(@PathVariable String stCode) {
        log.info("API: Get total statistics for ST Office: {}", stCode);
        
        Map<String, Object> stats = service.getTotalStatsByStOffice(stCode);
        return ResponseEntity.ok(stats);
    }

    /**
     * 30. GET /api/taxpayer90/st/{stCode}/top-taxpayers
     * Top N ผู้เสียภาษีสูงสุดปี 2569
     */
    @GetMapping("/st/{stCode}/top-taxpayers")
    public ResponseEntity<List<Taxpayer90>> getTopTaxpayers(
            @PathVariable String stCode,
            @RequestParam(defaultValue = "10") int limit) {
        
        log.info("API: Get top {} taxpayers in ST Office: {}", limit, stCode);
        
        List<Taxpayer90> taxpayers = service.findTopTaxpayers2569(stCode, limit);
        return ResponseEntity.ok(taxpayers);
    }

    // ==================== Utility Endpoints ====================

    /**
     * 31. GET /api/taxpayer90/office-codes/st
     * ดึงรายการ ST Office Codes
     */
    @GetMapping("/office-codes/st")
    public ResponseEntity<List<String>> getStOfficeCodes() {
        log.info("API: Get distinct ST Office codes");
        
        List<String> codes = service.getDistinctStOfficeCodes();
        return ResponseEntity.ok(codes);
    }

    /**
     * 32. GET /api/taxpayer90/office-codes/ss
     * ดึงรายการ SS Office Codes ตาม ST Office
     */
    @GetMapping("/office-codes/ss")
    public ResponseEntity<List<String>> getSsOfficeCodes(
            @RequestParam String stCode) {
        
        log.info("API: Get distinct SS Office codes for ST Office: {}", stCode);
        
        List<String> codes = service.getDistinctSsOfficeCodesByStOffice(stCode);
        return ResponseEntity.ok(codes);
    }

    /**
     * 33. GET /api/taxpayer90/teams
     * ดึงรายการทีมตาม ST Office
     */
    @GetMapping("/teams")
    public ResponseEntity<List<String>> getTeams(@RequestParam String stCode) {
        log.info("API: Get distinct teams for ST Office: {}", stCode);
        
        List<String> teams = service.getDistinctTeamsByStOffice(stCode);
        return ResponseEntity.ok(teams);
    }

    /**
     * 34. GET /api/taxpayer90/exists/tin/{tin}
     * ตรวจสอบว่ามี TIN นี้อยู่แล้วหรือไม่
     */
    @GetMapping("/exists/tin/{tin}")
    public ResponseEntity<Map<String, Object>> checkTinExists(@PathVariable String tin) {
        log.info("API: Check if TIN exists: {}", tin);
        
        boolean exists = service.existsByTin(tin);
        Map<String, Object> response = new HashMap<>();
        response.put("tin", tin);
        response.put("exists", exists);
        
        return ResponseEntity.ok(response);
    }

    // ==================== Helper Methods ====================

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("error", message);
        return response;
    }

    private Map<String, Object> createSuccessResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        return response;
    }
}

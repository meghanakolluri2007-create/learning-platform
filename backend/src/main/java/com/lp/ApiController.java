package com.lp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {
  @Autowired UserRepo users;
  @Autowired CourseRepo courses;
  @Autowired EnrollRepo enrolls;
  @Autowired QuestionRepo questions;
  BCryptPasswordEncoder enc = new BCryptPasswordEncoder();

  record Submit(Long userId, List<Integer> answers) {}

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody User u) {
    if (users.findByEmail(u.email) != null) return ResponseEntity.badRequest().body("Email already registered");
    u.password = enc.encode(u.password);
    return ResponseEntity.ok(users.save(u));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> b) {
    User u = users.findByEmail(b.get("email"));
    if (u == null || !enc.matches(b.get("password"), u.password))
      return ResponseEntity.status(401).body("Invalid email or password");
    return ResponseEntity.ok(u);
  }

  @GetMapping("/courses")
  public List<Course> allCourses() { return courses.findAll(); }

  @PostMapping("/enroll")
  public String enroll(@RequestParam Long userId, @RequestParam Long courseId) {
    if (enrolls.findByUserIdAndCourseId(userId, courseId) == null) {
      Enrollment e = new Enrollment(); e.userId = userId; e.courseId = courseId; e.progress = 0;
      enrolls.save(e);
    }
    return "Enrolled";
  }

  @GetMapping("/dashboard")
  public List<Map<String, Object>> dashboard(@RequestParam Long userId) {
    List<Map<String, Object>> out = new ArrayList<>();
    for (Enrollment e : enrolls.findByUserId(userId)) {
      Course c = courses.findById(e.courseId).orElse(null);
      if (c == null) continue;
      Map<String, Object> m = new HashMap<>();
      m.put("courseId", c.id); m.put("title", c.title); m.put("progress", e.progress);
      out.add(m);
    }
    return out;
  }

  @GetMapping("/quiz/{courseId}")
  public List<Question> quiz(@PathVariable Long courseId) { return questions.findByCourseId(courseId); }

  @PostMapping("/quiz/{courseId}/submit")
  public Map<String, Object> submit(@PathVariable Long courseId, @RequestBody Submit s) {
    List<Question> qs = questions.findByCourseId(courseId);
    int score = 0;
    for (int i = 0; i < qs.size(); i++)
      if (i < s.answers().size() && s.answers().get(i) == qs.get(i).answer) score++;
    int progress = qs.isEmpty() ? 0 : score * 100 / qs.size();
    Enrollment e = enrolls.findByUserIdAndCourseId(s.userId(), courseId);
    if (e == null) { e = new Enrollment(); e.userId = s.userId(); e.courseId = courseId; }
    e.progress = Math.max(e.progress, progress);
    enrolls.save(e);
    return Map.of("score", score, "total", qs.size());
  }
}

package com.lp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
interface UserRepo extends JpaRepository<User, Long> { User findByEmail(String email); }
interface CourseRepo extends JpaRepository<Course, Long> {}
interface EnrollRepo extends JpaRepository<Enrollment, Long> {
  Enrollment findByUserIdAndCourseId(Long u, Long c);
  List<Enrollment> findByUserId(Long u);
}
interface QuestionRepo extends JpaRepository<Question, Long> { List<Question> findByCourseId(Long c); }

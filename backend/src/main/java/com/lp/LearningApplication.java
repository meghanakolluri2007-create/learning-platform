package com.lp;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LearningApplication {
  public static void main(String[] args) { SpringApplication.run(LearningApplication.class, args); }

  @Bean
  CommandLineRunner seed(CourseRepo cr, QuestionRepo qr) {
    return args -> {
      if (cr.count() > 0) return;
      Course c1 = cr.save(new Course("Java Basics", "Learn core Java from scratch", "Dr. Rao"));
      Course c2 = cr.save(new Course("React JS", "Build UIs with reusable components", "Ms. Priya"));
      Course c3 = cr.save(new Course("MySQL Fundamentals", "Design and query relational databases", "Mr. Kumar"));
      qr.save(new Question(c1.id, "Which keyword creates an object?", "new|make|create|init", 0));
      qr.save(new Question(c1.id, "JVM stands for?", "Java Virtual Machine|Java Variable Method|Joint VM|None", 0));
      qr.save(new Question(c2.id, "Which hook manages state?", "useState|useFetch|useData|useMake", 0));
      qr.save(new Question(c2.id, "React is mainly used for?", "Databases|User interfaces|Networking|Compilers", 1));
      qr.save(new Question(c3.id, "Which command retrieves data?", "GET|SELECT|FETCH|PULL", 1));
      qr.save(new Question(c3.id, "Which key uniquely identifies a row?", "Foreign key|Primary key|Index|Alias", 1));
    };
  }
}

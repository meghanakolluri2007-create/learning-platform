package com.lp;
import jakarta.persistence.*;
@Entity
public class Enrollment {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  public Long userId;
  public Long courseId;
  public int progress;
}

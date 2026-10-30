package com.lp;
import jakarta.persistence.*;
@Entity
public class Course {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  public String title;
  public String description;
  public String instructor;
  public Course() {}
  public Course(String t, String d, String i) { title=t; description=d; instructor=i; }
}

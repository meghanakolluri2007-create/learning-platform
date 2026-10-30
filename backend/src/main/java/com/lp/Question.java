package com.lp;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Question {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  public Long courseId;
  public String text;
  public String options; // a|b|c|d
  @JsonIgnore public int answer;
  public Question() {}
  public Question(Long c, String t, String o, int a) { courseId=c; text=t; options=o; answer=a; }
}

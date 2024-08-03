package com.mrvl.puzzle.feedback;

import com.mrvl.puzzle.common.BaseEntity;
import com.mrvl.puzzle.puzzle.Puzzle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Feedback extends BaseEntity {

    private Double note;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "puzzle_id")
    private Puzzle puzzle;


}

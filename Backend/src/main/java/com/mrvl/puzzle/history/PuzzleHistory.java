package com.mrvl.puzzle.history;

import com.mrvl.puzzle.common.BaseEntity;
import com.mrvl.puzzle.puzzle.Puzzle;
import com.mrvl.puzzle.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class PuzzleHistory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "puzzle_id")
    private Puzzle puzzle;

    private boolean completed;
    private boolean completedApproved;

}

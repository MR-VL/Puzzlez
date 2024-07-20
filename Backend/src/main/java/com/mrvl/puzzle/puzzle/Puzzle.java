package com.mrvl.puzzle.puzzle;

import com.mrvl.puzzle.common.BaseEntity;
import com.mrvl.puzzle.feedback.Feedback;
import com.mrvl.puzzle.history.PuzzleHistory;
import com.mrvl.puzzle.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Puzzle extends BaseEntity {

    private String title;
    private String brand;
    private String barcode;
    private String description;
    private String picture;
    private boolean archived;
    private boolean shareable;


    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "puzzle")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "puzzle")
    private List<PuzzleHistory> histories;

    @Transient
    public double getRate() {
        if (feedbacks == null || feedbacks.isEmpty()) {
            return 0.0;
        }
        var rate = this.feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0.0);

        return Math.round(rate * 10.0) / 10.0;
    }
}

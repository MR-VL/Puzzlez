package com.mrvl.puzzle.puzzle;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompletedPuzzleResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String barcode;
    private double rate;
    private boolean completed;
    private boolean completedApproved;
}

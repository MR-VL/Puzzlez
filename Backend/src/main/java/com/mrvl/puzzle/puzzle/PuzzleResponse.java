package com.mrvl.puzzle.puzzle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PuzzleResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String barcode;
    private String description;
    private String owner;
    private byte[] picture;
    private double rate;
    private boolean archived;
    private boolean shareable;

}
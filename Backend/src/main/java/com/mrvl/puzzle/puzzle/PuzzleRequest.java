package com.mrvl.puzzle.puzzle;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PuzzleRequest(
        Integer id,

        @NotEmpty(message = "Title can't be blank")
        String title,

        @NotEmpty(message = "Brand can't be blank")
        String brand,

        @NotEmpty(message = "Barcode can't be blank")
        String barcode,

        @NotEmpty(message = "Description can't be blank")
        String description,

        boolean shareable

) {
}

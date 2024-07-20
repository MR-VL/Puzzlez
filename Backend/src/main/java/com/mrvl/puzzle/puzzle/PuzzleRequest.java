package com.mrvl.puzzle.puzzle;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PuzzleRequest(
        Integer id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String brand,
        @NotNull(message = "102")
        @NotEmpty(message = "102")
        String barcode,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        String description,
        boolean shareable
) {
}

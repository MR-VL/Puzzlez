package com.mrvl.puzzle.puzzle;

import com.mrvl.puzzle.file.FileUtils;
import com.mrvl.puzzle.history.PuzzleHistory;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class PuzzleMapper {

    public Puzzle toPuzzle(@Valid @RequestBody PuzzleRequest request) {
        return Puzzle.builder()
                .id(request.id())
                .title(request.title())
                .barcode(request.barcode())
                .brand(request.brand())
                .description(request.description())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }


    public PuzzleResponse toPuzzleResponse(Puzzle puzzle) {
        return PuzzleResponse.builder()
                .id(puzzle.getId())
                .title(puzzle.getTitle())
                .authorName(puzzle.getBrand())
                .barcode(puzzle.getBarcode())
                .description(puzzle.getDescription())
                .rate(puzzle.getRate())
                .archived(puzzle.isArchived())
                .shareable(puzzle.isShareable())
                .owner(puzzle.getOwner().fullName())
                .picture(FileUtils.readFileFromLocation(puzzle.getPicture()))
                .build();
    }

    public CompletedPuzzleResponse toCompletedPuzzleResponse(PuzzleHistory history) {
        return CompletedPuzzleResponse.builder()
                .id(history.getPuzzle().getId())
                .title(history.getPuzzle().getTitle())
                .authorName(history.getPuzzle().getBrand())
                .barcode(history.getPuzzle().getBarcode())
                .rate(history.getPuzzle().getRate())
                .completed(history.isCompleted())
                .completedApproved(history.isCompletedApproved())
                .build();
    }


}
package com.mrvl.puzzle.puzzle;

import com.mrvl.puzzle.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("puzzles")
@RequiredArgsConstructor
@Tag(name = "Puzzle")
public class PuzzleController {

    private final PuzzleService service;

    @PostMapping
    public ResponseEntity<Integer> savePuzzle(
            @Valid @RequestBody PuzzleRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("/{puzzle-id}")
    public ResponseEntity<PuzzleResponse> findPuzzleById(
            @PathVariable("puzzle-id") Integer puzzleId
    ) {
        return ResponseEntity.ok(service.findById(puzzleId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<PuzzleResponse>> findAllPuzzles(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllPuzzles(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<PuzzleResponse>> findAllPuzzlesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllPuzzlesByOwner(page, size, connectedUser));
    }

    @GetMapping("/completed")
    public ResponseEntity<PageResponse<CompletedPuzzleResponse>> findAllCompletedPuzzles(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllCompletedPuzzles(page, size, connectedUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<CompletedPuzzleResponse>> findAllReturnedPuzzles(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllReturnedPuzzles(page, size, connectedUser));
    }

    @PatchMapping("/shareable/{puzzle-id}")
    public ResponseEntity<Integer> updateShareableStatus(
            @PathVariable("puzzle-id") Integer puzzleId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.updateShareableStatus(puzzleId, connectedUser));
    }

    @PatchMapping("/archived/{puzzle-id}")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("puzzle-id") Integer puzzleId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.updateArchivedStatus(puzzleId, connectedUser));
    }

    @PostMapping("complete/{puzzle-id}")
    public ResponseEntity<Integer> completePuzzle(
            @PathVariable("puzzle-id") Integer puzzleId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.completePuzzle(puzzleId, connectedUser));
    }

    @PatchMapping("complete/return/{puzzle-id}")
    public ResponseEntity<Integer> returnCompletedPuzzle(
            @PathVariable("puzzle-id") Integer puzzleId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.returnCompletedPuzzle(puzzleId, connectedUser));
    }

    @PatchMapping("complete/return/approve/{puzzle-id}")
    public ResponseEntity<Integer> approveReturnCompletedPuzzle(
            @PathVariable("puzzle-id") Integer puzzleId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.approveCompletedPuzzle(puzzleId, connectedUser));
    }

    @PostMapping(value = "/picture/{puzzle-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadPuzzlePicture(
            @PathVariable("puzzle-id") Integer puzzleId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        service.uploadPuzzlePicture(file, connectedUser, puzzleId);
        return ResponseEntity.accepted().build();
    }
}
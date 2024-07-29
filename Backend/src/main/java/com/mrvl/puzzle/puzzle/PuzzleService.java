package com.mrvl.puzzle.puzzle;

import com.mrvl.puzzle.common.PageResponse;
import com.mrvl.puzzle.exception.OperationNotPermittedException;
import com.mrvl.puzzle.file.FileStorageService;
import com.mrvl.puzzle.history.PuzzleHistory;
import com.mrvl.puzzle.history.PuzzleTransactionHistoryRepository;
import com.mrvl.puzzle.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Objects;
import static com.mrvl.puzzle.puzzle.PuzzleSpecification.withOwnerId;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PuzzleService {
    private final PuzzleMapper puzzleMapper;
    private final PuzzleRepository puzzleRepository;
    private final PuzzleTransactionHistoryRepository transactionHistoryRepository;
    private final FileStorageService fileStorageService;

    public Integer save(PuzzleRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Puzzle puzzle = puzzleMapper.toPuzzle(request);
        puzzle.setOwner(user);
        return puzzleRepository.save(puzzle).getId();
    }

    public PuzzleResponse findById(Integer puzzleId) {
        return puzzleRepository.findById(puzzleId)
                .map(puzzleMapper::toPuzzleResponse)
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + puzzleId));
    }

    public PageResponse<PuzzleResponse> findAllPuzzles(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Page<Puzzle> puzzles = puzzleRepository.findAllDisplayablePuzzles(pageable, user.getId());

        List<PuzzleResponse> puzzlesResponse = puzzles.stream()
                .map(puzzleMapper::toPuzzleResponse)
                .toList();
        return new PageResponse<>(
                puzzlesResponse,
                puzzles.getNumber(),
                puzzles.getSize(),
                puzzles.getTotalElements(),
                puzzles.getTotalPages(),
                puzzles.isFirst(),
                puzzles.isLast()
        );
    }

    public PageResponse<PuzzleResponse> findAllPuzzlesByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Page<Puzzle> puzzles = puzzleRepository.findAll(withOwnerId(user.getId()), pageable);

        List<PuzzleResponse> puzzlesResponse = puzzles.stream()
                .map(puzzleMapper::toPuzzleResponse)
                .toList();
        return new PageResponse<>(
                puzzlesResponse,
                puzzles.getNumber(),
                puzzles.getSize(),
                puzzles.getTotalElements(),
                puzzles.getTotalPages(),
                puzzles.isFirst(),
                puzzles.isLast()
        );
    }

    public PageResponse<CompletedPuzzleResponse> findAllCompletedPuzzles(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());


        Page<PuzzleHistory> allBorrowedPuzzles = transactionHistoryRepository.findAllCompletedPuzzles(pageable, user.getId());

        List<CompletedPuzzleResponse> puzzleResponses = allBorrowedPuzzles.stream()
                .map(puzzleMapper::toCompletedPuzzleResponse)
                .toList();


        return new PageResponse<>(
                puzzleResponses,
                allBorrowedPuzzles.getNumber(),
                allBorrowedPuzzles.getSize(),
                allBorrowedPuzzles.getTotalElements(),
                allBorrowedPuzzles.getTotalPages(),
                allBorrowedPuzzles.isFirst(),
                allBorrowedPuzzles.isLast()
        );
    }

    public PageResponse<CompletedPuzzleResponse> findAllReturnedPuzzles(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Page<PuzzleHistory> allCompletedPuzzles = transactionHistoryRepository.findAllCompletedApprovedPuzzles(pageable, user.getId());
        List<CompletedPuzzleResponse> puzzleResponse = allCompletedPuzzles.stream()
                .map(puzzleMapper::toCompletedPuzzleResponse)
                .toList();

        return new PageResponse<>(
                puzzleResponse,
                allCompletedPuzzles.getNumber(),
                allCompletedPuzzles.getSize(),
                allCompletedPuzzles.getTotalElements(),
                allCompletedPuzzles.getTotalPages(),
                allCompletedPuzzles.isFirst(),
                allCompletedPuzzles.isLast()
        );
    }

    public Integer updateShareableStatus(Integer puzzleId, Authentication connectedUser) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + puzzleId));


        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(puzzle.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others puzzles shareable status");
        }
        puzzle.setShareable(!puzzle.isShareable());
        puzzleRepository.save(puzzle);
        return puzzleId;
    }

    public Integer updateArchivedStatus(Integer puzzleId, Authentication connectedUser) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + puzzleId));


        User user = ((User) connectedUser.getPrincipal());

        if (!Objects.equals(puzzle.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others puzzle archived status");
        }
        puzzle.setArchived(!puzzle.isArchived());
        puzzleRepository.save(puzzle);
        return puzzleId;
    }

    public Integer completePuzzle(Integer puzzleId, Authentication connectedUser) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + puzzleId));


        if (puzzle.isArchived() || !puzzle.isShareable()) {
            throw new OperationNotPermittedException("The requested puzzle cannot be completed since it is archived or not shareable");
        }


        User user = ((User) connectedUser.getPrincipal());

        if (Objects.equals(puzzle.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot complete your own puzzle");
        }


        PuzzleHistory history = PuzzleHistory.builder()
                .user(user)
                .puzzle(puzzle)
                .completed(true)
                .completedApproved(false)
                .build();
        return transactionHistoryRepository.save(history).getId();

    }

    public Integer returnCompletedPuzzle(Integer puzzleId, Authentication connectedUser) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + puzzleId));


        if (puzzle.isArchived() || !puzzle.isShareable()) {
            throw new OperationNotPermittedException("The requested puzzle is archived or not shareable");
        }


        User user = ((User) connectedUser.getPrincipal());

        if (Objects.equals(puzzle.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot complete or accept completed your own puzzle");
        }

        PuzzleHistory history = transactionHistoryRepository.findByPuzzleIdAndUserId(puzzleId, user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("You did not complete this puzzle"));

        history.setCompleted(true);
        return transactionHistoryRepository.save(history).getId();
    }

    public Integer approveCompletedPuzzle(Integer puzzleId, Authentication connectedUser) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + puzzleId));

        if (puzzle.isArchived() || !puzzle.isShareable()) {
            throw new OperationNotPermittedException("The requested puzzle is archived or not shareable");
        }


        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(puzzle.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot approve the completion of a puzzle you do not own");
        }

        PuzzleHistory history = transactionHistoryRepository.findByPuzzleIdAndOwnerId(puzzleId, user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("The puzzle is not completed yet. You cannot approve its completion"));

        history.setCompletedApproved(true);
        return transactionHistoryRepository.save(history).getId();
    }

    public void uploadPuzzlePicture(MultipartFile file, Authentication connectedUser, Integer puzzleId) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + puzzleId));
        User user = ((User) connectedUser.getPrincipal());
        var pic = fileStorageService.saveFile(file, puzzleId, user.getId());
        puzzle.setPicture(pic);
        puzzleRepository.save(puzzle);
    }
}






package com.mrvl.puzzle.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface PuzzleTransactionHistoryRepository extends JpaRepository<PuzzleHistory, Integer> {

    @Query("""
            SELECT history
            FROM PuzzleHistory history
            WHERE history.user.id = :userId
            """)
    Page<PuzzleHistory> findAllCompletedPuzzles(Pageable pageable, Integer userId);

    @Query("""
            SELECT history
            FROM PuzzleHistory history
            WHERE history.puzzle.owner.id = :userId
            """)
    Page<PuzzleHistory> findAllCompletedApprovedPuzzles(Pageable pageable, Integer userId);

    @Query("""
            SELECT transaction
            FROM PuzzleHistory  transaction
            WHERE transaction.user.id = :userId
            AND transaction.puzzle.id = :puzzleId
            AND transaction.completed = false
            AND transaction.completedApproved = false
            """)
    Optional<PuzzleHistory> findByPuzzleIdAndUserId(@Param("puzzleId") Integer puzzleId, @Param("userId") Integer userId);

    @Query("""
            SELECT transaction
            FROM PuzzleHistory  transaction
            WHERE transaction.puzzle.owner.id = :userId
            AND transaction.puzzle.id = :puzzleId
            AND transaction.completed = true
            AND transaction.completedApproved = false
            """)
    Optional<PuzzleHistory> findByPuzzleIdAndOwnerId(@Param("puzzleId") Integer puzzleId, @Param("userId") Integer userId);
}

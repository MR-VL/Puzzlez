package com.mrvl.puzzle.puzzle;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface PuzzleRepository extends JpaRepository<Puzzle, Integer>, JpaSpecificationExecutor<Puzzle> {


    @Query("""
            SELECT puzzle
            FROM Puzzle puzzle
            WHERE puzzle.archived = false
            AND puzzle.shareable = true
            AND puzzle.owner.id != :userId
            """)
    Page<Puzzle> findAllDisplayablePuzzles(Pageable pageable, Integer userId);
}

package com.mrvl.puzzle.puzzle;
import org.springframework.data.jpa.domain.Specification;

public class PuzzleSpecification {
    public static Specification<Puzzle> withOwnerId(Integer ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}

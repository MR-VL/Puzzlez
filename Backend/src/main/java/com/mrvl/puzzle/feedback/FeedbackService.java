package com.mrvl.puzzle.feedback;

import com.mrvl.puzzle.common.PageResponse;
import com.mrvl.puzzle.exception.OperationNotPermittedException;
import com.mrvl.puzzle.puzzle.Puzzle;
import com.mrvl.puzzle.puzzle.PuzzleRepository;
import com.mrvl.puzzle.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final PuzzleRepository puzzleRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedBackRepository feedBackRepository;

    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        Puzzle puzzle = puzzleRepository.findById(request.puzzleId())
                .orElseThrow(() -> new EntityNotFoundException("No puzzle found with ID:: " + request.puzzleId()));

        if (puzzle.isArchived() || !puzzle.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a feedback for an archived or not shareable puzzle");
        }

        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(puzzle.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give feedback to your own puzzle");
        }

        Feedback feedback = feedbackMapper.toFeedback(request);
        return feedBackRepository.save(feedback).getId();
    }

    @Transactional
    public PageResponse<FeedbackResponse> findAllFeedbacksByPuzzle(Integer puzzleId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());

        Page<Feedback> feedbacks = feedBackRepository.findAllByPuzzleId(puzzleId, pageable);

        List<FeedbackResponse> feedbackResponse = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedbackResponse(f, user.getId()))
                .toList();


        return new PageResponse<>(
                feedbackResponse,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}
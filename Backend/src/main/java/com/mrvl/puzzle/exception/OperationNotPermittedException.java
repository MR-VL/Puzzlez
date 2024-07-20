package com.mrvl.puzzle.exception;

public class OperationNotPermittedException extends RuntimeException {

    public OperationNotPermittedException(String message) {
        super(message);
    }
}

package com.github.dreambrother;

public class ReadWriteLock {

    private int readLocks = 0;
    private boolean writeLock = false;
    private int writeLockAttempts = 0;

    public void readLock() throws InterruptedException {
        synchronized (this) {
            while (writeLockAttempts > 0 || writeLock) {
                wait();
            }
            readLocks++;
        }
    }

    public void readUnlock() {
        synchronized (this) {
            readLocks--;
            notifyAll();
        }
    }

    public void writeLock() throws InterruptedException {
        synchronized (this) {
            writeLockAttempts++;
            while (writeLock || readLocks > 0) {
                wait();
            }
            writeLock = true;
            writeLockAttempts--;
            notifyAll();
        }
    }

    public void writeUnlock() {
        synchronized (this) {
            writeLock = false;
            notifyAll();
        }
    }
}

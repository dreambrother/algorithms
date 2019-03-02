package com.github.dreambrother;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class ReadWriteLockTest {

    @Test
    public void readLock() throws InterruptedException {
        ReadWriteLock lock = new ReadWriteLock();
        lock.readLock();
        lock.readUnlock();

        lock.readLock();
        lock.readLock();
        lock.readUnlock();
        lock.readUnlock();
    }

    @Test
    public void writeLock() throws InterruptedException {
        ReadWriteLock lock = new ReadWriteLock();
        lock.writeLock();
        lock.writeUnlock();
    }

    @Test
    public void locks() throws InterruptedException {
        List<Integer> seq = new LinkedList<>();

        executeNTimes(() -> {
            ReadWriteLock lock = new ReadWriteLock();

            lock.readLock();

            executeInNewThread(() -> {
                try {
                    lock.writeLock();
                    seq.add(2);
                } finally {
                    lock.writeUnlock();
                }
            });

            Thread.sleep(100L);
            seq.add(1);

            executeInNewThread(() -> {
                try {
                    lock.readLock();
                    seq.add(3);
                } finally {
                    lock.readUnlock();
                }
            });

            Thread.sleep(100L);
            lock.readUnlock();

            Thread.sleep(100L);
        }, 3);

        Assert.assertEquals(Arrays.asList(1, 2, 3, 1, 2, 3, 1, 2, 3), seq);
    }

    @Test
    public void multipleWriteLocks() throws InterruptedException {
        List<Integer> seq = new LinkedList<>();
        executeNTimes(() -> {
            ReadWriteLock lock = new ReadWriteLock();
            lock.writeLock();

            executeInNewThread(() -> {
                try {
                    lock.writeLock();
                    seq.add(2);
                } finally {
                    lock.writeUnlock();
                }
            });

            Thread.sleep(100L);
            seq.add(1);

            lock.writeUnlock();
            Thread.sleep(100L);
        }, 3);

        Assert.assertEquals(Arrays.asList(1, 2, 1, 2, 1, 2), seq);
    }

    private void executeInNewThread(Runnable1 r) {
        new Thread(r).start();
    }

    private void executeNTimes(Runnable1 r, int times) {
        for (int i = 0; i < times; i++) {
            r.run();
        }
    }

    private interface Runnable1 extends Runnable {

        @Override
        default void run() {
            try {
                runWithEx();
            } catch (Exception ex) {
                throw new RuntimeException(ex);
            }
        }

        void runWithEx() throws Exception;
    }
}
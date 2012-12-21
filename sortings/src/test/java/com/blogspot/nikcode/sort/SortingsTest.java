package com.blogspot.nikcode.sort;

import com.blogspot.nikcode.sort.InsertionSort;
import com.blogspot.nikcode.sort.MergeSort;
import org.junit.Assert;
import org.junit.Test;

/**
 *
 * @author nik
 */
public class SortingsTest {

    @Test
    public void testInsertionSort() {
        int[] arr = new int[] { 5, 7, 7, 3, 9, 1 };
        InsertionSort.sort(arr);
        Assert.assertArrayEquals(new int[] { 1, 3, 5, 7, 7, 9 }, arr);
    }
    
    @Test
    public void testMergeSort() {
        int[] arr = new int[] { 1, 5, 7, 2, 1, 8, 3, 0 };
        int[] actual = MergeSort.sort(arr);
        Assert.assertArrayEquals(new int[] { 0, 1, 1, 2, 3, 5, 7, 8 }, actual);
    }
    
    @Test
    public void testMergeSortWithOneElement() {
        int[] arr = new int[] { 5 };
        int[] actual = MergeSort.sort(arr);
        Assert.assertArrayEquals(arr, actual);
    }
    
    @Test
    public void testMergeSortWithOTwoElements() {
        int[] arr = new int[] { 5, 2 };
        int[] actual = MergeSort.sort(arr);
        Assert.assertArrayEquals(new int[] { 2, 5 }, actual);
    }
    
    @Test
    public void testMergeSortWithOThreeElements() {
        int[] arr = new int[] { 5, 2, 7 };
        int[] actual = MergeSort.sort(arr);
        Assert.assertArrayEquals(new int[] { 2, 5, 7 }, actual);
    }
}

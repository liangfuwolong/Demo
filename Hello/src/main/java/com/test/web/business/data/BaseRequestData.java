package com.test.web.business.data;

/**
 * Created by Administrator on 2015/5/17.
 */
public class BaseRequestData {

   private int start ;

    private int limit = 10;

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}

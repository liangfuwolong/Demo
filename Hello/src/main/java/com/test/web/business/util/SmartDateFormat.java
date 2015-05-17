package com.test.web.business.util;

import java.text.FieldPosition;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Description: ��������ת��
 * Author: liuzh
 */
public class SmartDateFormat extends SimpleDateFormat {
    @Override
    public StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition pos) {
        return new StringBuffer(DateUtil.smartFormat(date));
    }

    @Override
    public Date parse(String text) throws ParseException {
        return DateUtil.smartFormat(text);
    }
}

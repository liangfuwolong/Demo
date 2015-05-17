package com.test.web.business.util;

import org.apache.commons.lang.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * DateUtil��
 *
 * @author wangl
 */
public class DateUtil {

    public static final String Y_M_D = "yyyy-MM-dd";
    public static final String Y_M_D_HM = "yyyy-MM-dd HH:mm";
    public static final String Y_M_D_HMS = "yyyy-MM-dd HH:mm:ss";
    public static final String YMD = "yyyyMMdd";
    public static final String YMDHM = "yyyyMMddHHmm";
    public static final String YMDHMS = "yyyyMMddHHmmss";
    public static final String ymd = "yyyy/MM/dd";
    public static final String ymd_HM = "yyyy/MM/dd HH:mm";
    public static final String ymd_HMS = "yyyy/MM/dd HH:mm:ss";

    /**
     * ����ת������
     *
     * @param date
     * @return
     */
    public static String smartFormat(Date date) {
        String dateStr = null;
        if (date == null) {
            dateStr = "";
        } else {
            try {
                dateStr = formatDate(date, Y_M_D_HMS);
                //ʱ����
                if (dateStr.endsWith(" 00:00:00")) {
                    dateStr = dateStr.substring(0, 10);
                }
                //ʱ��
                else if (dateStr.endsWith("00:00")) {
                    dateStr = dateStr.substring(0, 16);
                }
                //��
                else if (dateStr.endsWith(":00")) {
                    dateStr = dateStr.substring(0, 16);
                }
            } catch (Exception ex) {
                throw new IllegalArgumentException("ת������ʧ��: " + ex.getMessage(), ex);
            }
        }
        return dateStr;
    }

    /**
     * ����ת������
     *
     * @param text
     * @return
     */
    public static Date smartFormat(String text) {
        Date date = null;
        try {
            if (text == null || text.length() == 0) {
                date = null;
            } else if (text.length() == 10) {
                date = formatStringToDate(text, Y_M_D);
            } else if (text.length() == 13) {
                date = new Date(Long.parseLong(text));
            } else if (text.length() == 16) {
                date = formatStringToDate(text, Y_M_D_HM);
            } else if (text.length() == 19) {
                date = formatStringToDate(text, Y_M_D_HMS);
            } else {
                throw new IllegalArgumentException("���ڳ��Ȳ�����Ҫ��!");
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("����ת��ʧ��!");
        }
        return date;
    }

    /**
     * ��ȡ��ǰ����
     * @param format
     * @return
     * @throws Exception
     */
    public static String getNow(String format) throws Exception{
        return formatDate(new Date(), format);
    }

    /**
     * ��ʽ�����ڸ�ʽ
     *
     * @param argDate
     * @param argFormat
     * @return ��ʽ����������ַ���
     */
    public static String formatDate(Date argDate, String argFormat) throws Exception {
        if (argDate == null) {
            throw new Exception("����[����]����Ϊ��!");
        }
        if (StringUtils.isEmpty(argFormat)) {
            argFormat = Y_M_D;
        }
        SimpleDateFormat sdfFrom = new SimpleDateFormat(argFormat);
        return sdfFrom.format(argDate).toString();
    }

    /**
     * ���ַ�����ʽ��������
     *
     * @param argDateStr
     * @param argFormat
     * @return
     */
    public static Date formatStringToDate(String argDateStr, String argFormat) throws Exception {
        if (argDateStr == null || argDateStr.trim().length() < 1) {
            throw new Exception("����[����]����Ϊ��!");
        }
        String strFormat = argFormat;
        if (StringUtils.isEmpty(strFormat)) {
            strFormat = Y_M_D;
            if (argDateStr.length() > 16) {
                strFormat = Y_M_D_HMS;
            } else if (argDateStr.length() > 10) {
                strFormat = Y_M_D_HM;
            }
        }
        SimpleDateFormat sdfFormat = new SimpleDateFormat(strFormat);
        //�ϸ�ģʽ
        sdfFormat.setLenient(false);
        try {
            return sdfFormat.parse(argDateStr);
        } catch (ParseException e) {
            throw new Exception(e);
        }
    }
}
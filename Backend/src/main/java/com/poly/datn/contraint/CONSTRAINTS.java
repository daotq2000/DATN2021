package com.poly.datn.contraint;

public class CONSTRAINTS {
    public static final Byte IN_DEPOT = 1;
    public static final Byte IN_STORE = 2;
    public static final Byte LIVE = 1;
    public static final Byte DIE = 0;
    //STATUS EXPIRED
    public static final Byte UNEXPIRED = 1;  // 1. chua het han(mac dinh)
    public static final Byte ABOUT_TO_EXPIRE = 2; // 2. sap het han (bao truoc 3 ngay)
    public static final Byte EXPIRED = 3;// 3. da het han
    //STATUS REQUEST
    public static final Byte DELETE = 0;
    public static final Byte ACTIVE = 1;
    public static final Byte UN_PROCESS = 2;
    public static final Byte IN_PROCESS = 3;
    public static final Byte FINISH= 4;
    public  static  final Byte ACCESSORIES = 1;//accessories
    public static final Long OUT_STOCK = 0L;
    public static final Byte WORKING = 1;
    public static final Byte FINISH_WORKING = 2;


}

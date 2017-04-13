package com.db;

import java.sql.*;
import java.util.*;

public class HandleDB
{
    private DB db;

    public HandleDB() {
        db = new DB();
    }

    public void insertData(String[] url) {
        String sql = "insert into Urls(url) values(?)";
        db.executeUpdate(sql, url);
    }

    private List<HashMap<String, String>> results(String sql) {
        List<HashMap<String, String>> lists = db.executeQuery(sql);
        return lists;
    }

    public List<HashMap<String, String>> findRoomList() {
        String sql = "select * from roomlist";
        return results(sql);
    }

    public List<HashMap<String, String>> findRoomTotal() {
        String sql = "select count(*) sum from roomlist";
        return results(sql);
    }

    public List<HashMap<String, String>> findBookList() {
        String sql = "select book_id, name, room_id, amount, telephone, days, livetime from Book";
        return results(sql);
    }

    public List<HashMap<String, String>> findBookTotal() {
        String sql = "select count(*) sum from Book";
        return results(sql);
    }

    public List<HashMap<String, String>> findBookListReg(String[] params) {
        String sql = "select book_id, name, room_id, amount, telephone, days, livetime from Book where room_id = ?";
        return db.executeQuery(sql, params);
    }

    public List<HashMap<String, String>> findStaffList() {
        String sql = "select id_number, staff_name, staff_sex, staff_age, telephone, position, address from Employee";
        return results(sql);
    }

    public List<HashMap<String, String>> findStaffTotal() {
        String sql = "select count(*) sum from Employee";
        return results(sql);
    }

    public List<HashMap<String, String>> findRoomIdList() {
        String sql = "select room_id from Room where state='empty'";
        return results(sql);
    }

    public List<HashMap<String, String>> findRoomId() {
        String sql = "select room_id from Room where state='full'";
        return results(sql);
    }

    public List<HashMap<String, String>> findStaffId() {
        String sql = "select id_number from Employee";
        return results(sql);
    }

    public List<HashMap<String, String>> getMemberId() {
        String sql = "select member_id from Member";
        return results(sql);
    }

    public List<HashMap<String, String>> getBookId() {
        String sql = "select book_id from Book";
        return results(sql);
    }

    public List<HashMap<String, String>> findRoomTypeList() {
        String sql = "select * from roomtypelist";
        return results(sql);
    }

    public List<HashMap<String, String>> findRoomTypeTotal() {
        String sql = "select count(*) sum from roomtypelist";
        return results(sql);
    }

    public List<HashMap<String, String>> findMemberList() {
        String sql = "select * from Member";
        return results(sql);
    }

    public List<HashMap<String, String>> findMemberTotal() {
        String sql = "select count(*) sum from Member";
        return results(sql);
    }    

    public int CheckIn(String[] params) {
        String sql = "call proc_checkin(?,?,?,?,?)";
        return db.executeUpdate(sql, params);        
    }

    public int bookAdd(String[] params) {
        String sql = "call proc_bookadd(?,?,?,?,?,?)";
        return db.executeUpdate(sql, params);        
    }

    public int checkInMember(String[] params) {
        String sql = "call proc_checkinmember(?,?,?,?)";
        return db.executeUpdate(sql, params);        
    }

    public int checkOut(String[] params) {
        String sql = "call proc_checkout(?)";
        return db.executeUpdate(sql, params);        
    }

    public int bookDelete(String[] params) {
        String sql = "call proc_bookdelete(?)";
        return db.executeUpdate(sql, params);        
    }

    public List<HashMap<String, String>> getPasswd(String[] params) {
        String sql = "select password from Employee where username = ?";
        return db.executeQuery(sql, params);
    }

    public List<HashMap<String, String>> getAllUsername() {
        String sql = "select username from Employee";
        return results(sql);
    }

    public int register(String[] params) {
        String sql = "insert into Employee (username, password) values(?,?)";
        return db.executeUpdate(sql, params);
    }

    public List<HashMap<String, String>> checkOutSum(String[] params) {
        String sql = "select checkOutSum(?) as sum";
        return db.executeQuery(sql, params);
    }

    public int staffDelete(String[] params) {
        String sql = "delete from Employee where id_number = ?";
        return db.executeUpdate(sql, params);        
    }

    public List<HashMap<String, String>> customerList() {
        String sql = "select client_name, room_id, telephone, livetime, days, balance from Client";
        return results(sql);
    }

    public List<HashMap<String, String>> customerListTotal() {
        String sql = "select count(*) from Client";
        return results(sql);
    }

    public List<HashMap<String, String>> recordList() {
        String sql = "select * from CustomerRecord";
        return results(sql);
    }

    public List<HashMap<String, String>> recordListTotal() {
        String sql = "select count(*) from CustomerRecord";
        return results(sql);
    }

    public List<HashMap<String, String>> getRoomState(String[] params) {
        String sql = "select state from Room where room_id = ?";
        return db.executeQuery(sql, params);
    }

    public int updateMemberInfo(String memberid, String telephone, String grade, String rate) {
        String[] param2 = {telephone, memberid};
        String[] param1 = {grade, memberid};
        String[] param3 = {rate, memberid};
        String sql1 = "update Member set grade = ? where member_id = ?";
        String sql2 = "update Member set telephone = ? where member_id = ?";
        String sql3 = "update Member set rate = ? where member_id = ?";
        db.executeUpdate(sql3, param3);
        return db.executeUpdate(sql1, param1) + db.executeUpdate(sql2, param2);        
    }

    public int updateMemberInfo1(String memberid, String grade, String rate) {
        String[] params = {grade, memberid};
        String[] param3 = {rate, memberid};
        String sql = "update Member set grade = ? where member_id = ?";
        String sql3 = "update Member set rate = ? where member_id = ?";
        db.executeUpdate(sql3, param3);
        return db.executeUpdate(sql, params);        
    }

    public int memberRegister(String[] params) {
        String sql = "call proc_memberregister(?,?,?)";
        return db.executeUpdate(sql, params);        
    }

    public int memberDelete(String[] params) {
        String sql = "delete from Member where member_id = ?";
        return db.executeUpdate(sql, params);        
    }

    public List<HashMap<String, String>> roomType() {
        String sql = "select room_id from Room";
        return results(sql);
    }

    public int reviseRoomType(String[] params) {
        String[] par = new String[2];
        par[1] = params[0];
        int index = 0;
        if (!"".equals(params[1])) {
            par[0] = params[1];
            String sql1 = "update RoomType set price = ? where type_id = ?";
            db.executeUpdate(sql1, par);
            index++;
        }
        if (!"".equals(params[2])) {
            par[0] = params[2];
            String sql2 = "update RoomType set subsfee = ? where type_id = ?";
            db.executeUpdate(sql2, par);
            index++;
        }
        if (!"".equals(params[3])) {
            par[0] = params[0];
            par[1] = params[3];
            String sql3 = "update Room set type_id = ? where room_id = ?";
            db.executeUpdate(sql3, par);
            index++;
        }
        return index;
    }

    public int addRoom(String[] params) {
        String sql = "insert into Room values(?, ?, ?)";
        return db.executeUpdate(sql, params);        
    }

    public int deleteRoom(String[] params) {
        String sql = "delete from Room where room_id = ?";
        return db.executeUpdate(sql, params);        
    }

    public List<HashMap<String, String>> bookRecordList() {
        String sql = "select * from BookRecord";
        return results(sql);
    }

    public List<HashMap<String, String>> bookRecordTotal() {
        String sql = "select count(*) sum from BookRecord";
        return results(sql);
    }

    public int checkInBook(String[] params) {
        String sql = "call proc_bookcheckin(?,?)";
        return db.executeUpdate(sql, params);        
    }

    public int updateInfo(String[] params) {
        String sql = "update Employee set staff_name=?, staff_sex=?, staff_age=?,id_number=?, address=?, position=?, telephone=? where username=?";
        return db.executeUpdate(sql, params);        
    }

    public List<HashMap<String, String>> financeData() {
        String sql = "select * from financedata";
        return results(sql);
    }

    public List<HashMap<String, String>> bookDeleteSum() {
        String checkSql = "call proc_checkBook()";
        db.executeUpdate(checkSql);
        String sql = "select count(*) booksum from Notification";
        List<HashMap<String, String>> temp = results(sql);
        String delSql = "truncate Notification";
        db.executeUpdate(delSql);
        return temp;
    }
}
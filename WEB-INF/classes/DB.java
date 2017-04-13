package com.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DB
{
    // ���Ӷ���
    private Connection conn = null;
    // ���ݿ�Ԥ�������                         
    private PreparedStatement preparedStatement = null;
    // ִ��sql���������
    private ResultSet resultSet = null;

    /**
     * ��ʼ��������ݿ�����
     */
    static {
        try {
            Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");
        } catch (ClassNotFoundException e) {
            System.out.println("��������ʧ�ܣ�");
            e.printStackTrace();
        }
    }

    /**
     * �������ݿ�
     */
    public Connection getConnection() {
        try {
            if (conn == null || conn.isClosed()) {
                conn = DriverManager.getConnection("proxool.mysql");
            }
        } catch (SQLException se) {
            System.out.println("��ȡ����ʧ�ܣ�");
            se.printStackTrace();
        }
        return conn;
    }

    /**
     * �Ͽ����ݿ�����
     */
    public void destroy() {
        try {
            if (resultSet != null)
                resultSet.close();
            if (preparedStatement != null)
                preparedStatement.close();
            if (conn != null)
                conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * �����ݿ��в�ѯ��ý����
     */
    public ResultSet executeQueryRS(String sql) {
        try {
            // �������
            conn = this.getConnection();
            // Ԥ����sql���
            preparedStatement = conn.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultSet;
    }

    /**
     * �����ݿ��в�ѯ��ý��������������
     */
    public ResultSet executeQueryRS(String sql, Object[] params) {
        try {
            // �������
            conn = this.getConnection();
            // Ԥ����sql���
            preparedStatement = conn.prepareStatement(sql);
            // ������в���
            for (int i = 0; i < params.length; i++) {
                preparedStatement.setObject(i+1, params[i]);
            }
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultSet;
    }

    /**
     * �������ת��ΪList����
     */
    public List<HashMap<String, String>> executeQuery(String sql) {
        ResultSet rs = executeQueryRS(sql);
        // �й����ݵ���Ϣ����
        ResultSetMetaData rsmd = null;
        // �洢�����ֶε���Ŀ  
        int columnCount = 0;  
        try {  
            rsmd = rs.getMetaData();
            columnCount = rsmd.getColumnCount();
        } catch (SQLException e) {
            e.printStackTrace();  
        }
        // �洢�������
        List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();  
          
        try {  
            while(rs.next()) {
                HashMap<String, String> map = new HashMap<String, String>();  
                for(int i = 1; i <= columnCount; i++) {
                    map.put(rsmd.getColumnLabel(i), rs.getString(i));               
                }  
                list.add(map);  
            }  
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            destroy();
        }
        return list;
    }

    /**
     * �������ת��ΪList���󣨴�������
     */
    public List<HashMap<String, String>> executeQuery(String sql, Object[] params) {
        ResultSet rs = executeQueryRS(sql, params);
        // �й����ݵ���Ϣ����
        ResultSetMetaData rsmd = null;
        // �洢�����ֶε���Ŀ  
        int columnCount = 0;  
        try {  
            rsmd = rs.getMetaData();
            columnCount = rsmd.getColumnCount();
        } catch (SQLException e) {
            e.printStackTrace();  
        }
        // �洢�������
        List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();  
          
        try {  
            while(rs.next()) {
                HashMap<String, String> map = new HashMap<String, String>();  
                for(int i = 1; i <= columnCount; i++) {
                    map.put(rsmd.getColumnLabel(i), rs.getString(i));               
                }  
                list.add(map);  
            }  
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            destroy();
        }
        return list;
    }

    /**
     * ���ڸ������ݿ����ݣ���������
     */
    public int executeUpdate(String sql, Object[] params) {
        // ��䷵��ֵ
        int affectedLine = 0;
        try {
            conn = getConnection();
            preparedStatement = conn.prepareStatement(sql);
            // ������в���
            for (int i = 0; i < params.length; i++) {
                preparedStatement.setObject(i+1, params[i]);
            }
            affectedLine = preparedStatement.executeUpdate();
        } catch (SQLException se) {
            se.printStackTrace();
        } finally {
            destroy();
        }
        return affectedLine;
    }

    /**
     * �������ݿ����ݣ��޲�����
     */
    public int executeUpdate(String sql) {
        int affectedLine = 0;
        try {
            conn = getConnection();
            preparedStatement = conn.prepareStatement(sql);
            affectedLine = preparedStatement.executeUpdate();
        } catch (SQLException se) {
            se.printStackTrace();
        } finally {
            destroy();
        }
        return affectedLine;
    }
}
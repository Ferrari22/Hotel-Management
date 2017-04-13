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
    // 连接对象
    private Connection conn = null;
    // 数据库预处理对象                         
    private PreparedStatement preparedStatement = null;
    // 执行sql语句结果对象
    private ResultSet resultSet = null;

    /**
     * 初始化获得数据库驱动
     */
    static {
        try {
            Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");
        } catch (ClassNotFoundException e) {
            System.out.println("加载驱动失败！");
            e.printStackTrace();
        }
    }

    /**
     * 连接数据库
     */
    public Connection getConnection() {
        try {
            if (conn == null || conn.isClosed()) {
                conn = DriverManager.getConnection("proxool.mysql");
            }
        } catch (SQLException se) {
            System.out.println("获取连接失败！");
            se.printStackTrace();
        }
        return conn;
    }

    /**
     * 断开数据库连接
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
     * 从数据库中查询获得结果集
     */
    public ResultSet executeQueryRS(String sql) {
        try {
            // 获得连接
            conn = this.getConnection();
            // 预编译sql语句
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
     * 从数据库中查询获得结果集（带参数）
     */
    public ResultSet executeQueryRS(String sql, Object[] params) {
        try {
            // 获得连接
            conn = this.getConnection();
            // 预编译sql语句
            preparedStatement = conn.prepareStatement(sql);
            // 添加所有参数
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
     * 将结果集转化为List对象
     */
    public List<HashMap<String, String>> executeQuery(String sql) {
        ResultSet rs = executeQueryRS(sql);
        // 有关数据的信息对象
        ResultSetMetaData rsmd = null;
        // 存储所有字段的数目  
        int columnCount = 0;  
        try {  
            rsmd = rs.getMetaData();
            columnCount = rsmd.getColumnCount();
        } catch (SQLException e) {
            e.printStackTrace();  
        }
        // 存储结果对象
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
     * 将结果集转化为List对象（带参数）
     */
    public List<HashMap<String, String>> executeQuery(String sql, Object[] params) {
        ResultSet rs = executeQueryRS(sql, params);
        // 有关数据的信息对象
        ResultSetMetaData rsmd = null;
        // 存储所有字段的数目  
        int columnCount = 0;  
        try {  
            rsmd = rs.getMetaData();
            columnCount = rsmd.getColumnCount();
        } catch (SQLException e) {
            e.printStackTrace();  
        }
        // 存储结果对象
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
     * 用于更新数据库数据（带参数）
     */
    public int executeUpdate(String sql, Object[] params) {
        // 语句返回值
        int affectedLine = 0;
        try {
            conn = getConnection();
            preparedStatement = conn.prepareStatement(sql);
            // 添加所有参数
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
     * 更新数据库数据（无参数）
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
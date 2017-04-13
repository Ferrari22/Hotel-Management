package com.server;

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import com.db.HandleDB;

public class Login extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String userName = new String(request.getParameter("Username"));
        String passWord = new String(request.getParameter("Password"));
        // ��������� session �Ự���򴴽�һ�� session ����
        HttpSession session = request.getSession(true);
        HandleDB hd = new HandleDB();        
        List<HashMap<String, String>> result = new ArrayList<HashMap<String, String>>();        
        // �ж��û����Ƿ����
        boolean flag = false;
        result = hd.getAllUsername();
        for (HashMap<String, String> s : result) {
            if (s.get("username").equals(userName)) {
                flag = true;
                break;
            }
        }
        if (flag) {
            // ����session
            session.setAttribute("username", userName);
            // �����ѯ��Ҫ�Ĳ���
            String[] params = new String[]{userName};        
            result = hd.getPasswd(params);
            String newpasswd = result.get(0).get("password");
            if (passWord.equals(newpasswd)) {
                out.print("ok");
            }
        } else {
            out.print("usererror");
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}
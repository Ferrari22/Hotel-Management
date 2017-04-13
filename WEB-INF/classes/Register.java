package com.server;

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import com.db.HandleDB;

@WebServlet(name="Register", urlPatterns = {"/register"})
public class Register extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String userName = new String(request.getParameter("Username"));
        String passWord = new String(request.getParameter("Password"));
        // 如果不存在 session 会话，则创建一个 session 对象
        HttpSession session = request.getSession(true);
        HandleDB hd = new HandleDB();
        // 构造参数
        String[] params = {userName, passWord};
        if (hd.register(params) > 0) {
            // 设置session
            session.setAttribute("username", userName);
            out.print("ok");
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}
package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.db.HandleDB;

public class UpdateInfo extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doPost(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String username = new String(request.getParameter("username"));
        String name = new String(request.getParameter("name"));
        String sex = new String(request.getParameter("sex"));
        String age = new String(request.getParameter("age"));
        String telephone = new String(request.getParameter("telephone"));
        String idnumber = new String(request.getParameter("idnumber"));
        String address = new String(request.getParameter("address"));
        String position = new String(request.getParameter("position"));
        if ("male".equals(sex)) {
            sex = "男";
        } else {
            sex = "女";
        }
        HandleDB hd = new HandleDB();
        String[] params = {name, sex, age, idnumber, address, position, telephone, username};
        if (hd.updateInfo(params) > 0) {
            out.print("ok");
        }
    }
}
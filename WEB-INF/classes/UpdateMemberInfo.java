package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.db.HandleDB;

public class UpdateMemberInfo extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String memberid = new String(request.getParameter("Memberid"));
        String telephone = new String(request.getParameter("Telephone"));
        String grade = new String(request.getParameter("Grade"));
        HandleDB hd = new HandleDB();
        String rate = "";
        if ("VIP1".equals(grade)) {
            rate = String.valueOf(0.9);
        }
        if ("VIP2".equals(grade)) {
            rate = String.valueOf(0.8);
        }
        if ("VIP3".equals(grade)) {
            rate = String.valueOf(0.7);
        }
        if ("".equals(telephone)) {
            if (hd.updateMemberInfo1(memberid, grade, rate) > 0) {
                out.print("ok");
            }
        } else {
            if (hd.updateMemberInfo(memberid, telephone, grade, rate) > 0) {
                out.print("ok");
            }
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}
package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.db.HandleDB;

public class MemberRegister extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String name = new String(request.getParameter("Name"));
        String grade = new String(request.getParameter("Grade"));
        String telephone = new String(request.getParameter("Telephone"));
        HandleDB hd = new HandleDB();
        String[] params = {name, grade, telephone};
        if (hd.memberRegister(params) == 1) {
            out.print("ok");
        } else {
            out.print("error");
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}
package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.db.HandleDB;

public class MemberDelete extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String memberid = new String(request.getParameter("Idnumber"));
        HandleDB hd = new HandleDB();
        String[] params = {memberid};
        if (hd.memberDelete(params) == 1) {
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
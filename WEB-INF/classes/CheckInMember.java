package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.db.HandleDB;

public class CheckInMember extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String memberid = new String(request.getParameter("Memberid"));
        String roomid = new String(request.getParameter("Roomid"));
        String days = new String(request.getParameter("Days"));
        String balance = new String(request.getParameter("Balance"));
        if (memberid == "" && roomid == "" && days == "" && balance == "") {
            out.print("error");
        } else {
            HandleDB hd = new HandleDB();
            String[] params = {memberid, roomid, days, balance};
            if (hd.checkInMember(params) == 1) {
                out.print("ok");
            } else {
                out.print("error");
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
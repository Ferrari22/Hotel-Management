package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.db.HandleDB;

public class GetRoomState extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String roomid = new String(request.getParameter("Roomid"));
        String[] params = {roomid};
        HandleDB hd = new HandleDB();
        List<HashMap<String, String>> result = new ArrayList<HashMap<String, String>>();
        result = hd.getRoomState(params);
        if ("empty".equals(result.get(0).get("state"))) {
            out.print("empty");
        }
        if ("full".equals(result.get(0).get("state"))) {
            out.print("full");
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}
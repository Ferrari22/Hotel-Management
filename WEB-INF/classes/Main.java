package com.server;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Main extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		// ���÷�������
		response.setContentType("text/html");
		// ���÷���״̬��
		response.setStatus(response.SC_MOVED_TEMPORARILY);
		// �����ض����ַ
		response.setHeader("Location", "../../public/login.html");
	}
}
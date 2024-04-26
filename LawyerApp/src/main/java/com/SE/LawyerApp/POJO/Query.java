package com.SE.LawyerApp.POJO;

public class Query {
	private String msg;
	private String response;
	
	
	public Query(String msg, String response) {
		super();
		this.msg = msg;
		this.response = response;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	
	 
	
	
	
}

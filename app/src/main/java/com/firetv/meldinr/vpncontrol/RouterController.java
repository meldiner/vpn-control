package com.firetv.meldinr.vpncontrol;

import android.content.Context;
import android.telecom.Call;
import android.util.Base64;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by meldinr on 3/18/17.
 */

public class RouterController {
    public interface Callback {
        void onResponse(String isp);
        void onError(String error);
    }

    private String ip;
    private String authorizationHeader;
    private RequestQueue queue;

    public RouterController(Context context, String ip, String username, String password) {
        this.queue = Volley.newRequestQueue(context);
        this.ip = ip;

        String userpassascii = username + ":" + password;
        byte[] bytesEncoded = Base64.encode(userpassascii.getBytes(), Base64.NO_WRAP);
        this.authorizationHeader = "Basic " + new String(bytesEncoded);
    }

    public void vpnConnect(final String vpnServer, final String vpnUsername, final String vpnPassword, final String vpnProto, final String vpnType, final String vpnAutoConnect, final Callback cb) {
        Map<String, String> headers = new HashMap<String, String>();

        Map<String, String> params = new HashMap<String, String>();
        params.put("action_mode", "apply");
        params.put("action_script", "restart_vpncall");
        params.put("pnc_pppoe_username", vpnUsername);
        params.put("vpnc_pppoe_passwd", vpnPassword);
        params.put("vpnc_heartbeat_x", vpnServer);
        params.put("vpnc_dnsenable_x", "1");
        params.put("vpnc_proto", vpnProto);
        params.put("vpnc_type", vpnType);
        params.put("vpnc_auto_conn", vpnAutoConnect);

        routerRequest(Request.Method.POST, "/start_apply.htm", headers, params,
            new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    logout(cb);
                }
            },
            new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    cb.onError(error.getMessage());
                }
            }
        );
    }

    public void vpnDisconnect(final Callback cb) {
        vpnConnect("", "", "", "disable", "", "", cb);
    }

    private void routerRequest(int method, String path, final Map<String, String> headers, final Map<String, String> params, final Response.Listener<String> callback, final Response.ErrorListener errorListener) {
        String url = "http://" + ip + path;

        StringRequest stringRequest = new StringRequest(method, url, callback, errorListener) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> modifiedHeaders = new HashMap<String, String>(headers);
                modifiedHeaders.put("Authorization", authorizationHeader);
                return modifiedHeaders;
            }

            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                return params;
            }
        };

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

    private void logout(final Callback cb) {
        routerRequest(Request.Method.GET, "/Logout.asp", new HashMap<String, String>(), new HashMap<String, String>(),
            new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    cb.onResponse(response);
                }
            },
            new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    cb.onError(error.getMessage());
                }
            }
        );
    }
}
